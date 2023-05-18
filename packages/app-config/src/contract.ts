// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { optimism, optimismGoerli } from '@credential/react-components';

import { isRelease } from './isRelease';

export const ZKSBT_ADDRESS = isRelease
  ? '0xA0c532091CbcBa56a5EAf657aEf7Db77e1C50D68'
  : '0xA0c532091CbcBa56a5EAf657aEf7Db77e1C50D68';

export const ZKSBT_CHAIN_ID = isRelease ? optimism.id : optimismGoerli.id;
