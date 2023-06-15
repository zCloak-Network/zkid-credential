// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useCallback, useMemo } from 'react';

import { baseGoerli, Button, useNetwork } from '@credential/react-components';

const baseFaucet = 'https://faucet.quicknode.com/base/goerli';
const opFaucet = 'https://faucet.quicknode.com/optimism/goerli';

const Faucet = () => {
  const { chain, chains } = useNetwork();

  const open = useCallback(() => {
    window.open(chain?.id === baseGoerli.id ? baseFaucet : opFaucet, '_blank');
  }, [chain]);

  const isWrongNet = useMemo(() => chains.filter((_c) => _c.id === chain?.id).length === 0, [chains, chain]);

  return (
    <Button disabled={isWrongNet} onClick={open} size='small'>
      💧 Faucet
    </Button>
  );
};

export default Faucet;
