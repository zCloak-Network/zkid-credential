// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { optimismGoerli } from '@credential/react-components';

import { isRelease } from './isRelease';

export const ZKSBT_ADDRESS = isRelease
  ? '0x1addc21e939b93e9337f8A663F62a64583b62233'
  : '0x1addc21e939b93e9337f8A663F62a64583b62233';

export const ZKSBT_CHAIN_ID = isRelease ? optimismGoerli.id : optimismGoerli.id;
export const VERIFIER_ADDRESS = '0xC2BADDbf6DCeDA9b68638a9de84063c1E0ee4350';

export const ZKSBT_CTYPE = isRelease
  ? '0xac1bb679c36ac9774c2ca8d9542c9eeba56fea55fa92399edcc1b6bb42883bbb'
  : '0xa7b43d9dfcaa0dca9f04933146369641f34307916204715ddd972a7f2f1ed443';

export const ETHERSCAN_URL = 'https://goerli-optimism.etherscan.io/tx';
export const OPENSEA_URL = 'https://testnets.opensea.io';
