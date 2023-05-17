// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useCallback, useContext, useMemo } from 'react';

import { Button, Copy, Divider, Stack, Typography, useAccount, useSignMessage } from '@credential/react-components';
import { DidsContext } from '@credential/react-dids';

import TextWithBg from './TextWithBg';

const Step3: React.FC<{ zkSig?: string; onMetaSigChange: (sig: string) => void; next: () => void }> = ({
  next,
  onMetaSigChange,
  zkSig
}) => {
  const { did } = useContext(DidsContext);
  const { address } = useAccount();
  const binding = useMemo(() => `${address} will accept the zkID Card sent by ${did.id}`, [address, did.id]);

  const { signMessageAsync } = useSignMessage({
    message: binding
  });

  const signBinding = useCallback(async () => {
    try {
      console.log('[ binding.length ] >', binding.length);
      const sig = await signMessageAsync({ message: binding });

      onMetaSigChange(sig);

      next();
    } catch (error) {}
  }, [signMessageAsync, onMetaSigChange, next, binding]);

  return (
    <Stack>
      <TextWithBg bgcolor='rgba(108,93,211,0.05)' mb={4} mt={4}>
        <Stack alignItems='center' borderRadius='10px' direction='row' spacing={0.5} width='100%'>
          <Typography>{address}</Typography>
          {address && <Copy value={address} />}
        </Stack>
      </TextWithBg>
      <Divider />
      <TextWithBg bgcolor='#F7F8FA' label='zkID Sig:' mt={3} value={zkSig} />
      <TextWithBg bgcolor='#F7F8FA' label='Sign this document with Ethereum Address' mb={4} mt={3} value={binding} />
      <Button fullWidth onClick={signBinding} variant='contained'>
        Sign
      </Button>
    </Stack>
  );
};

export default Step3;
