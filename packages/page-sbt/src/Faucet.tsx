// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useCallback } from 'react';
import { useNetwork, useSwitchNetwork } from 'wagmi';

import { arbitrum, Button } from '@credential/react-components';

import { useFaucet } from '../../page-sbt/src/hooks/useFaucet';

const Faucet = () => {
  const { chain } = useNetwork();
  const { chains } = useSwitchNetwork();
  const { faucet } = useFaucet(chain?.id);

  const open = useCallback(() => {
    if (!faucet) return;

    window.open(faucet, '_blank');
  }, [faucet]);

  const isWrongNet = chains.filter((_c) => _c.id === chain?.id).length === 0;

  chains.join();

  return (
    <Button disabled={isWrongNet || chain?.id === arbitrum.id} onClick={open} size='small'>
      💧 Faucet
    </Button>
  );
};

export default Faucet;
