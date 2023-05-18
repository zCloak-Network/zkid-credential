// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { hexToU8a } from '@polkadot/util';
import { useContext, useState } from 'react';

import { zCloakSBTAbi, ZKSBT_ADDRESS } from '@credential/app-config';
import { Button, Stack, Typography, useContractRead } from '@credential/react-components';
import { DidsContext } from '@credential/react-dids';
import { useToggle } from '@credential/react-hooks';

import TextWithBg from './eth-bind/TextWithBg';
import EthBind from './eth-bind';

const OnChainRecipient = () => {
  const [open, toggle] = useToggle();
  const { did } = useContext(DidsContext);
  const [binded, setBinded] = useState<string>();
  const { isFetching, refetch } = useContractRead({
    address: ZKSBT_ADDRESS,
    abi: zCloakSBTAbi,
    functionName: 'checkBindingDB',
    args: [did.identifier],
    onSuccess: (data: any) => {
      const addr = hexToU8a(data).filter((item) => Boolean(item)).length ? data : undefined;

      setBinded(addr);

      return addr;
    }
  });

  return (
    <Stack mt={4}>
      <Typography
        mb={1}
        sx={({ palette }) => ({
          color: palette.grey[700]
        })}
        variant='inherit'
      >
        Ethereum Address:
      </Typography>
      {binded ? (
        <Typography>{binded}</Typography>
      ) : (
        <Button
          disabled={isFetching}
          onClick={toggle}
          sx={{
            width: 113
          }}
          variant='contained'
        >
          Set
        </Button>
      )}
      <TextWithBg bgcolor='#FBFAFC' mt={3}>
        <Stack spacing={2}>
          <Typography>
            After setting up the Ethereum on-chain recipient address, each subsequent zkID Card will be sent to this
            address.
          </Typography>
          <Typography>Please note:</Typography>
          <Typography color='#0042F1'>• Please select a commonly used Ethereum address for future use.</Typography>
          <Typography color='#0042F1'>
            • Once the setup is complete, if any changes are made, all zkID Cards under that address will be burned.
          </Typography>
        </Stack>
      </TextWithBg>
      {open && <EthBind onClose={toggle} open={open} refetch={refetch} />}
    </Stack>
  );
};

export default OnChainRecipient;
