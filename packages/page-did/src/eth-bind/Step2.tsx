// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { stringToHex, u8aToHex } from '@polkadot/util';
import { useCallback, useContext, useMemo } from 'react';

import { Button, Copy, Stack, Typography, useAccount } from '@credential/react-components';
import { DidsContext } from '@credential/react-dids';

import TextWithBg from './TextWithBg';

const Step2: React.FC<{ next: () => void; onZkSigChange: (sig: string) => void }> = ({ next, onZkSigChange }) => {
  const { did } = useContext(DidsContext);
  const { address } = useAccount();

  const binding = useMemo(() => {
    return `${did.id} will transfer the on-chain zkID Card to ${address} for use.\n\n I am aware that:\n If someone maliciously claims it on behalf, ${did.id} will face corresponding legal risks.\n If the Ethereum address is changed, all on-chain zkID Cards will be destroyed.`;
  }, [did?.id, address]);

  const signBinding = useCallback(async () => {
    try {
      const sig = await did.signWithKey(stringToHex(binding), 'controller');

      onZkSigChange(u8aToHex(sig.signature));

      next();
    } catch (error) {}
  }, [onZkSigChange, next, did, binding]);

  return (
    <Stack mt={6}>
      <TextWithBg bgcolor='rgba(108,93,211,0.05)'>
        <Stack alignItems='center' borderRadius='10px' direction='row' spacing={0.5} width='100%'>
          <Typography>{did?.id}</Typography>
          {did?.id && <Copy value={did?.id} />}
        </Stack>
      </TextWithBg>
      <Typography
        mt={4}
        sx={{
          color: '#8F95B2'
        }}
        variant='inherit'
      >
        Sign this document with zkID Wallet
      </Typography>
      <Stack
        bgcolor='#F7F8FA'
        borderRadius='5px'
        mb={2.25}
        mt={1}
        paddingX={3}
        paddingY={2}
        spacing={1.25}
        sx={{
          wordWrap: 'break-word'
        }}
        width='100%'
      >
        <Typography>
          {did?.id} will transfer the on-chain zkID Card to {address} for use.
        </Typography>
        <Typography>I am aware that:</Typography>
        <Typography color='#0042F1'>
          • If someone maliciously claims it on behalf, {did?.id} will face corresponding legal risks.
        </Typography>
        <Typography color='#0042F1'>
          • If the Ethereum address is changed, all on-chain zkID Cards will be destroyed.
        </Typography>
      </Stack>
      <Button fullWidth onClick={signBinding} variant='contained'>
        Sign
      </Button>
    </Stack>
  );
};

export default Step2;
