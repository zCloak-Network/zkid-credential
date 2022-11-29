// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@zcloak/crypto/types';

import React, { useContext, useMemo } from 'react';

import { useCType } from '@credential/app-store';

import { CTypeContext } from './CTypeProvider';

const CTypeName: React.FC<{ cTypeHash?: HexString | null }> = ({ cTypeHash }) => {
  const ctype = useCType(cTypeHash);
  const { serverCTypes } = useContext(CTypeContext);

  const title = useMemo(() => {
    return (ctype || serverCTypes.find((ctype) => ctype.$id === cTypeHash))?.title;
  }, [cTypeHash, ctype, serverCTypes]);

  return <>{title}</>;
};

export default React.memo(CTypeName);
