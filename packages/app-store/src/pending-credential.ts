// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@zcloak/crypto/types';
import type { DidUrl } from '@zcloak/did-resolver/types';
import type { HashType, RawCredential } from '@zcloak/vc/types';

import { useLiveQuery } from 'dexie-react-hooks';

import { useDB } from './useDB';

export type CredentialStatus = 'pending' | 'approved' | 'rejected';

export interface PendingCredential {
  rootHash: HexString;
  ctype: HexString;
  issuer: DidUrl;
  holder: DidUrl;
  submitDate: number;
  hasher: [HashType, HashType];
  status: CredentialStatus;
  rawCredential: RawCredential;
}

export function usePendingCredentials(
  status?: CredentialStatus[],
  name?: string
): PendingCredential[] | undefined {
  const db = useDB(name);

  return useLiveQuery(() => {
    if (db) {
      return db?.pendingCredential
        .filter((c) => (status ? status.includes(c.status) : true))
        .toArray();
    } else {
      return [];
    }
  }, [db]);
}
