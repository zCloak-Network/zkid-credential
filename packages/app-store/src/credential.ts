// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@zcloak/crypto/types';
import type { DidUrl } from '@zcloak/did-resolver/types';
import type { HashType, VerifiableCredential } from '@zcloak/vc/types';

import { isHex } from '@polkadot/util';

import { calcRoothash } from '@zcloak/vc';

import { DB } from './db';
import { getDB } from './MultiDB';

export interface Credential {
  digest: HexString;
  rootHash: HexString;
  ctype: HexString;
  issuer: DidUrl;
  holder: DidUrl;
  hasher: [HashType, HashType];
  issuanceDate: number;
  expirationDate?: number;
  vc: VerifiableCredential;
}

export function getCredentials(nameOrDB: string | DB): Promise<Credential[]> {
  const db = getDB(nameOrDB);

  return db.credential.toArray();
}

export async function addVC(
  nameOrDB: string | DB,
  vc: VerifiableCredential | null | undefined
): Promise<Credential | null> {
  const db = getDB(nameOrDB);

  if (!vc) return null;

  if (isHex(vc.credentialSubject)) {
    throw new Error('The vc subject is not an object');
  }

  const rootHash = calcRoothash(
    vc.credentialSubject,
    vc.hasher[0],
    vc.credentialSubjectNonceMap
  ).rootHash;

  const exists = await db.credential
    .filter((credential) => credential.digest === vc.digest && credential.issuer === vc.issuer)
    .first();

  if (exists) {
    return null;
  }

  const credential: Credential = {
    digest: vc.digest,
    rootHash,
    ctype: vc.ctype,
    issuer: vc.issuer,
    holder: vc.holder,
    hasher: vc.hasher,
    issuanceDate: vc.issuanceDate,
    expirationDate: vc.expirationDate,
    vc
  };

  await db.credential.add(credential);

  return credential;
}
