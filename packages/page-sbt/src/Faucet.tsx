// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useCallback, useMemo } from 'react';

import { Button, useNetwork } from '@credential/react-components';

import { useFaucet } from './hooks/useFaucet';

const Faucet = () => {
  const { chain, chains } = useNetwork();
  const { faucet } = useFaucet(chain?.id);

  const open = useCallback(() => {
    if (!faucet) return;

    window.open(faucet, '_blank');
  }, [faucet]);

  const isWrongNet = useMemo(() => chains.filter((_c) => _c.id === chain?.id).length === 0, [chains, chain]);

  return (
    <Button disabled={isWrongNet} onClick={open} size='small'>
      💧 Faucet
    </Button>
  );
};

export default Faucet;
