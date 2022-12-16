// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { MessageType } from '@zcloak/message/types';
import type { DecryptedMessageWithMeta, MessageWithMeta } from './types';

import { useCallback, useContext, useEffect, useState } from 'react';

import {
  AppContext,
  decryptedCache,
  decryptedCachePromise
} from '@credential/react-components/AppProvider/AppProvider';

export function useDecryptedMessage<T extends MessageType>(
  message?: MessageWithMeta<T> | null
): [DecryptedMessageWithMeta<T> | null, () => Promise<DecryptedMessageWithMeta<T>>] {
  const { decrypt } = useContext(AppContext);
  const [decrypted, setDecrypted] = useState<DecryptedMessageWithMeta<T> | null>(null);

  useEffect(() => {
    if (message) {
      const cache = decryptedCache.get(message.id) as DecryptedMessageWithMeta<T>;

      if (cache) {
        setDecrypted(cache);
      } else {
        decryptedCachePromise
          .get(message.id)
          ?.then((decrypted) => setDecrypted(decrypted as DecryptedMessageWithMeta<T>));
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
