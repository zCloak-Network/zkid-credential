// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { KeyringPair$Json } from '@zcloak/keyring/types';

import { u8aToHex } from '@polkadot/util';

import { HexString } from '@zcloak/crypto/types';
import { Keyring as KeyringInstance } from '@zcloak/keyring';

const PREFIX = 'zkid:pair:';

export class Keyring extends KeyringInstance {
  public load(): void {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      if (key?.startsWith(`${PREFIX}0x`)) {
        const value = localStorage.getItem(key);

        if (value) {
          try {
            const json: KeyringPair$Json = JSON.parse(value);

            this.addFromJson(json);
          } catch {}
        }
      }
    }
  }

  public override removePair(publicKey: Uint8Array | HexString): void {
    const pair = this.getPair(publicKey);

    super.removePair(publicKey);

    localStorage.removeItem(`${PREFIX}${u8aToHex(pair.publicKey)}`);
  }

  public savePair(publicKey: Uint8Array, password: string): void {
    const pair = this.getPair(publicKey);
    const json: KeyringPair$Json = pair.toJson(password);

    localStorage.setItem(`${PREFIX}${u8aToHex(pair.publicKey)}`, JSON.stringify(json));
  }
}
