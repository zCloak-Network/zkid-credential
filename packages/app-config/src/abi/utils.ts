// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { arbitrumGoerli, baseGoerli, lineaTestnet, optimismGoerli } from '@credential/react-components';

import { arbitrumGoerliSbtAbi } from './arbGoerli-sbt';
import { baseSbtAbi } from './base-sbt';
import { lineaAbi } from './linea-sbt';
import { opSbtAbi } from './op-sbt';

export function getAbi(chainId?: number) {
  switch (chainId) {
    case optimismGoerli.id:
      return opSbtAbi;
    case baseGoerli.id:
      return baseSbtAbi;
    case lineaTestnet.id:
      return lineaAbi;
    case arbitrumGoerli.id:
      return arbitrumGoerliSbtAbi;
    default:
      return undefined;
  }
}
