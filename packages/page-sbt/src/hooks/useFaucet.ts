// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useEffect, useState } from 'react';

import { arbitrumGoerli, baseGoerli, lineaTestnet, optimismGoerli } from '@credential/react-components';

const baseFaucet = 'https://faucet.quicknode.com/base/goerli';
const opFaucet = 'https://faucet.quicknode.com/optimism/goerli';
const lineaFaucet = 'https://www.infura.io/faucet/linea';
const arbgoerliFaucet = 'https://faucet.quicknode.com/arbitrum/goerli';

export function useFaucet(chainId?: number) {
  const [faucet, setFaucet] = useState<string>();

  useEffect(() => {
    switch (chainId) {
      case baseGoerli.id:
        setFaucet(baseFaucet);
        break;

      case optimismGoerli.id:
        setFaucet(opFaucet);
        break;

      case lineaTestnet.id:
        setFaucet(lineaFaucet);
        break;
      case arbitrumGoerli.id:
        setFaucet(arbgoerliFaucet);
        break;
      default:
        setFaucet(undefined);
        break;
    }
  }, [chainId]);

  return { faucet };
}
