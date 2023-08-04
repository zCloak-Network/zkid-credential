// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { VerifiableCredential } from '@zcloak/vc/types';
import type { SbtResult } from './types';

import { LoadingButton } from '@mui/lab';
import { Box, Container, Stack, Typography } from '@mui/material';
import { u8aToHex } from '@polkadot/util';
import { useCallback, useContext, useState } from 'react';

import { base58Decode } from '@zcloak/crypto';
import { helpers } from '@zcloak/did';

import { VERIFIER_ADDRESS } from '@credential/app-config';
import EthBind from '@credential/page-did/eth-bind';
import {
  arbitrum,
  arbitrumGoerli,
  baseGoerli,
  Button,
  ConnectWallet,
  Copy,
  ellipsisMixin,
  IdentityIcon,
  lineaTestnet,
  SbtCard,
  useAccount,
  useContractWrite,
  useNetwork,
  useWaitForTransaction
} from '@credential/react-components';
import { DidsContext } from '@credential/react-dids';
import { useBindEth, useContractConfig, useToggle } from '@credential/react-hooks';

import MintStatus from './modal/MintStatus';
import Faucet from './Faucet';

interface Props {
  vc: VerifiableCredential<boolean>;
  result: SbtResult;
  onCancel: () => void;
}

function Mint({ onCancel, result, vc }: Props) {
  const { did } = useContext(DidsContext);

  const [open, setIsOpen] = useState(false);
  const [success, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { binded, isFetching, refetch } = useBindEth(did);
  const [openBind, toggleBind] = useToggle();

  const { chain } = useNetwork();

  const { abi, toAddress } = useContractConfig(chain?.id);

  const { data, error, writeAsync } = useContractWrite({
    abi,
    address: toAddress,
    functionName: 'mint',
    onSuccess: () => {
      setIsOpen(true);
    }
  });

  const mint = useCallback(async () => {
    try {
      setLoading(true);

      const attesterSig = u8aToHex(base58Decode(vc.proof[0].proofValue));
      const attester = await helpers.fromDid(vc.issuer);
      const version = '0x0001';

      const params: any[] = [
        did.identifier, // recipient
        vc.ctype, // ctype
        `0x${result.programHash}`, // programHash
        vc.digest, // digest
        VERIFIER_ADDRESS, // verifier
        attester.identifier, // attester
        attesterSig, // attester sig
        result.output, // output
        vc.issuanceDate, // issuanceTimestamp
        0, // expirationTimestamp
        version, // vcVersion
        result.image // sbtlink
      ];

      if (chain?.id === baseGoerli.id || chain?.id === lineaTestnet.id) {
        const publicInput = result.publicInput === '' ? [] : result.publicInput.split(',');

        params.splice(3, 0, publicInput);
      }

      // add arbitrum isPublicInputUsedForCheck
      if (chain?.id === arbitrumGoerli.id || chain?.id === arbitrum.id) {
        params.splice(4, 0, result.programConfig.isPublicInputUsedForCheck);
      }

      await writeAsync({
        args: [params, result.signature]
      }).catch(() => {
        setIsOpen(true);
      });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [vc, result, writeAsync, did.identifier, chain]);

  useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => {
      setIsSuccess(true);
    }
  });

  const onClose = useCallback(() => {
    setIsOpen(false);
    !error && onCancel();
  }, [onCancel, error]);

  return (
    <Container
      maxWidth='md'
      sx={{
        marginTop: 2,
        maxWidth: '720px !important',
        bgcolor: 'common.white'
      }}
    >
      <Stack
        spacing={5}
        sx={{
          padding: '48px 80px'
        }}
      >
        <Box textAlign='center'>
          <Typography variant='h2'>Mint zkID Card</Typography>
          <Typography
            sx={{
              background: '#FBFAFC',
              borderRadius: '4px',
              border: '1px solid #EBEAED',
              padding: '8px 16px',
              color: '#5D5D5B',
              marginTop: 2,
              ...ellipsisMixin()
            }}
          >
            cType: {vc.ctype}
          </Typography>
        </Box>
        <Box>
          <Typography variant='h6'>Preview</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingY: 6 }}>
            <SbtCard attester={vc.issuer} isExample={false} multiply={0.7} output={result.desc} />
          </Box>
        </Box>
        <Box>
          <Stack direction='row' justifyContent='space-between' mb={2}>
            <Typography fontWeight={500} mb={2}>
              To
            </Typography>
            <Faucet />
          </Stack>
          {binded ? (
            <>
              <To recipient={binded} />
            </>
          ) : (
            <LoadingButton fullWidth loading={isFetching} onClick={toggleBind} size='large' variant='contained'>
              Bond Ethereum Address
            </LoadingButton>
          )}
        </Box>
        <Box>
          <ConnectWallet
            disabled={isFetching || !binded}
            fullWidth
            loading={loading}
            onClick={mint}
            size='large'
            variant='contained'
          >
            Mint
          </ConnectWallet>

          <Button color='secondary' fullWidth onClick={onCancel} size='large' sx={{ marginTop: 3 }} variant='contained'>
            Cancel
          </Button>
        </Box>
      </Stack>
      {open && binded && (
        <MintStatus
          error={error}
          hash={data?.hash}
          onClose={onClose}
          open={open}
          recipient={binded}
          success={success}
        />
      )}

      {openBind && <EthBind onClose={toggleBind} open={openBind} refetch={refetch} />}
    </Container>
  );
}

const To: React.FC<{ recipient: string }> = ({ recipient }) => {
  const { address } = useAccount();

  return (
    <>
      <Stack
        alignItems='center'
        direction='row'
        paddingX={2}
        paddingY={1.75}
        spacing={1}
        sx={{
          background: 'rgba(108,93,211,0.05)',
          height: 64,
          width: '100%',
          borderRadius: '4px'
        }}
      >
        <IdentityIcon diameter={36} value={recipient} />
        <Typography>{recipient}</Typography>
        <Copy value={recipient} />
      </Stack>

      {address && (
        <Typography color='grey.A700' fontSize={12} mt={3}>
          {address} will pay for the gas fee.
        </Typography>
      )}
    </>
  );
};

export default Mint;
