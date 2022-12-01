// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useContext, useMemo } from 'react';

import { isSameUri } from '@zcloak/did/utils';

import { Box, CTypeContext, Stack, Tab, Tabs } from '@credential/react-components';
import { DidsContext } from '@credential/react-dids';

import CTypes from './CTypes';

const OwnerCType: React.FC = () => {
  const { did } = useContext(DidsContext);
  const { serverCTypes } = useContext(CTypeContext);

  const ownCTypes = useMemo(
    () =>
      serverCTypes.filter((item) => {
        try {
          return isSameUri(item.publisher, did.id);
        } catch {}

        return false;
      }),
    [did.id, serverCTypes]
  );

  return (
    <Stack spacing={3}>
      <Tabs
        sx={{
          px: 2,
          boxShadow: '0px 3px 6px rgba(153, 155, 168, 0.1)'
        }}
        value={0}
      >
        <Tab label="My CTypes" />
      </Tabs>
      <Box px={4}>
        <CTypes list={ownCTypes} />
      </Box>
    </Stack>
  );
};

export default OwnerCType;
