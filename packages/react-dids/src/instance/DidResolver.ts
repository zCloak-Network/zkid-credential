// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@zcloak/crypto/types';
import type { CType } from '@zcloak/ctype/types';
import type { DidDocument, DidDocumentWithProof, DidUrl } from '@zcloak/did-resolver/types';
import type { Message, MessageType } from '@zcloak/message/types';
import type { ServerCtypes, ServerMessage } from '../types';

import { ArweaveDidResolver } from '@zcloak/did-resolver';

import { get, post } from '../utils/request';

export class CredentialDidResolver extends ArweaveDidResolver {
  #cache: Record<string, Promise<DidDocument>> = {};

  constructor(server?: string) {
    super({ server });
  }

  public override resolve(didUrl: string): Promise<DidDocument> {
    if (!this.#cache[didUrl]) {
      this.#cache[didUrl] = super.resolve(didUrl);
    }

    return this.#cache[didUrl];
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

  async getAttesterCtypes(): Promise<ServerCtypes[]> {
    const res = await get(`${this.server}/ctype`);

    if (res?.code !== 200) {
      throw new Error(res?.message);
    } else {
      return res.data;
    }
  }

  async submitClaimerImportCtype(claimerDidUrl: DidUrl, ctypeHash: HexString): Promise<CType> {
    const res = await post(`${this.server}/claimer/${claimerDidUrl}/ctype/${ctypeHash}/import`);

    if (res?.code !== 200) {
      throw new Error(res?.message);
    } else {
      return res.data.rawData;
    }
  }

  async deleteClaimerImportCtype(claimerDidUrl: DidUrl, ctypeHash: HexString) {
    const res = await post(`${this.server}/claimer/${claimerDidUrl}/ctype/${ctypeHash}/unimport`);

    if (res?.code !== 200) {
      throw new Error(res?.message);
    }
  }

  async getClaimerCtypes(claimerDidUrl: DidUrl): Promise<CType[]> {
    const res = await get(`${this.server}/claimer/${claimerDidUrl}/ctype`);

    if (res?.code !== 200) {
      throw new Error(res?.message);
    } else {
      return res.data.rawData;
    }
  }

  async getMessages<T extends MessageType>(
    query: {
      receiver?: DidUrl;
      sender?: DidUrl;
      reply?: string;
      id?: string;
      msgType?: T;
    } = {}
  ): Promise<ServerMessage<T>[]> {
    const res = await get(`${this.server}/message`, query);

    if (res?.code !== 200) {
      throw new Error(res?.message);
    } else {
      return res.data;
    }
  }

  async postMessage(message: Message<MessageType>, reCaptchaToken?: string): Promise<void> {
    const res = await post(`${this.server}/message`, { ...message, token: reCaptchaToken });

    if (res?.code !== 200) {
      throw new Error(res?.message);
    } else {
      return res.data;
    }
  }

  async readMessage(id: string): Promise<void> {
    const res = await post(`${this.server}/message/${id}/read`);

    if (res?.code !== 200) {
      throw new Error(res?.message);
    } else {
      return res.data;
    }
  }
}
