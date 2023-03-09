// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useContext, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { Box, CTypeContext, Typography } from '@credential/react-components';

import CreateClaim from './create/CreateClaim';
import CTypeList from './CTypeList';
import ImportCType from './ImportCType';
import { useAttestCTypes } from './useAttestCTypes';

const CType: React.FC = () => {
  const ctypes = useAttestCTypes();
  const { importCType } = useContext(CTypeContext);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      importCType(id as any);
    }
  }, [importCType, id]);

  const ctype = useMemo(() => {
    return ctypes.filter((_c) => _c.$id === id)[0];
  }, [ctypes, id]);

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 3
        }}
      >
        <Typography variant='h2'>Credential type</Typography>
        <ImportCType variant='contained' />
      </Box>
      <CTypeList list={ctypes} />
      {ctype ? <CreateClaim ctype={ctype} isAuto={true} /> : <></>}
    </Box>
  );
};

export default CType;
