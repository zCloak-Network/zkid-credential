// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { PropsWithChildren } from 'react';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { arbitrum, arbitrumGoerli, baseGoerli, lineaTestnet, optimismGoerli } from 'wagmi/chains';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient } = configureChains(
  [arbitrum, optimismGoerli, baseGoerli, lineaTestnet, arbitrumGoerli],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  connectors: [
    new MetaMaskConnector({
      chains: chains.filter((c) => c.id !== arbitrum.id),
      options: {
        UNSTABLE_shimOnConnectSelectAccount: true
      }
    }),
    new CoinbaseWalletConnector({
      chains: chains.filter((c) => c.id !== lineaTestnet.id && c.id !== arbitrum.id),
      options: {
        appName: 'zkid'
      }
    })
  ]
});

const configMain = createConfig({
  autoConnect: true,
  publicClient,
  connectors: [
    new MetaMaskConnector({
      chains: chains.filter((c) => c.id === arbitrum.id),
      options: {
        UNSTABLE_shimOnConnectSelectAccount: true
      }
    }),
    new CoinbaseWalletConnector({
      chains: chains.filter((c) => c.id === arbitrum.id),
      options: {
        appName: 'zkid'
      }
    })
  ]
});

const WagmiProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <WagmiConfig config={location.href.includes('sbt/') || location.href.includes('/zk-kyc2023') ? configMain : config}>
      {children}
    </WagmiConfig>
  );
};

export default WagmiProvider;
