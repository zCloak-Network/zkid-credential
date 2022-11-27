// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { MessageType } from '@zcloak/message/types';
import type { DecryptedMessageWithMeta, MessageWithMeta } from './types';

import { useContext, useEffect, useState } from 'react';

import { isSameUri } from '@zcloak/did/utils';
import { decryptMessage } from '@zcloak/message';

import { DidsContext } from '@credential/react-dids';
import { resolver } from '@credential/react-dids/instance';

export function useDecryptedMessage<T extends MessageType>(
  message?: MessageWithMeta<T> | null
): DecryptedMessageWithMeta<T> | null {
  const { did, isLocked } = useContext(DidsContext);
  const [decrypted, setDecrypted] = useState<DecryptedMessageWithMeta<T> | null>(null);

  useEffect(() => {
    if (message && !isLocked && isSameUri(message.receiver, did.id)) {
      decryptMessage(message, did, resolver).then((decrypted) =>
        setDecrypted({
          ...decrypted,
          meta: message.meta
        })
      );
    } else {
      setDecrypted(null);
    }
  }, [did, isLocked, message]);

  return decrypted;
}
