// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useEffect, useState } from 'react';

import { DidUrl } from '@zcloak/did-resolver/types';

import { resolver } from '@credential/react-dids/instance';

export function useVid(did: DidUrl) {
  const [vid, setVid] = useState<string>(did);

  useEffect(() => {
    resolver.getVid(did).then((name) => name && setVid(name));
  }, [did]);

  return { vid };
}
