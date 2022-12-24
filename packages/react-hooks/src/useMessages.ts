// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ExtendsMessageType, Message, MessageType } from '@zcloak/message/types';

import { useContext, useMemo } from 'react';

import { AppContext } from '@credential/react-components';

function getMessages(messages: Message<MessageType>[]): Message<MessageType>[] {
  const map = new Map<string, Message<Exclude<MessageType, ExtendsMessageType>>>();

  messages.forEach((message) => {
    if (!message.msgType.startsWith('Extends_')) {
      map.set(message.id, message as Message<Exclude<MessageType, ExtendsMessageType>>);
    }
  });

  return Array.from(map.values()).sort((l, r) => r.createTime - l.createTime);
}

export function useMessages(type: 'all' | 'sent' | 'received'): Message<MessageType>[] {
  const { messages, sentMessages } = useContext(AppContext);

  return useMemo(() => {
    return type === 'all'
      ? getMessages([...messages, ...sentMessages])
      : type === 'sent'
      ? getMessages(sentMessages)
      : getMessages(messages);
  }, [messages, sentMessages, type]);
}
