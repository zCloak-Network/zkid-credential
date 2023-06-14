// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@zcloak/crypto/types';
import type { CType } from '@zcloak/ctype/types';
import type { DidDocument, DidDocumentWithProof, DidUrl } from '@zcloak/did-resolver/types';
import type { Message, MessageType } from '@zcloak/message/types';
import type { Proof } from '@zcloak/vc/types';
import type { ServerCtypes, ServerMessage } from '../types';

import { ArweaveDidResolver } from '@zcloak/did-resolver';

import { VALID_SERVICE } from '@credential/app-config/endpoints';
import { putDid, queryDid } from '@credential/app-store/cache-did';

import { get, post } from '../utils/request';

export class CredentialDidResolver extends ArweaveDidResolver {
  #cache: Record<DidUrl, Promise<DidDocument>> = {};

  constructor(server?: string) {
    super({ server });
  }

  public get knownDids(): DidUrl[] {
    const set = new Set<DidUrl>(Object.keys(this.#cache) as DidUrl[]);

    return Array.from(set);
  }

  public override resolve(didUrl: string): Promise<DidDocument> {
    const { did } = this.parseDid(didUrl);

    if (!this.#cache[did]) {
      this.#cache[did] = this.queryDid(did);
      this.#cache[did].finally(() => {
        delete this.#cache[did];
      });
    }

    return this.#cache[did];
  }

  private async queryDid(didUrl: string): Promise<DidDocument> {
    let document = await queryDid(didUrl);

    if (!document) {
      document = await super.resolve(didUrl);
      putDid(document);
    }

    return document;
  }

  async submitDid(did: DidDocumentWithProof) {
    const res = await post(`${this.server}/did`, did);

    if (res?.code !== 200) {
      throw new Error(res?.message);
    }
  }

  public async submitAttesterCtype(ctype: CType, token?: string | null) {
    const res = await post(`${this.server}/ctype`, { ...ctype, token });

    if (res?.code !== 200) {
      throw new Error(res?.message);
    }
  }

  public async getAllCtypes(): Promise<ServerCtypes[]> {
    const res = await get(`${this.server}/ctype`);

    if (res?.code !== 200) {
      throw new Error(res?.message);
    } else {
      return res.data || [];
    }
  }

  public async submitClaimerImportCtype(claimerDidUrl: DidUrl, ctypeHash: HexString): Promise<CType> {
    const res = await post(`${this.server}/claimer/${claimerDidUrl}/ctype/${ctypeHash}/import`);

    if (res?.code !== 200) {
      throw new Error(res?.message);
    } else {
      return res.data.rawData;
    }
  }

  public async deleteClaimerImportCtype(claimerDidUrl: DidUrl, ctypeHash: HexString) {
    const res = await post(`${this.server}/claimer/${claimerDidUrl}/ctype/${ctypeHash}/unimport`);

    if (res?.code !== 200) {
      throw new Error(res?.message);
    }
  }

  public async getClaimerCtypes(claimerDidUrl: DidUrl): Promise<ServerCtypes[]> {
    const res = await get(`${this.server}/claimer/${claimerDidUrl}/ctype`);

    if (res?.code !== 200) {
      throw new Error(res?.message);
    } else {
      return res.data || [];
    }
  }

  public async getMessages<T extends MessageType>(
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

  public async postMessage<T extends MessageType>(
    message: Message<MessageType>,
    reCaptchaToken?: string
  ): Promise<ServerMessage<T>> {
    const res = await post(`${this.server}/message`, { ...message, token: reCaptchaToken });

    if (res?.code !== 200) {
      throw new Error(res?.message);
    } else {
      return res.data;
    }
  }

  public async readMessage(id: string): Promise<void> {
    const res = await post(`${this.server}/message/${id}/read`);

    if (res?.code !== 200) {
      throw new Error(res?.message);
    } else {
      return res.data;
    }
  }

  public async hkEventLogin(did: string): Promise<{ inWhitelist: boolean; orgName?: string }> {
    const res = await get(`${this.server}/wxBlockchainEvent/connect`, { did });

    if (res?.code !== 200) {
      throw new Error(res?.message);
    } else {
      return res.data;
    }
  }

  public async sendHkMessage<T extends MessageType>(message: Message<MessageType>): Promise<ServerMessage<T>> {
    const res = await post(`${this.server}/wxBlockchainEvent/message`, { ...message });

    if (res?.code !== 200) {
      throw new Error(res?.message);
    } else {
      return res.data;
    }
  }

  public async exportHkClaimers(didUrl: DidUrl): Promise<string[]> {
    const res = await post(`${this.server}/wxBlockchainEvent/attester/${didUrl}/exportClaimers`);

    if (res?.code !== 200) {
      throw new Error(res?.message);
    } else {
      return res.data;
    }
  }

  public async zkVerify(
    result: string,
    data: {
      program_hash: string;
      stack_inputs: string;
      user_did: string;
      ctype: string;
      vc_version: string;
      issuance_date: number;
      expiration_date: number;
      attester_did: string;
      attester_proof: Proof;
    },
    verifyingContract: string,
    chainId: number
  ): Promise<{
    desc: string;
    sbt_link: string;
    verifier_signature: string;
  }> {
    const res = await post(`${this.server}/zk/verify`, {
      ...data,
      verifyingContract,
      chainId,
      zkp_result: JSON.parse(result)
    });

    if (res?.code !== 200) {
      throw new Error(res?.message);
    } else {
      return res.data;
    }
  }

  public async getVid(did: string): Promise<string | null> {
    const res = await post(`${VALID_SERVICE}/api/valid_name/resolve`, { did });

    if (res?.code !== 200) {
      throw new Error(res?.message);
    } else {
      return res.data;
    }
  }
}
