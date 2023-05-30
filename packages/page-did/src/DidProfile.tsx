// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@zcloak/crypto/types';

import { isU8a, u8aToHex } from '@polkadot/util';
import React, { useCallback, useContext, useMemo, useState } from 'react';

import { Box, Container, Copy, IdentityIcon, Stack, Tab, Tabs, Typography } from '@credential/react-components';
import { ellipsisMixin } from '@credential/react-components/utils';
import { DidCell, DidsContext } from '@credential/react-dids';

import OnChainRecipient from './OnChainRecipient';

const KeyCell: React.FC<{ name: string; publicKey?: Uint8Array | HexString | null }> = ({ name, publicKey }) => {
  const text = useMemo(() => (publicKey ? (isU8a(publicKey) ? u8aToHex(publicKey) : publicKey) : null), [publicKey]);

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography
        sx={({ palette }) => ({
          color: palette.grey[700]
        })}
        variant='inherit'
      >
        {name}
      </Typography>
      {text && (
        <Stack
          sx={{
            marginTop: 0.75,
            alignItems: 'center',
            flexDirection: 'row'
          }}
        >
          <Typography
            sx={{
              marginRight: 1,

              maxWidth: 'calc(100% - 20px)',
              ...ellipsisMixin()
            }}
            variant='inherit'
          >
            {text}
          </Typography>
          <Copy value={text} />
        </Stack>
      )}
    </Box>
  );
};

const DidProfile: React.FC = () => {
  const { did } = useContext(DidsContext);
  const [tab, setTab] = useState(0);

  const onTabChange = useCallback((e: React.SyntheticEvent, val: number) => setTab(val), []);

  const authenticationKey = useMemo(() => {
    try {
      const didUrl = did.getKeyUrl('authentication');

      return did.get(didUrl).publicKey;
    } catch {
      return null;
    }
  }, [did]);
  const assertionMethodKey = useMemo(() => {
    try {
      const didUrl = did.getKeyUrl('assertionMethod');

      if (!didUrl) return null;

      return did.get(didUrl).publicKey;
    } catch {
      return null;
    }
  }, [did]);
  const keyAgreementKey = useMemo(() => {
    try {
      const didUrl = did.getKeyUrl('keyAgreement');

      if (!didUrl) return null;

      return did.get(didUrl).publicKey;
    } catch {
      return null;
    }
  }, [did]);
  const capabilityDelegationKey = useMemo(() => {
    try {
      const didUrl = did.getKeyUrl('capabilityDelegation');

      if (!didUrl) return null;

      return did.get(didUrl).publicKey;
    } catch {
      return null;
    }
  }, [did]);
  const capabilityInvocationKey = useMemo(() => {
    try {
      const didUrl = did.getKeyUrl('capabilityInvocation');

      if (!didUrl) return null;

      return did.get(didUrl).publicKey;
    } catch {
      return null;
    }
  }, [did]);

  return (
    <Box>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: 200,
          background: 'url(/images/profile-bg.webp) no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <Stack
        alignItems='center'
        direction={{ xs: 'column', md: 'row' }}
        justifyContent={{ xs: 'center', md: 'flex-start' }}
        sx={{
          position: 'relative',
          zIndex: 1,
          marginLeft: { xs: 0, md: '56px' },
          marginTop: '-80px'
        }}
      >
        <Box sx={{ width: 168, height: 168, borderRadius: '84px', border: '4px solid #fff' }}>
          <IdentityIcon diameter={160} value={did.id} />
        </Box>
        <Box marginLeft={{ md: 3, xs: 0 }} maxWidth='80%' width={400}>
          <Typography
            sx={{
              textAlign: { md: 'left', xs: 'center' },
              color: { md: 'white', xs: 'inherit' }
            }}
            variant='h1'
          >
            {'web3name'}
          </Typography>
          <Box marginTop={3}>
            <DidCell copyable value={did.id} />
          </Box>
        </Box>
      </Stack>
      <Container maxWidth='md' sx={{ marginTop: { xs: 7, md: 14 } }}>
        <Tabs onChange={onTabChange} value={tab}>
          <Tab label='Keys' value={0} />
          <Tab label='On-chain Recipient' value={1} />
        </Tabs>
        {tab === 0 ? (
          <Stack spacing={4}>
            <KeyCell name='Authentication Key' publicKey={authenticationKey} />
            <KeyCell name='Assertion Method Set' publicKey={assertionMethodKey} />
            <KeyCell name='Key Agreement Key' publicKey={keyAgreementKey} />
            <KeyCell name='Capability Delegation Key' publicKey={capabilityDelegationKey} />
            <KeyCell name='Capability Invocation Key' publicKey={capabilityInvocationKey} />
          </Stack>
        ) : (
          <OnChainRecipient />
        )}
      </Container>
    </Box>
  );
};

export default React.memo(DidProfile);
