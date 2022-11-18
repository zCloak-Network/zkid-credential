// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useCallback, useMemo } from 'react';
import { NavigateOptions, useSearchParams } from 'react-router-dom';
import * as searchQuery from 'search-query-parser';

export function useQueryParam<T>(
  key: string
): [T | null, (newQuery: T, options?: NavigateOptions) => void] {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramValue = searchParams.get(key);

  const value = useMemo(
    () => (paramValue ? (searchQuery.parse(paramValue) as unknown as T) : null),
    [paramValue]
  );

  const setValue = useCallback(
    (newValue: T, options?: NavigateOptions) => {
      const newSearchParams = new URLSearchParams(searchParams);

      newSearchParams.set(key, searchQuery.stringify(newValue as any));
      setSearchParams(newSearchParams, options);
    },
    [key, searchParams, setSearchParams]
  );

  return [value, setValue];
}
