// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Box, Stack, Tab, Tabs } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';

import { CType } from '@zcloak/ctype/types';
import { isSameUri } from '@zcloak/did/utils';

import { db } from '@credential/app-store/db';
import { DidsContext } from '@credential/react-dids';
import { resolver } from '@credential/react-dids/instance';

import CTypes from './CTypes';

const OwnerCType: React.FC = () => {
  const { did } = useContext(DidsContext);
  const [ownCTypes, setOwnCTypes] = useState<CType[]>([]);

  useEffect(() => {
    resolver.getAttesterCtypes().then((_ctypes) => {
      const ctypes = _ctypes
        .filter((item) => {
          try {
            return isSameUri(item.rawData.publisher, did.id);
          } catch {}

          return false;
        })
        .map((item) => item.rawData);

      setOwnCTypes(ctypes);
      db.ctype.bulkPut(ctypes);
    });
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
