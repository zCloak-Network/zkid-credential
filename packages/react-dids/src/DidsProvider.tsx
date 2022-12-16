// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DidUrl } from '@zcloak/did-resolver/types';

import React, { createContext, useCallback, useEffect, useState } from 'react';

import { Did } from '@zcloak/did';
import { LoginDid } from '@zcloak/login-did';
import { ZkidWalletProvider } from '@zcloak/login-providers';

import { DB, setDB } from '@credential/app-store/db';
import UnlockModal from '@credential/react-dids/UnlockModal';

import { didManager, keyring, resolver } from './instance';
import { DidRole, DidsState } from './types';

function getIsLocked(did: Did) {
  try {
    return Array.from(did.keyRelationship.values())
      .map(({ publicKey }) => keyring.getPair(publicKey).isLocked)
      .includes(true);
  } catch {
    return true;
  }
}

export const DidsContext = createContext({} as DidsState);

const STORAGE_KEY = 'current_did';

async function initDid() {
  didManager.loadAll();

  let provider: ZkidWalletProvider | null = null;

  await ZkidWalletProvider.isReady();

  if (await ZkidWalletProvider.isInstalled()) {
    provider = new ZkidWalletProvider();

    await didManager.loadLoginDid(provider);
  }

  const didStore = localStorage.getItem(STORAGE_KEY);
  let did: Did | null = null;

  if (didStore) {
    did = didManager.getDid(didStore as DidUrl);
  } else if (provider) {
    did = didManager.all()[0] || null;
  }

  let isLocked = true;

  if (did) {
    isLocked = did instanceof LoginDid ? false : getIsLocked(did);
  }

  return { provider, did, isLocked };
}

function DidsProvider({ children }: { didRole: DidRole; children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [all, setAll] = useState<Did[]>(didManager.all());
  const [did, setDid] = useState<Did | null>();
  const [provider, setProvider] = useState<ZkidWalletProvider | null>();
  const [isLocked, setIsLocked] = useState<boolean>(true);

  useEffect(() => {
    initDid()
      .then(({ did, isLocked, provider }) => {
        setIsLocked(isLocked);
        setDid(did);
        setProvider(provider);

        if (did) {
          setDB(new DB(did.id));
        }
      })
      .finally(() => {
        setReady(true);
      });
  }, []);

  useEffect(() => {
    if (did) {
      setDB(new DB(did.id));
    }
  }, [did]);

  useEffect(() => {
    const didChange = () => {
      setAll(didManager.all());
    };

    didManager.on('add', didChange);
    didManager.on('remove', didChange);

    return () => {
      didManager.off('add', didChange);
      didManager.off('remove', didChange);
    };
  }, []);

  const lock = useCallback(() => {
    if (did) {
      Array.from(did.keyRelationship.values()).forEach(({ publicKey }) =>
        keyring.getPair(publicKey).lock()
      );
      setIsLocked(true);
    }
  }, [did]);

  const unUnlock = useCallback(() => {
    setIsLocked(false);
  }, []);

  useEffect(() => {
    if (did && !isLocked) {
      resolver.resolve(did.id).catch(async () => {
        const publishDocument = await did.getPublish();

        return resolver.submitDid(publishDocument);
      });
    }
  }, [did, isLocked]);

  return ready ? (
    did ? (
      <DidsContext.Provider
        value={{
          ready,
          all,
          did,
          provider,
          isLocked,
          lock
        }}
      >
        {isLocked ? <UnlockModal did={did} onUnlock={unUnlock} open /> : children}
      </DidsContext.Provider>
    ) : (
      <></>
    )
  ) : (
    <>loading</>
  );
}

export default React.memo<typeof DidsProvider>(DidsProvider);
