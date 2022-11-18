// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Box, Stack, Tab, Tabs } from '@mui/material';
import { assert } from '@polkadot/util';
import React, { useContext, useEffect, useState } from 'react';

import { CType } from '@zcloak/ctype/types';

import { useDB } from '@credential/app-store/useDB';
import { DidsContext } from '@credential/react-dids';
import { resolver } from '@credential/react-dids/instance';

import CTypes from './CTypes';

const OwnerCType: React.FC = () => {
  const { did } = useContext(DidsContext);
  const [ownCTypes, setOwnCTypes] = useState<CType[]>([]);
  const db = useDB(did?.id);

  useEffect(() => {
    if (did) {
      // TODO fetch ownCTYpes
      assert(db, 'index db not init');

      resolver.getClaimerCtypes(did.id).then((ctypes) => {
        setOwnCTypes(ctypes);
        db.ctype.bulkPut(ctypes);
      });
    }
  }, [did, db]);

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
