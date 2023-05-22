// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { VerifiableCredential } from '@zcloak/vc/types';
import type { SbtResult } from './types';

import { Box, Container, Stack, Typography } from '@mui/material';
import { hexToU8a, u8aToHex } from '@polkadot/util';
import { useCallback, useContext, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { base58Decode } from '@zcloak/crypto';
import { HexString } from '@zcloak/crypto/types';
import { helpers } from '@zcloak/did';

import { VERIFIER_ADDRESS, zCloakSBTAbi, ZKSBT_ADDRESS, ZKSBT_CHAIN_ID } from '@credential/app-config';
import {
  Button,
  ButtonEnableMetamask,
  Copy,
  ellipsisMixin,
  IdentityIcon,
  SbtCard,
  useAccount,
  useContractRead,
  useContractWrite,
  useWaitForTransaction
} from '@credential/react-components';
import { DidsContext } from '@credential/react-dids';

import MintStatus from './modal/MintStatus';

interface Props {
  vc: VerifiableCredential<boolean>;
  result: SbtResult;
  onCancel: () => void;
}

function Mint({ onCancel, result, vc }: Props) {
  const { did } = useContext(DidsContext);
  const [binded, setBinded] = useState<string>();
  const [error, setError] = useState<Error>();
  const [open, setIsOpen] = useState(false);
  const [success, setIsSuccess] = useState(false);
  const [hash, setHash] = useState<HexString>();

  const { isFetching } = useContractRead({
    address: ZKSBT_ADDRESS,
    abi: zCloakSBTAbi,
    functionName: 'checkBindingDB',
    args: [did.identifier],
    onSuccess: (data: any) => {
      const addr = hexToU8a(data).filter((item) => Boolean(item)).length ? data : undefined;

      setBinded(addr);
    }
  });

  const { writeAsync } = useContractWrite({
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
      const attesterSig = u8aToHex(base58Decode(vc.proof[0].proofValue));
      const attester = await helpers.fromDid(vc.issuer);
      const version = '0x0001';

      const params = [
        recipient, // recipient
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

      const data = await writeAsync({
        args: [params, result.signature]
      });

      setHash(data.hash);
    } catch (error) {
      setIsOpen(true);
      setError(error as Error);
    }
  }, [recipient, vc, result, writeAsync]);

  useWaitForTransaction({
    hash,
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
          <To recipient={recipient} />
        </Box>
        <Box>
          <ButtonEnableMetamask disabled={isFetching} fullWidth onClick={mint} size='large' variant='contained'>
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
          onClose={() => setIsOpen(false)}
          open={open}
          recipient={recipient}
          success={success}
        />
      )}
    </Container>
  );
}

const To: React.FC<{ recipient: string }> = ({ recipient }) => {
  const { address, isConnected } = useAccount();

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
      <Typography
        mb={5}
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
        {isConnected ? (
          `${address} will pay for the gas fees.`
        ) : (
          <>
            Have another common used Ethereum Address?
            <Link to='/claimer/did/profile'>Try to bond Ethereum Address to as recipient.</Link>
          </>
        )}
      </Typography>
    </>
  );
};

export default Mint;
