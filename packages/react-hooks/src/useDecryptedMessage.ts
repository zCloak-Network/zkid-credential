// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DecryptedMessage, Message, MessageType } from '@zcloak/message/types';

import { useCallback, useContext, useEffect, useState } from 'react';

import {
  AppContext,
  decryptedCache,
  decryptedCachePromise
} from '@credential/react-components/AppProvider/AppProvider';

export function useDecryptedMessage<T extends MessageType>(
  message?: Message<T> | null
): [DecryptedMessage<T> | null, () => Promise<DecryptedMessage<T>>] {
  const { decrypt } = useContext(AppContext);
  const [decrypted, setDecrypted] = useState<DecryptedMessage<T> | null>(null);

  useEffect(() => {
    if (message) {
      const cache = decryptedCache.get(message.id) as DecryptedMessage<T>;

      if (cache) {
        setDecrypted(cache);
      } else {
        decryptedCachePromise.get(message.id)?.then((decrypted) => setDecrypted(decrypted as DecryptedMessage<T>));
      }
    }
  }, [message]);

  const decryptFn = useCallback(() => {
    if (!message) throw new Error('No message provided');

    return decrypt<T>(message).then((decrypted) => {
      setDecrypted(decrypted);

      return decrypted;
    });
  }, [decrypt, message]);

  return [decrypted, decryptFn];
}
