// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { VerifiableCredential } from '@zcloak/vc/types';
import type { SbtResult } from './types';

import { Box, Container, Link, Stack, Typography } from '@mui/material';
import { u8aToHex } from '@polkadot/util';
import { useCallback, useContext, useMemo, useState } from 'react';

import { base58Decode } from '@zcloak/crypto';
import { helpers } from '@zcloak/did';

import { VERIFIER_ADDRESS, zCloakSBTAbi, ZKSBT_ADDRESS, ZKSBT_CHAIN_ID } from '@credential/app-config';
import EthBind from '@credential/page-did/eth-bind';
import {
  Button,
  ButtonEnableMetamask,
  Copy,
  ellipsisMixin,
  IdentityIcon,
  SbtCard,
  useAccount,
  useContractWrite,
  useWaitForTransaction
} from '@credential/react-components';
import { DidsContext } from '@credential/react-dids';
import { useBindEth, useToggle } from '@credential/react-hooks';

import MintStatus from './modal/MintStatus';

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

  const { data, error, writeAsync } = useContractWrite({
    abi: zCloakSBTAbi,
    address: ZKSBT_ADDRESS,
    functionName: 'mint',
    chainId: ZKSBT_CHAIN_ID,
    onSuccess: () => {
      setIsOpen(true);
    }
  });

  const recipient = useMemo(() => binded ?? did.identifier, [did.identifier, binded]);

  const mint = useCallback(async () => {
    try {
      setLoading(true);

      const attesterSig = u8aToHex(base58Decode(vc.proof[0].proofValue));
      const attester = await helpers.fromDid(vc.issuer);
      const version = '0x0001';

      const params = [
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

      await writeAsync({
        args: [params, result.signature]
      });
    } catch (error) {
      setIsOpen(true);
    } finally {
      setLoading(false);
    }
  }, [vc, result, writeAsync, did.identifier]);

  useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => {
      setIsSuccess(true);
    }
  });

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
            <SbtCard attester={vc.issuer} multiply={0.7} output={result.desc} />
          </Box>
        </Box>
        <Box>
          <Typography fontWeight={500} mb={2}>
            To
          </Typography>
          <To isBinded={!!binded} recipient={recipient} refetch={refetch} />
        </Box>
        <Box>
          <ButtonEnableMetamask
            disabled={isFetching}
            fullWidth
            loading={loading}
            onClick={mint}
            size='large'
            variant='contained'
          >
            Mint
          </ButtonEnableMetamask>
          <Button color='secondary' fullWidth onClick={onCancel} size='large' sx={{ marginTop: 3 }} variant='contained'>
            Cancel
          </Button>
        </Box>
      </Stack>
      {open && (
        <MintStatus
          error={error}
          hash={data?.hash}
          onClose={() => setIsOpen(false)}
          open={open}
          recipient={recipient}
          success={success}
        />
      )}
    </Container>
  );
}

const To: React.FC<{ recipient: string; refetch: () => Promise<any>; isBinded: boolean }> = ({
  isBinded,
  recipient,
  refetch
}) => {
  const { address } = useAccount();
  const [open, toggle] = useToggle();

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
      {!isBinded && (
        <Typography
          mt={3}
          pl={2}
          sx={{
            position: 'relative',
            '::before': {
              content: "''",
              width: 4,
              height: '100%',
              background: '#0042F1',
              borderRadius: '4px',
              position: 'absolute',
              left: 0,
              top: 0
            }
          }}
        >
          You can also bond this SBT to a Ethereum wallet address if you want.
          <Button component='a' onClick={toggle} size='small' variant='text'>
            Try to bond Ethereum Address to as recipient.
          </Button>
        </Typography>
      )}

      {address && (
        <Typography color='grey.A700' fontSize={12} mt={3}>
          {address} will pay for the gas fee.{' --> '}
          <Link href='https://faucet.quicknode.com/optimism/goerli' target='_blank'>
            Faucet
          </Link>
        </Typography>
      )}

      {open && <EthBind onClose={toggle} open={open} refetch={refetch} />}
    </>
  );
};

export default Mint;
