// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BaseCType, CType } from '@zcloak/ctype/types';
import type { Did } from '@zcloak/did';
import type { RawCredential, VerifiableCredential } from '@zcloak/vc/types';

import { assert } from '@polkadot/util';

import { getPublish } from '@zcloak/ctype';
import { VerifiableCredentialBuilder } from '@zcloak/vc';

export async function signAndBuildVC(
  rawCredential: RawCredential,
  serverCTypes: CType[],
  sender?: Did | null
): Promise<VerifiableCredential<false>> {
  assert(sender, 'No sender did provided');

  const ctype = serverCTypes.find((ctype) => ctype.$id === rawCredential.ctype);

  assert(ctype, 'ctype not found');

  const builder = VerifiableCredentialBuilder.fromRawCredential(rawCredential, ctype).setExpirationDate(null);

  const vc = builder.build(sender);

  return Promise.resolve(vc);
}

export async function signCType(base?: BaseCType | null, publisher?: Did | null): Promise<CType> {
  assert(publisher, 'No publisher did provided');
  assert(base, 'No BaseType provided');

  const ctype = getPublish(base, publisher);

  return Promise.resolve(ctype);
}
