// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { LoadingButton, LoadingButtonProps, LoadingButtonTypeMap } from '@mui/lab';
import { Button, Dialog, DialogContent, Stack, Typography } from '@mui/material';
import { OverrideProps } from '@mui/material/OverridableComponent';
import React from 'react';
import { baseGoerli } from 'viem/chains';
import { useAccount, useConnect } from 'wagmi';

import { IconCoinbase, LogoMetamask } from '@credential/app-config';
import { useToggle } from '@credential/react-hooks';

import DialogHeader from './DialogHeader';

type EnableProps = {
  onEnable?: (...args: any) => void;
};

type InitialNetworkIdProps = {
  initialNetworkId?: number;
}

type Props = LoadingButtonProps & EnableProps & InitialNetworkIdProps;

function Icon({ name }: { name?: string }) {
  if (name === 'MetaMask') {
    return <LogoMetamask />;
  } else {
    return <IconCoinbase />;
  }
}

function ConnectWallet(props: Props): React.ReactElement;
function ConnectWallet<C extends React.ElementType>(
  props: { component: C } & OverrideProps<LoadingButtonTypeMap, C> & EnableProps
): React.ReactElement;
function ConnectWallet<C extends React.ElementType>({
  ...props
}: Props | ({ component: C } & OverrideProps<LoadingButtonTypeMap, C>)) {
  const { connect, connectors, isLoading, pendingConnector } = useConnect();
  const { isConnected } = useAccount();
  const [open, toggle] = useToggle();

  return (
    <>
      {isConnected ? (
        <LoadingButton {...props} />
      ) : (
        <Button onClick={toggle} {...props}>
          Connect Wallet
        </Button>
      )}
      {open && (
        <Dialog open={open}>
          <DialogHeader onClose={toggle}>
            <Typography variant='h2'>Connect Wallet</Typography>
          </DialogHeader>
          <DialogContent>
            <Stack spacing={3}>
              {connectors.map((connector) => (
                <LoadingButton
                  fullWidth
                  key={connector.id}
                  loading={isLoading && pendingConnector?.id === connector.id}
                  onClick={() =>
                    connect({ connector, chainId: props.initialNetworkId ? props.initialNetworkId : baseGoerli.id })
                  }
                  startIcon={<Icon name={connector.name} />}
                  sx={{
                    background: '#EFF1F9',
                    height: 60
                  }}
                >
                  {connector.name}
                </LoadingButton>
              ))}
            </Stack>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default ConnectWallet;
