// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BaseCType } from '@zcloak/ctype/types';

const ID_CHAR = '[a-zA-Z0-9_.-]';
const METHOD = 'zk';
const METHOD_ID = `(${ID_CHAR}+(:${ID_CHAR}+)*)`;

const PATH = '(/[^#?]*)?';
const QUERY = '([?][^#]*)?';
const FRAGMENT = '(#.*)?';

export const testCType: BaseCType = {
  title: 'Demo ctype',
  description: 'This is a demo ctype for example all type',
  type: 'object',
  properties: {
    String: {
      type: 'string'
    },
    StringWithLength: {
      type: 'string',
      maxLength: 30,
      minLength: 1
    },
    StringWithDidPattern: {
      type: 'string',
      pattern: `^did:(${METHOD}):${METHOD_ID}${PATH}${QUERY}${FRAGMENT}$`
    },
    Integer: {
      type: 'integer'
    },
    IntegerWithSize: {
      type: 'integer',
      maximum: 99,
      minimum: 18
    },
    Number: {
      type: 'number'
    },
    NumberWithSize: {
      type: 'number',
      maximum: 99,
      minimum: 18
    },
    NumberWithMultiple: {
      type: 'number',
      multipleOf: 4
    },
    Boolean: {
      type: 'boolean'
    },
    Null: {
      type: 'null'
    },
    Object: {
      type: 'object',
      properties: {
        ObjectKey1: {
          type: 'string'
        }
      }
    },
    Array: {
      type: 'array'
    },
    ArrayWithUnique: {
      type: 'array',
      items: { type: 'string' },
      uniqueItems: true
    },
    ArrayWithType: {
      type: 'array',
      items: { type: 'string' }
    },
    ArrayWithFixedLength: {
      type: 'array',
      items: [
        {
          type: 'string'
        },
        { type: 'string' },
        { type: 'number' }
      ]
    },
    EnumString: {
      type: 'string',
      enum: ['String1', 'String2', 'String3']
    },
    EnumNumber: {
      type: 'number',
      enum: [1, 32, 43.4]
    },
    EnumInteger: {
      type: 'integer',
      enum: [1, 2, 3]
    },
    EnumArray: {
      type: 'array',
      enum: ['ArraySelected1', 'ArraySelected2', 'ArraySelected3', 'ArraySelected4', 'ArraySelected5', 'ArraySelected6']
    }
  }
};
