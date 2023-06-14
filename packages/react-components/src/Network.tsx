// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { alpha, Button, Popover, Stack } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import { useNetwork, useSwitchNetwork } from 'wagmi';

import { IconNetwork } from '@credential/app-config';

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
        startIcon={isWrongNet ? <WarningAmberIcon /> : <IconNetwork />}
        sx={{
          width: 200,
          bgcolor: alpha('#0012FF', 0.1),
          color: isWrongNet ? '' : 'primary.main'
        }}
      >
        {isWrongNet ? 'Wrong network' : chain?.name}
      </Button>

      <Popover
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
            <Button disabled={!switchNetwork || x.id === chain?.id} key={x.id} onClick={() => changeNetwork(x.id)}>
              {x.name}
            </Button>
          ))}
        </Stack>
      </Popover>
    </>
  );
};

export default Network;
