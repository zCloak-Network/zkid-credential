// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@zcloak/crypto/types';
import type { DidUrl } from '@zcloak/did-resolver/types';
import type { HashType, VerifiableCredential } from '@zcloak/vc/types';

import { isHex } from '@polkadot/util';

import { calcRoothash } from '@zcloak/vc';
import { isPrivateVC } from '@zcloak/vc/is';

import { didManager } from '@credential/react-dids/instance';

export interface Credential {
  digest: HexString;
  rootHash: HexString;
  ctype: HexString;
  issuer: DidUrl;
  holder: DidUrl;
  hasher: [HashType, HashType];
  issuanceDate: number;
  expirationDate?: number;
  vc: VerifiableCredential<boolean>;
}

export function getCredentials(): Promise<Credential[]> {
  return didManager.db.credential.toArray();
}

export async function addVC(vc: VerifiableCredential<boolean> | null | undefined): Promise<Credential | null> {
  if (!vc) return null;

  if (isHex(vc.credentialSubject)) {
    throw new Error('The vc subject is not an object');
  }

  const rootHash = isPrivateVC(vc)
    ? calcRoothash(vc.credentialSubject, vc.hasher[0], vc.credentialSubjectNonceMap).rootHash
    : calcRoothash(vc.credentialSubject, vc.hasher[0]).rootHash;

  const exists = await didManager.db.credential
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

  await didManager.db.credential.add(credential);

  return credential;
}
