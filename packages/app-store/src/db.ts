// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CacheDid } from './cache-did';
import type { Credential } from './credential';
import type { CType } from './ctype';
import type { PendingCredential } from './pending-credential';

import Dexie, { Table } from 'dexie';

export class CacheDB extends Dexie {
  public cacheDid!: Table<CacheDid>;

  constructor() {
    super(`zkid:credential:cache`);
    this.version(1).stores({
      cacheDid: '&did, *document'
    });
  }
}

export class DidDB extends Dexie {
  public ctype!: Table<CType>;
  public credential!: Table<Credential>;
  public pendingCredential!: Table<PendingCredential>;

  constructor(name: string) {
    super(`zkid:credential:${name}`);
    this.version(2).stores({
      pendingCredential:
        'rootHash, ctype, issuer, holder, submitDate, status, *hasher, *rawCredential',
      credential:
        'digest, rootHash, ctype, issuer, holder, issuanceDate, expirationDate, *hasher, *vc',
      ctype: '&$id, $schema, publisher, signature, title, description, type, *properties, *required'
    });
  }
}

export class DB {
  public cacheDB: CacheDB;
  public didDB: DidDB;

  constructor(cacheDB: CacheDB, didDB: DidDB) {
    this.cacheDB = cacheDB;
    this.didDB = didDB;
  }

  public get cacheDid(): Table<CacheDid> {
    return this.cacheDB.cacheDid;
  }

  public get ctype(): Table<CType> {
    return this.didDB.ctype;
  }

  public get credential(): Table<Credential> {
    return this.didDB.credential;
  }

  public get pendingCredential(): Table<PendingCredential> {
    return this.didDB.pendingCredential;
  }
}
