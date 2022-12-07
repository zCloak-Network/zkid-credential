// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DidResolver } from '@zcloak/did-resolver';
import type { DidUrl } from '@zcloak/did-resolver/types';
import type { Keyring } from '@zcloak/keyring';

import { Did } from '@zcloak/did';
import { ZkDid } from '@zcloak/ui-did-keyring';
import { BrowserStore } from '@zcloak/ui-store';

const store = new BrowserStore();

export class DidManager extends ZkDid {
  #resolver: DidResolver;

  constructor(keyring: Keyring, resolver: DidResolver) {
    super(keyring, store);
    this.#resolver = resolver;
  }

  public all(): Did[] {
    return Array.from(this.dids.values());
  }

  public current(): Did {
    return Array.from(this.dids.values())[0];
  }

  public getDid(didUrl: DidUrl): Did {
    const parsed = this.#resolver.parseDid(didUrl);

    const did = this.dids.get(parsed.did);

    if (!did) {
      throw new Error(`NotFound did ${parsed.did}`);
    }

    return did;
  }
}
