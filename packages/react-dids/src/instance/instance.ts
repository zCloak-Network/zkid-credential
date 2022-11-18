// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { DidManager } from './DidManager';
import { CredentialDidResolver } from './DidResolver';
import { Keyring } from './Keyring';

export const resolver = new CredentialDidResolver();

export const keyring = new Keyring();
keyring.load();

export const didManager = new DidManager(keyring, resolver);
didManager.load();
