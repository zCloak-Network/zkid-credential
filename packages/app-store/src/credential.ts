// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@zcloak/crypto/types';
import type { DidUrl } from '@zcloak/did-resolver/types';
import type { HashType, VerifiableCredential } from '@zcloak/vc/types';

import { isHex } from '@polkadot/util';
import { useLiveQuery } from 'dexie-react-hooks';
import { useCallback } from 'react';

import { calcRoothash } from '@zcloak/vc';

import { useDB } from './useDB';

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

export function useCredentials(name?: string): Credential[] | undefined {
  const db = useDB(name);

  return useLiveQuery(() => {
    if (db) {
      return db?.credential.toArray();
    } else {
      return [];
    }
  }, [db]);
}

export function useImportVcCallback(
  vc: VerifiableCredential | null | undefined,
  name?: string
): () => Promise<void> {
  const db = useDB(name);

  return useCallback(async () => {
    if (!db || !vc) return;

    const exists = await db.credential
      .filter((credential) => credential.digest === vc.digest && credential.issuer === vc.issuer)
      .first();

    if (exists) {
      throw new Error(`The vc with digest: ${vc.digest} and issuer: ${vc.issuer} is exists`);
    }

    if (isHex(vc.credentialSubject)) {
      throw new Error('The vc subject is not an object');
    }

    await db.credential.add({
      digest: vc.digest,
      rootHash: calcRoothash(vc.credentialSubject, vc.hasher[0], vc.credentialSubjectNonceMap)
        .rootHash,
      ctype: vc.ctype,
      issuer: vc.issuer,
      holder: vc.holder,
      hasher: vc.hasher,
      issuanceDate: vc.issuanceDate,
      expirationDate: vc.expirationDate,
      vc
    });
  }, [db, vc]);
}
