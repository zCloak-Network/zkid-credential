// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { mnemonicGenerate, secp256k1Verify } from '@zcloak/crypto';
import { Keyring } from '@zcloak/keyring';

describe('sign and verify', (): void => {
  it.skip('sign and verify', () => {
    // generate account
    const keyring = new Keyring();
    const mnemonic = mnemonicGenerate();
    const { publicKey } = keyring.addFromMnemonic(mnemonic);

    // sign message
    const message = '0x1234';
    const signature = keyring.getPair(publicKey).sign(message);

    // verify signature
    const result = secp256k1Verify(message, signature, publicKey);

    expect(result).toBe(true);
  });
});
