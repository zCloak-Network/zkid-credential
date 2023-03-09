// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useCallback } from 'react';

export function useStopPropagation(callback: (...params: any[]) => any) {
  return useCallback(
    (...params: any[]) => {
      params?.[0]?.stopPropagation?.();

      // eslint-disable-next-line n/no-callback-literal
      callback(...params);
    },
    [callback]
  );
}
