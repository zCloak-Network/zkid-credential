// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Keyring } from '@zcloak/keyring';
import { ZkidWalletProvider } from '@zcloak/login-providers';

import { DID_SERVICE } from '@credential/app-config/endpoints';

import { DidManager } from './DidManager';
import { CredentialDidResolver } from './DidResolver';

export let resolver: CredentialDidResolver;

export let keyring: Keyring;

export let didManager: DidManager;

export let provider: ZkidWalletProvider | undefined;

export async function initInstance(): Promise<void> {
  keyring = new Keyring();
  resolver = new CredentialDidResolver(DID_SERVICE);
  didManager = new DidManager(keyring, resolver);

  didManager.loadAll();

  await ZkidWalletProvider.isReady();

  if (await ZkidWalletProvider.isInstalled()) {
    provider = new ZkidWalletProvider();

    await didManager.loadLoginDid(provider);
  }

  didManager.loadCurrent();
}
