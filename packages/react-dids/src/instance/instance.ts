// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { defaultResolver } from '@zcloak/did-resolver/defaults';

import { DidManager } from './DidManager';
import { Keyring } from './Keyring';

export const resolver = defaultResolver;

export const keyring = new Keyring();
keyring.load();

export const didManager = new DidManager(keyring, resolver);
didManager.load();
