// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { initCrypto } from '@zcloak/crypto';

import { DidManager } from './DidManager';
import { CredentialDidResolver } from './DidResolver';
import { Keyring } from './Keyring';

export let resolver: CredentialDidResolver;

export let keyring: Keyring;

export let didManager: DidManager;

initCrypto().then(() => {
  resolver = new CredentialDidResolver();
  keyring = new Keyring();
  didManager = new DidManager(keyring, resolver);

  keyring.load();
  didManager.load();
});
