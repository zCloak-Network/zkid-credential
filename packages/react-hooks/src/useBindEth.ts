// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { hexToU8a } from '@polkadot/util';
import { useState } from 'react';

import { Did } from '@zcloak/did';

import { useContractRead, useNetwork } from '@credential/react-components';

import { useContractConfig } from './useContractConfig';

export function useBindEth(did: Did) {
  const [binded, setBinded] = useState<string>();
  const { chain } = useNetwork();

  const { abi, toAddress } = useContractConfig(chain?.id);

  const { isFetching, refetch } = useContractRead({
    address: toAddress,
    abi,
    functionName: 'checkBindingDB',
    args: [did.identifier],
    onSuccess: (data: any) => {
      const addr = hexToU8a(data).filter((item) => Boolean(item)).length ? data : undefined;

      setBinded(addr);
    }
  });

  return {
    binded,
    isFetching,
    refetch
  };
}
