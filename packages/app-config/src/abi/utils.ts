// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { baseGoerli, lineaTestnet, optimismGoerli } from '@credential/react-components';

import { baseSbtAbi } from './base-sbt';
import { opSbtAbi } from './op-sbt';
import { lineaAbi } from './linea-sbt';

export function getAbi(chainId?: number) {
  switch (chainId) {
    case optimismGoerli.id:
      return opSbtAbi;
    case baseGoerli.id:
      return baseSbtAbi;
    case lineaTestnet.id:
      return lineaAbi;
    default:
      return undefined;
  }
}
