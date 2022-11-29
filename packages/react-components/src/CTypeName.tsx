// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@zcloak/crypto/types';

import React, { useContext, useEffect } from 'react';

import { useCType } from '@credential/app-store';

import { CTypeContext } from './CTypeProvider';

const CTypeName: React.FC<{ cTypeHash?: HexString | null }> = ({ cTypeHash }) => {
  const ctype = useCType(cTypeHash);
  const { importCType } = useContext(CTypeContext);

  useEffect(() => {
    if (!ctype && cTypeHash) {
      importCType(cTypeHash);
    }
  }, [cTypeHash, ctype, importCType]);

  if (ctype) {
    return <>{ctype.title}</>;
  }

  return null;
};

export default React.memo(CTypeName);
