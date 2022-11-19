// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Credential } from './credential';
import type { CType } from './ctype';
import type { PendingCredential } from './pending-credential';

import Dexie, { Table } from 'dexie';

export class DB extends Dexie {
  public ctype!: Table<CType>;
  public credential!: Table<Credential>;
  public pendingCredential!: Table<PendingCredential>;

  constructor(name: string) {
    super(`zkid:credential:${name}`);
    this.version(1).stores({
      pendingCredential:
        'rootHash, ctype, issuer, holder, submitDate, status, *hasher, *rawCredential',
      credential:
        'digest, rootHash, ctype, issuer, holder, issuanceDate, expirationDate, *hasher, *vc',
      ctype: '&$id, $schema, publisher, signature, title, description, type, *properties, *required'
    });
  }
}
