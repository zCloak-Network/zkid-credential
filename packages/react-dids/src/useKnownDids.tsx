// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useMemo } from 'react';

import { DidUrl } from '@zcloak/did-resolver/types';

import { allDids } from '@credential/app-store/cache-did';
import { useLiveQuery } from '@credential/react-hooks';

import { resolver } from './instance';

export function useKnownDids(): DidUrl[] {
  const dids = useLiveQuery(allDids);

  return useMemo(() => {
    const set = new Set<DidUrl>(dids ?? []);

    resolver.knownDids.forEach((did) => set.add(did));

    return Array.from(set);
  }, [dids]);
}
