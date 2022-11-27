// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { isArray, isBoolean, isNumber, isObject } from '@polkadot/util';

export function isInteger(value: unknown): value is number {
  return isNumber(value) && Number.isInteger(value);
}

export function isString(value: unknown): value is string {
  return typeof value === 'string' || value instanceof String;
}

export function isVector(value: unknown): value is Array<unknown> {
  return isArray(value);
}

export function isVectorFixed(value: unknown, length: number): value is Array<unknown> {
  return isArray(value) && value.length === length;
}

type InstanceTypeDefault = {
  object: Record<string, unknown>;
  array: unknown[];
  boolean: boolean;
  integer: number;
  null: null;
  number: number;
  string: string;
};

type InstanceType = keyof InstanceTypeDefault;

type ReturnT = InstanceTypeDefault[InstanceType];

export function isOrDefault<T extends InstanceType>(
  type: T,
  value: unknown,
  { length }: { length?: number } = {}
): ReturnT {
  if (type === 'object') {
    return isObject<Record<string, unknown>>(value) ? value : {};
  } else if (type === 'array') {
    return length
      ? isVectorFixed(value, length)
        ? value
        : Array.from({ length })
      : isVector(value)
      ? value
      : Array.from({ length: 1 });
  } else if (type === 'string') {
    return isString(value) ? value : '';
  } else if (type === 'boolean') {
    return isBoolean(value) ? value : '';
  } else if (type === 'integer') {
    return isInteger(value) ? value : 0;
  } else if (type === 'number') {
    return isNumber(value) ? value : 0;
  } else {
    return null;
  }
}
