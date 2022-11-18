// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Box, Stack, Tab, Tabs } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { CType } from '@zcloak/ctype/types';

import { useDerivedDid } from '@credential/react-dids';
import { credentialApi } from '@credential/react-hooks/api';

import CTypes from './CTypes';

const OwnerCType: React.FC = () => {
  const did = useDerivedDid();
  const [ownCTypes, setOwnCTypes] = useState<CType[]>([]);

  useEffect(() => {
    if (did) {
      credentialApi.getCreatedCtypes(did.uri).then((res) => {
        setOwnCTypes(res.data.map((d) => d));
      });
    }
  }, [did]);

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
