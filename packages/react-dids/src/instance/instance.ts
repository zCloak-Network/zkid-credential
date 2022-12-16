// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Keyring } from '@zcloak/keyring';

import { DID_SERVICE } from '@credential/app-config/endpoints';

import { DidManager } from './DidManager';
import { CredentialDidResolver } from './DidResolver';

export let resolver: CredentialDidResolver;

export let keyring: Keyring;

export let didManager: DidManager;

export function initInstance(): void {
  keyring = new Keyring();
  resolver = new CredentialDidResolver(DID_SERVICE);
  didManager = new DidManager(keyring, resolver);
}
