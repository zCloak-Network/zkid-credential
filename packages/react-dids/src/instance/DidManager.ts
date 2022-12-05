// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DidResolver } from '@zcloak/did-resolver';
import type { DidDocument, DidUrl } from '@zcloak/did-resolver/types';
import type { KeyringPair } from '@zcloak/keyring/types';
import type { DidKeys$Json } from '../types';
import type { Keyring } from './Keyring';

import { ethereumEncode } from '@zcloak/crypto';
import { Did, helpers, keys } from '@zcloak/did';

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
    const did = keys.restore(this.#keyring, json, password);

    this.saveDid(did, password);
    this.addDid(did);

    return did;
  }

  public backup(didUrl: DidUrl, password: string): DidKeys$Json {
    const did = this.getDid(didUrl);

    return keys.backup(this.#keyring, did, password);
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
