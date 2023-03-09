// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@zcloak/crypto/types';
import type { DidUrl } from '@zcloak/did-resolver/types';
import type { HashType, RawCredential } from '@zcloak/vc/types';

import { isHex } from '@polkadot/util';

import { randomAsHex } from '@zcloak/crypto';

import { didManager } from '@credential/react-dids/instance';

export type CredentialStatus = 'pending' | 'approved' | 'rejected';

export interface PendingCredential {
  rootHash: HexString;
  ctype: HexString;
  issuer: DidUrl;
  holder: DidUrl;
  submitDate: number;
  hasher: [HashType, HashType];
  status: CredentialStatus;
  boundMessageId: string;
  rawCredential: RawCredential;
}

export function getPendingCredentials(status?: CredentialStatus[]): Promise<PendingCredential[]> {
  return didManager.db.pendingCredential
    .orderBy('submitDate')
    .reverse()
    .filter((c) => (status ? status.includes(c.status) : true))
    .toArray();
}

export async function addPendingCredential(
  rawCredential: RawCredential,
  issuer: DidUrl,
  boundMessageId: string
): Promise<void> {
  if (isHex(rawCredential.credentialSubject)) return;

  const exists = await didManager.db.pendingCredential.filter((c) => c.boundMessageId === boundMessageId).toArray();

  if (exists.length === 0) {
    await didManager.db.pendingCredential.add({
      rootHash: randomAsHex(32),
      ctype: rawCredential.ctype,
      issuer,
      holder: rawCredential.holder,
      submitDate: Date.now(),
      hasher: rawCredential.hasher,
      status: 'pending',
      boundMessageId,
      rawCredential
    });
  }
}

export async function updatePendingCredential(boundMessageId: string, status: CredentialStatus): Promise<void> {
  await didManager.db.pendingCredential
    .filter((c) => c.boundMessageId === boundMessageId)
    .modify({
      status
    });
}
