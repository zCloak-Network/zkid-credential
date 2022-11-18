// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DidUrl } from '@zcloak/did-resolver/types';

import { useEffect, useState } from 'react';

import { Did, helpers } from '@zcloak/did';

import { resolver } from './instance';

export function useDid(didUrl: DidUrl): Did | null {
  const [did, setDid] = useState<Did | null>(null);

  useEffect(() => {
    helpers.fromDid(didUrl, undefined, resolver).then(setDid);
  }, [didUrl]);

  return did;
}
