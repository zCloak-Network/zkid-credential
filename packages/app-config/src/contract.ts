// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { HexString } from '@zcloak/crypto/types';

import { arbitrumGoerli, baseGoerli, lineaTestnet, optimismGoerli } from '@credential/react-components';

import { isRelease } from './isRelease';

interface CONTRACT_CONFIG {
  [key: number]: HexString;
}

interface zkSBTVersion {
  [key: number]: string;
}

export const ZKSBT_ADDRESS = isRelease
  ? '0x08f1a8Eeb39E861FcC78812fd1C79291cd3f88A7'
  : '0x1addc21e939b93e9337f8A663F62a64583b62233';

const optimismGoerliConfig = isRelease
  ? '0x08f1a8Eeb39E861FcC78812fd1C79291cd3f88A7'
  : '0x1addc21e939b93e9337f8A663F62a64583b62233';

const baseGoerliConfig = isRelease
  ? '0x1F042d47ddFd675A47F0aB2b99bea4Bb1d078032'
  : '0x1603bAdff8e39749D8f33dbDd234C5dab10313Dd';

const lineaGerliConfig = isRelease
  ? '0x5F5ff21a6D7136BBf21f55CfD9627673dBeed8cd'
  : '0x53a623B54016Ec65592f0026aBdc91C8194522b8';

const arbitrumGoerliConfig = '0xEBE3dc938916cCa495598bbce35DCcB788F5B995';

export const CONTRACTS_CONFIG: CONTRACT_CONFIG = {
  [optimismGoerli.id]: optimismGoerliConfig,
  [baseGoerli.id]: baseGoerliConfig,
  [lineaTestnet.id]: lineaGerliConfig,
  [arbitrumGoerli.id]: arbitrumGoerliConfig
};

export const zkSBTVersion: zkSBTVersion = {
  [optimismGoerli.id]: '0',
  [baseGoerli.id]: '1',
  [lineaTestnet.id]: '1',
  [arbitrumGoerli.id]: '1.1'
};

export const ZKSBT_CHAIN_ID = isRelease ? optimismGoerli.id : optimismGoerli.id;
export const VERIFIER_ADDRESS = '0xC2BADDbf6DCeDA9b68638a9de84063c1E0ee4350';

export const ZKSBT_CTYPE = isRelease
  ? '0x0289711acb57f600850341c7b0c8ab484b004ca8a6471777417cea2b8a88ba7a'
  : '0x0faa3462b6d45be3ce01dc570d8465035f68f516610b267a7b01d9b895d04351';

export const ETHERSCAN_URL = 'https://goerli-optimism.etherscan.io/tx';
export const ARBISCAN_URL = 'https://goerli.arbiscan.io/tx';
export const BASESCAN_URL = 'https://goerli.basescan.org/tx';
export const BLOCK_SCOUT_URL = 'https://explorer.goerli.linea.build/tx';

export const ZONIC_URL = 'https://testnet.zonic.app/profile';
export const OPENSEA_URL = 'https://testnets.opensea.io';
