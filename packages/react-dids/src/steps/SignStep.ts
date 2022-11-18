// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BaseCType, CType } from '@zcloak/ctype/types';
import type { Did } from '@zcloak/did';
import type { RawCredential, VerifiableCredential } from '@zcloak/vc/types';

import { assert } from '@polkadot/util';

import { getPublish } from '@zcloak/ctype';
import { VerifiableCredentialBuilder } from '@zcloak/vc';
import { getDB } from '@credential/app-store';

export async function signAndBuildVC(
  rawCredential: RawCredential,
  sender?: Did | null
): Promise<VerifiableCredential> {
  assert(sender, 'No sender did provided');

  // TODO fetch ctype
  const ctype = await getDB(sender.id).ctype.get(rawCredential.ctype);
  
  assert(ctype, 'ctype not found');

  const builder = VerifiableCredentialBuilder.fromRawCredential(
    rawCredential,
    ctype
  ).setExpirationDate(null);

  const vc = builder.build(sender);

  return Promise.resolve(vc);
}

export async function signCType(base?: BaseCType | null, publisher?: Did | null): Promise<CType> {
  assert(publisher, 'No publisher did provided');
  assert(base, 'No BaseType provided');

  const ctype = getPublish(base, publisher);

  return Promise.resolve(ctype);
}
