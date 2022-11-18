// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CType } from '@zcloak/ctype/types';
import type { Did } from '@zcloak/did';
import type { RawCredential, VerifiableCredential } from '@zcloak/vc/types';

import { assert } from '@polkadot/util';

import { VerifiableCredentialBuilder } from '@zcloak/vc';

export async function signAndBuildVC(
  rawCredential: RawCredential,
  sender?: Did | null
): Promise<VerifiableCredential> {
  assert(sender, 'No sender did provided');

  // TODO fetch ctype
  const ctype: CType = {} as any;
  const builder = VerifiableCredentialBuilder.fromRawCredential(
    rawCredential,
    ctype
  ).setExpirationDate(null);

  const vc = builder.build(sender);

  return Promise.resolve(vc);
}
