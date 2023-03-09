// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useContext, useMemo } from 'react';

import { TOP_CTYPES_FOR_ISSUE } from '@credential/app-config/ctypes';
import { CType } from '@credential/app-store';
import { CTypeContext } from '@credential/react-components';

export function useIssueCTypes(): CType[] {
  const { ctypes, serverCTypes } = useContext(CTypeContext);

  return useMemo((): CType[] => {
    const topCTypes: CType[] = [];

    TOP_CTYPES_FOR_ISSUE.forEach((hash) => {
      const finded = serverCTypes.find((ctype) => ctype.$id === hash);

      if (finded) {
        topCTypes.push(finded);
      }
    });

    return [...topCTypes, ...(ctypes || []).filter((ctype) => !TOP_CTYPES_FOR_ISSUE.includes(ctype.$id))];
  }, [ctypes, serverCTypes]);
}
