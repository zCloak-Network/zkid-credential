// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Keyring } from '@zcloak/keyring';
import { LoginDid } from '@zcloak/login-did';
import { ZkidWalletProvider } from '@zcloak/login-providers';

import { DID_SERVICE } from '@credential/app-config/endpoints';

import { DidManager } from './DidManager';
import { CredentialDidResolver } from './DidResolver';

export let resolver: CredentialDidResolver;

export let keyring: Keyring;

export let didManager: DidManager;

export let provider: ZkidWalletProvider | undefined;

async function initProvider() {
  if (await ZkidWalletProvider.isInstalled()) {
    const _provider = new ZkidWalletProvider();

    provider = _provider;

    _provider.on('did_changed', async () => {
      const isAuth = await _provider.isAuth();

      if (isAuth) {
        didManager.reloadLoginDid(await LoginDid.fromProvider(_provider));
      }
    });

    await didManager.loadLoginDid(_provider);
  }
}

export async function initInstance(): Promise<void> {
  keyring = new Keyring();
  resolver = new CredentialDidResolver(DID_SERVICE);
  didManager = new DidManager(keyring, resolver);

  didManager.loadAll();

  await ZkidWalletProvider.isReady();

  await initProvider();

  didManager.loadCurrent();
}
