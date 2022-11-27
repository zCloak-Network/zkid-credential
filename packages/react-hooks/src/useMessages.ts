// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { MessageType } from '@zcloak/message/types';

import { useContext, useMemo } from 'react';

import { AppContext } from '@credential/react-components';

import { MessageWithMeta } from './types';

function getMessages(messages: MessageWithMeta<MessageType>[]): MessageWithMeta<MessageType>[] {
  const map = new Map<string, MessageWithMeta<MessageType>>();

  messages.forEach((message) => map.set(message.id, message));

  return Array.from(map.values()).sort((l, r) => l.createTime - r.createTime);
}

export function useMessages(type: 'all' | 'sent' | 'received'): MessageWithMeta<MessageType>[] {
  const { messages, sentMessages } = useContext(AppContext);

  return useMemo(() => {
    return type === 'all'
      ? getMessages([...messages, ...sentMessages])
      : type === 'sent'
      ? getMessages(sentMessages)
      : getMessages(messages);
  }, [messages, sentMessages, type]);
}
