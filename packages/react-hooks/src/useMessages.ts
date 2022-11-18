// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DidUrl } from '@zcloak/did-resolver/types';
import type { MessageType } from '@zcloak/message/types';

import { useEffect, useState } from 'react';

import { resolver } from '@credential/react-dids/instance';

import { MessageWithMeta } from './types';

export function useMessages<T extends MessageType>(
  type: 'all' | 'sent' | 'received',
  didUrl?: DidUrl | null
): MessageWithMeta<T>[] {
  const [messages, setMessages] = useState<MessageWithMeta<T>[]>([]);

  useEffect(() => {
    if (didUrl) {
      const query =
        type === 'all' ? {} : type === 'sent' ? { sender: didUrl } : { receiver: didUrl };

      resolver.getMessages<T>(query).then((data) => {
        setMessages(
          data.map((d) => ({
            ...d.rawData,

            meta: {
              isRead: d.isRead,
              isPush: d.isPush
            }
          }))
        );
      });
    }
  }, [didUrl, type]);

  return messages;
}
