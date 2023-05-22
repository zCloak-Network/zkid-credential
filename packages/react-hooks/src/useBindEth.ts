// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { hexToU8a } from '@polkadot/util';
import { useState } from 'react';

import { Did } from '@zcloak/did';

import { zCloakSBTAbi, ZKSBT_ADDRESS } from '@credential/app-config';
import { useContractRead } from '@credential/react-components';

export function useBindEth(did: Did) {
  const [binded, setBinded] = useState<string>();

  const { isFetching, refetch } = useContractRead({
    address: ZKSBT_ADDRESS,
    abi: zCloakSBTAbi,
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
