// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DidUrl } from '@zcloak/did-resolver/types';
import type { BaseMessage, Message, MessageType } from '@zcloak/message/types';

import { useEffect, useState } from 'react';

import { resolver } from '@credential/react-dids/instance';

export function useMessages<T extends MessageType>(
  type: 'all' | 'sent' | 'received',
  didUrl?: DidUrl | null
): BaseMessage<T>[] {
  const [messages, setMessages] = useState<Message<T>[]>([]);

  useEffect(() => {
    if (didUrl) {
      const query =
        type === 'all' ? {} : type === 'sent' ? { sender: didUrl } : { receiver: didUrl };

      resolver.getMessages<T>(query).then((data) => {
        setMessages(data.map((d) => d.rawData));
      });
    }
  }, [didUrl, type]);

  return messages;
}
