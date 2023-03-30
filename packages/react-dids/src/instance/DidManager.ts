// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DidResolver } from '@zcloak/did-resolver';
import type { DidUrl } from '@zcloak/did-resolver/types';
import type { Keyring } from '@zcloak/keyring';

import { Did } from '@zcloak/did';
import { isDidUrl } from '@zcloak/did/utils';
import { LoginDid } from '@zcloak/login-did';
import { ZkidWalletProvider } from '@zcloak/login-providers/types';
import { ZkDid } from '@zcloak/ui-did-keyring';
import { BrowserStore } from '@zcloak/ui-store';

import { CacheDB, DidDB } from '@credential/app-store/db';

import { isLoginDid } from '../is';

const store = new BrowserStore();

const STORAGE_KEY = 'current_did';

export class DidManager extends ZkDid {
  #resolver: DidResolver;
  private _current: Did | null = null;
  private _db: DidDB | null = null;

  public cacheDB: CacheDB = new CacheDB();

  constructor(keyring: Keyring, resolver: DidResolver) {
    super(keyring, store);
    this.#resolver = resolver;
  }

  public get current(): Did | null {
    return this._current;
  }

  public get db(): DidDB {
    if (!this._db) {
      throw new Error('No db init');
    }

    return this._db;
  }

  public setCurrent(value: Did) {
    localStorage.setItem(STORAGE_KEY, value.id);
    this._current = value;
    this._db = new DidDB(value.id);
    this.emit('changed', value);
  }

  public loadCurrent(): void {
    // get current did
    let didStore = localStorage.getItem(STORAGE_KEY);

    if (!isDidUrl(didStore)) {
      didStore = null;
    }

    let did: Did | null | undefined = null;

    // get did is exists
    if (didStore) {
      did = this.getDid(didStore);
    }

    // get the first if did not exits
    if (!did) {
      did = this.all().length > 0 ? this.all()[0] : null;
    }

    // swtich to exists did
    if (did) {
      this.setCurrent(did);
    }
  }

  // only support unique login did
  public reloadLoginDid(loginDid: LoginDid): void {
    this.dids.forEach((did, key) => {
      if (isLoginDid(did)) {
        this.remove(key);

        if (key === this._current?.id) {
          this.setCurrent(loginDid);
        }
      }
    });
    this.addDid(loginDid);
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

  public getDid(didUrl: DidUrl): Did | undefined {
    const parsed = this.#resolver.parseDid(didUrl);

    const did = this.dids.get(parsed.did);

    return did;
  }

  public override addDid(did: Did, password?: string | undefined): void {
    if (isLoginDid(did)) {
      this.dids.set(did.id, did);

      this.emit('add');
    } else {
      super.addDid(did, password);
    }
  }

  public override remove(didUrl: DidUrl): void {
    const did = this.getDid(didUrl);

    if (!did) return;

    if (isLoginDid(did)) {
      this.dids.delete(didUrl);

      this.emit('remove');
    } else {
      super.remove(didUrl);
    }
  }
}
