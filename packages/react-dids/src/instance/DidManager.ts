// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DidResolver } from '@zcloak/did-resolver';
import type { DidUrl } from '@zcloak/did-resolver/types';
import type { Keyring } from '@zcloak/keyring';

import { Did } from '@zcloak/did';
import { LoginDid } from '@zcloak/login-did';
import { ZkidWalletProvider } from '@zcloak/login-providers';
import { ZkDid } from '@zcloak/ui-did-keyring';
import { BrowserStore } from '@zcloak/ui-store';

const store = new BrowserStore();

export class DidManager extends ZkDid {
  #resolver: DidResolver;

  constructor(keyring: Keyring, resolver: DidResolver) {
    super(keyring, store);
    this.#resolver = resolver;
  }

  public async loadLoginDid(provider: ZkidWalletProvider): Promise<void> {
    try {
      if (await provider.isAuth()) {
        this.addDid(await LoginDid.fromProvider(provider));
      }
    } catch (error) {
      console.error(error);
    }
  }

  public all(): Did[] {
    return Array.from(this.dids.values());
  }

  public getDid(didUrl: DidUrl): Did {
    const parsed = this.#resolver.parseDid(didUrl);

    const did = this.dids.get(parsed.did);

    if (!did) {
      throw new Error(`NotFound did ${parsed.did}`);
    }

    return did;
  }

  public override addDid(did: Did, password?: string | undefined): void {
    if (did instanceof LoginDid) {
      this.dids.set(did.id, did);

      this.emit('add');
    } else {
      super.addDid(did, password);
    }
  }

  public override remove(didUrl: DidUrl): void {
    const did = this.getDid(didUrl);

    if (!did) return;

    if (did instanceof LoginDid) {
      this.dids.delete(didUrl);

      this.emit('remove');
    } else {
      super.remove(didUrl);
    }
  }
}
