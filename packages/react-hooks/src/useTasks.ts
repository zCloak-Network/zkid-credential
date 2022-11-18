// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { MessageType } from '@zcloak/message/types';
import type { MessageWithMeta, Task } from './types';

import { useContext, useMemo } from 'react';

import { AppContext } from '@credential/react-components';

function filterMessages(messages: MessageWithMeta<MessageType>[]): Task[] {
  return messages.filter((message) => message.msgType === 'Request_Attestation') as Task[];
}

function filterMessagesWithId(messages: MessageWithMeta<MessageType>[], id?: string): Task | null {
  return messages.filter(
    (message) => message.msgType === 'Request_Attestation' && message.id === id
  )[0] as Task | null;
}

export function useTasks(): Task[] {
  const { messages } = useContext(AppContext);
  const tasks = useMemo(() => filterMessages(messages), [messages]);

  return tasks;
}

export function useTask(id?: string): Task | null {
  const { messages } = useContext(AppContext);

  return useMemo(() => filterMessagesWithId(messages, id), [id, messages]);
}
