// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { CType } from '@zcloak/ctype/types';
import { ArweaveDidResolver } from '@zcloak/did-resolver';
import { DidDocumentWithProof } from '@zcloak/did-resolver/types';

import { get, post } from '../utils/request';

export class CredentialDidResolver extends ArweaveDidResolver {
  constructor(server?: string) {
    super({ server });
  }

  async submitDid(did: DidDocumentWithProof) {
    const res = await post(`${this.server}/did`, did);

    if (res?.code !== 200) {
      throw new Error(res?.message);
    }
  }

  async submitAttesterCtype(ctype: CType, reCAPTCHA?: string) {
    const res = await post(`${this.server}/ctype`, { ...ctype, reCAPTCHA });

    if (res?.code !== 200) {
      throw new Error(res?.message);
    }
  }

  async getAttesterCtypes(): Promise<CType[]> {
    const res = await get(`${this.server}/ctype`);

    if (res?.code !== 200) {
      throw new Error(res?.message);
    } else {
      return res.data;
    }
  }
}
