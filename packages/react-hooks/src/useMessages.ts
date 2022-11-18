// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { MessageType } from '@zcloak/message/types';

import { useContext, useMemo } from 'react';

import { AppContext } from '@credential/react-components';

import { MessageWithMeta } from './types';

export function useMessages(type: 'all' | 'sent' | 'received'): MessageWithMeta<MessageType>[] {
  const { messages, sentMessages } = useContext(AppContext);

  return useMemo(() => {
    return type === 'all'
      ? [...messages, ...sentMessages].sort((l, r) => l.createTime - r.createTime)
      : type === 'sent'
      ? [...sentMessages]
      : [...messages];
  }, [messages, sentMessages, type]);
}
