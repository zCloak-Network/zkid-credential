// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { deserializer, getCache, serializer } from './cache';

export function useLocalStorage<T>(key: string): [T | undefined, (value: T | ((value: T) => T)) => void, () => void];
export function useLocalStorage<T>(
  key: string,
  initialvalue: T
): [T, (value: T | ((value: T) => T)) => void, () => void];

export function useLocalStorage<T>(
  key: string,
  initialvalue?: T
): [T | undefined, (value: T | ((value: T | undefined) => T)) => void, () => void] {
  const keyRef = useRef<string>(key);

  const [value, setValue] = useState<T | undefined>(getCache<T>(keyRef.current) || initialvalue);

  const remove = useCallback(() => {
    localStorage.removeItem(keyRef.current);
    setValue(undefined);
  }, []);

  useEffect(() => {
    const _value = localStorage.getItem(keyRef.current);

    if (_value) {
      setValue(deserializer(_value));
    }
  }, []);

  useEffect(() => {
    const v = serializer(value);

    localStorage.setItem(keyRef.current, v);
  }, [value]);

  return useMemo(() => [value, setValue, remove], [remove, value]);
}
