// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useEffect, useState } from 'react';

import { HexString } from '@zcloak/crypto/types';

import { CONTRACTS_CONFIG, getAbi } from '@credential/app-config';

export function useContractConfig(chainId?: number) {
  const [abi, setAbi] = useState<any>();
  const [toAddress, setToAddress] = useState<HexString>();

  useEffect(() => {
    if (chainId) setAbi(getAbi(chainId));
  }, [chainId]);

  useEffect(() => {
    if (chainId) setToAddress(CONTRACTS_CONFIG[chainId]);
  }, [chainId]);

  return { abi, toAddress };
}
