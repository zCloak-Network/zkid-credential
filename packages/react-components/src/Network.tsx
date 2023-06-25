// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { alpha, Box, Button, Popover, Stack } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import { useNetwork, useSwitchNetwork } from 'wagmi';

import { BaseLogo, LineaLogo, OptimismLogo } from '@credential/app-config';

import { baseGoerli, lineaTestnet, optimismGoerli } from '.';

function ChainIcon({ chainId }: { chainId?: number }) {
  switch (chainId) {
    case baseGoerli.id:
      return <BaseLogo />;
    case optimismGoerli.id:
      return <OptimismLogo />;
    case lineaTestnet.id:
      return (
        <Box alignItems='center' bgcolor='#000' display='flex' height={16} justifyContent='center' width={16}>
          <LineaLogo />
        </Box>
      );
    default:
      return <WarningAmberIcon />;
  }
}

const Network = () => {
  const { chain } = useNetwork();
  const { chains, switchNetwork, switchNetworkAsync } = useSwitchNetwork();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const changeNetwork = useCallback(
    async (chainId?: number) => {
      try {
        switchNetworkAsync && (await switchNetworkAsync(chainId));
      } catch (error) {
      } finally {
        setAnchorEl(null);
      }
    },
    [switchNetworkAsync]
  );

  const isWrongNet = useMemo(() => chains.filter((_c) => _c.id === chain?.id).length === 0, [chains, chain]);

  return (
    <>
      <Button
        endIcon={open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        onClick={handleClick}
        sx={{
          width: 50,
          bgcolor: alpha('#0012FF', 0.1),
          color: isWrongNet ? '' : 'primary.main'
        }}
      >
        <ChainIcon chainId={chain?.id} />
      </Button>

      <Popover
        PaperProps={{
          sx: {
            borderRadius: '8px',
            marginTop: '16px'
          }
        }}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        onClose={handleClose}
        open={open}
      >
        <Stack width={200}>
          {chains.map((x) => (
            <Button
              disabled={!switchNetwork || x.id === chain?.id}
              key={x.id}
              onClick={() => changeNetwork(x.id)}
              startIcon={<ChainIcon chainId={x.id} />}
            >
              {x.name}
            </Button>
          ))}
        </Stack>
      </Popover>
    </>
  );
};

export default Network;
