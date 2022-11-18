// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { generateMnemonic, initCrypto, secp256k1Verify } from '@zcloak/crypto';
import { Keyring } from '@zcloak/keyring';

describe('sign and verify', (): void => {
  beforeAll(async () => {
    await initCrypto();
  });

  it('sign and verify', () => {
    // generate account
    const keyring = new Keyring();
    const mnemonic = generateMnemonic();
    const { publicKey } = keyring.addFromMnemonic(mnemonic);

    // sign message
    const message = '0x1234';
    const signature = keyring.getPair(publicKey).sign(message);

    // verify signature
    const result = secp256k1Verify(message, signature, publicKey);

    expect(result).toBe(true);
  });
});
