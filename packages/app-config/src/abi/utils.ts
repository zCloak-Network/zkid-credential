// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { baseGoerli, optimismGoerli } from '@credential/react-components';

import { baseSbtAbi } from './base-sbt';
import { opSbtAbi } from './op-sbt';

export function getAbi(chainId?: number) {
  switch (chainId) {
    case optimismGoerli.id:
      return opSbtAbi;
    case baseGoerli.id:
      return baseSbtAbi;
    default:
      return undefined;
  }
}
