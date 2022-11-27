// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { DID_SERVICE } from '@credential/app-config/endpoints';
import { DB, setDB } from '@credential/app-store/db';

import { DidManager } from './DidManager';
import { CredentialDidResolver } from './DidResolver';
import { Keyring } from './Keyring';

export let resolver: CredentialDidResolver;

export let keyring: Keyring;

export let didManager: DidManager;

export function initInstance() {
  keyring = new Keyring();
  resolver = new CredentialDidResolver(DID_SERVICE);
  didManager = new DidManager(keyring, resolver);

  keyring.load();
  didManager.load();

  const updateDB = () => {
    if (didManager.all().length > 0) {
      setDB(new DB(didManager.current().id));
    }
  };

  didManager.on('add', updateDB);
  didManager.on('remove', updateDB);
  updateDB();
}
