// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@zcloak/crypto/types';

import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { Button } from '@mui/material';
import React, { useCallback, useContext } from 'react';

import { useCType } from '@credential/app-store';

import { CTypeContext } from './CTypeProvider';

const CTypeName: React.FC<{ cTypeHash?: HexString | null }> = ({ cTypeHash }) => {
  const ctype = useCType(cTypeHash);
  const { importCType } = useContext(CTypeContext);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (cTypeHash) {
        importCType(cTypeHash);
      }
    },
    [cTypeHash, importCType]
  );

  if (ctype) {
    return <>{ctype.title}</>;
  }

  if (!cTypeHash) {
    return null;
  }

  return (
    <Button onClick={handleClick} startIcon={<FileUploadOutlinedIcon />} sx={{ padding: 0 }}>
      Import ctype
    </Button>
  );
};

export default React.memo(CTypeName);
