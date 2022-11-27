// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DidResolver } from '@zcloak/did-resolver';
import type { DidDocument, DidUrl } from '@zcloak/did-resolver/types';
import type { KeyringPair } from '@zcloak/keyring/types';
import type { DidKeys$Json } from '../types';
import type { Keyring } from './Keyring';

import { assert } from '@polkadot/util';

import { ethereumEncode } from '@zcloak/crypto';
import { Did, helpers } from '@zcloak/did';
import { KeyRelationship } from '@zcloak/did/types';

import { Events } from './Events';

export class DidManager extends Events {
  #dids: Map<DidUrl, Did> = new Map();
  #keyring: Keyring;
  #resolver: DidResolver;

  constructor(keyring: Keyring, resolver: DidResolver) {
    super();
    this.#keyring = keyring;
    this.#resolver = resolver;
  }

  private getIdentifierPair(didUrl: string): KeyringPair | undefined {
    const { identifier } = this.#resolver.parseDid(didUrl);

    const identifierPair = this.#keyring
      .getPairs()
      .find((pair) => ethereumEncode(pair.publicKey) === identifier);

    return identifierPair;
  }

  public load(): void {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      if (key?.startsWith('did:zk:')) {
        const value = localStorage.getItem(key);

        if (value) {
          try {
            const document: DidDocument = JSON.parse(value);

            this.addDid(helpers.fromDidDocument(document, this.#keyring));
          } catch {}
        }
      }
    }
  }

  public addDid(did: Did): void {
    this.#dids.set(did.id, did);
    localStorage.setItem(did.id, JSON.stringify(did.getDocument()));
    this.emit('add', did);
  }

  public removeDid(did: Did): void {
    this.#dids.delete(did.id);
    localStorage.removeItem(did.id);
    this.emit('remove', did);
  }

  public all(): Did[] {
    return Array.from(this.#dids.values());
  }

  public current(): Did {
    return Array.from(this.#dids.values())[0];
  }

  public getDid(didUrl: DidUrl): Did {
    const parsed = this.#resolver.parseDid(didUrl);

    const did = this.#dids.get(parsed.did);

    if (!did) {
      throw new Error(`NotFound did ${parsed.did}`);
    }

    return did;
  }

  public saveDid(did: Did, password: string): void {
    // save identifier
    const identifierPair = this.getIdentifierPair(did.id);

    if (identifierPair) {
      this.#keyring.savePair(identifierPair.publicKey, password);
    }

    // save key
    Array.from(did.keyRelationship.values()).forEach(({ publicKey }) => {
      this.#keyring.savePair(publicKey, password);
    });
  }

  public create(mnemonic: string, password: string): Did {
    const did = helpers.createEcdsaFromMnemonic(mnemonic, this.#keyring);

    this.saveDid(did, password);
    this.addDid(did);

    return did;
  }

  public restore(json: DidKeys$Json, password: string): Did {
    const keyRelationship = new Map<DidUrl, KeyRelationship>();

    json.keys.forEach((key, index) => {
      const pair = this.#keyring.addFromJson(key);

      pair.unlock(password);

      const id: DidUrl = `${json.didUrl}#key-${index}`;
      const controller: DidUrl[] = [`${json.didUrl}`];
      const publicKey = pair.publicKey;

      keyRelationship.set(id, {
        id,
        controller,
        publicKey
      });
    });
    const pair = this.#keyring.addFromJson(json.identifierKey);

    pair.unlock(password);

    const did = new Did({
      id: json.didUrl,
      controller: new Set([json.didUrl]),
      keyRelationship,
      authentication: new Set(json.authentication),
      assertionMethod: new Set(json.assertionMethod),
      keyAgreement: new Set(json.keyAgreement),
      capabilityInvocation: new Set(json.capabilityInvocation),
      capabilityDelegation: new Set(json.capabilityDelegation),
      service: new Map()
    });

    did.init(this.#keyring);

    this.saveDid(did, password);
    this.addDid(did);

    return did;
  }

  public backup(didUrl: DidUrl, password: string): DidKeys$Json {
    const did = this.getDid(didUrl);
    const identifierPair = this.getIdentifierPair(didUrl);

    assert(identifierPair, 'no identifier pair found');

    return {
      didUrl: did.id,
      version: '1',
      identifierKey: identifierPair.toJson(password),
      keys: Array.from(did.keyRelationship.values()).map(({ publicKey }) => {
        const pair = did.getPair(publicKey);

        return pair.toJson(password);
      }),
      authentication: Array.from(did.authentication ?? []),
      assertionMethod: Array.from(did.assertionMethod ?? []),
      keyAgreement: Array.from(did.keyAgreement ?? []),
      capabilityInvocation: Array.from(did.capabilityInvocation ?? []),
      capabilityDelegation: Array.from(did.capabilityDelegation ?? [])
    };
  }

  public remove(didUrl: DidUrl): void {
    const did = this.getDid(didUrl);

    // remove identifier key
    const identifierPair = this.getIdentifierPair(didUrl);

    if (identifierPair) {
      this.#keyring.removePair(identifierPair.publicKey);
    }

    // remove keys
    Array.from(did.keyRelationship.values()).forEach(({ publicKey }) => {
      this.#keyring.removePair(publicKey);
    });

    this.removeDid(did);
  }
}
