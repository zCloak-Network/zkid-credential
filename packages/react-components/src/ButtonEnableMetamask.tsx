// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { LoadingButton, LoadingButtonProps, LoadingButtonTypeMap } from '@mui/lab';
import { OverrideProps } from '@mui/material/OverridableComponent';
import { optimism, optimismGoerli } from '@wagmi/core/chains';
import React, { useCallback } from 'react';
import { useAccount, useConnect } from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

import { isRelease } from '@credential/app-config';

type EnableProps = {
  onEnable?: (...args: any) => void;
};

type Props = LoadingButtonProps & EnableProps;

function ButtonEnableMetamask(props: Props): React.ReactElement;
function ButtonEnableMetamask<C extends React.ElementType>(
  props: { component: C } & OverrideProps<LoadingButtonTypeMap, C> & EnableProps
): React.ReactElement;
function ButtonEnableMetamask<C extends React.ElementType>({
  onEnable,
  ...props
}: Props | ({ component: C } & OverrideProps<LoadingButtonTypeMap, C>)) {
  const { isConnected } = useAccount();

  const { connectAsync, connectors } = useConnect();
  const connect = useCallback(async () => {
    const connector = connectors.filter((c) => {
      return c instanceof MetaMaskConnector;
    })[0];

    const chainId = isRelease ? optimism.id : optimismGoerli.id;

    try {
      await connectAsync({ connector, chainId });

      onEnable && onEnable();
    } catch (error) {}
  }, [onEnable, connectAsync, connectors]);

  return window?.ethereum ? (
    isConnected ? (
      <LoadingButton {...props} />
    ) : (
      <LoadingButton {...props} disabled={false} onClick={connect}>
        Connect Wallet
      </LoadingButton>
    )
  ) : (
    <LoadingButton
      {...(props as any)}
      component='a'
      href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'
      target='_blank'
    >
      Install Metamask
    </LoadingButton>
  );
}

export default ButtonEnableMetamask;
