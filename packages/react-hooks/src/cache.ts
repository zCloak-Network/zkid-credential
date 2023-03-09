// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

export const serializer = (value: any): string => {
  return JSON.stringify({
    value,
    time: Date.now()
  });
};

export const deserializer = <T = any>(value: string): T => {
  return JSON.parse(value).value;
};

export const getCache = <T = any>(key: string): T | undefined => {
  const value = localStorage.getItem(key);

  if (value) {
    return deserializer<T>(value);
  }

  return undefined;
};
