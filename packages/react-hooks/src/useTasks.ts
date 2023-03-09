// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Message, MessageType } from '@zcloak/message/types';
import type { Task } from './types';

import { useContext, useMemo } from 'react';

import { AppContext } from '@credential/react-components';

function filterMessages(messages: Message<MessageType>[]): Task[] {
  return messages.filter((message) => message.msgType === 'Request_Attestation') as Task[];
}

function findMessagesWithId(messages: Message<MessageType>[], id?: string): Task | undefined {
  return messages.find<Task>(
    (message): message is Task => message.msgType === 'Request_Attestation' && message.id === id
  );
}

export function useTasks(): Task[] {
  const { messages } = useContext(AppContext);
  const tasks = useMemo(() => filterMessages(messages), [messages]);

  return tasks;
}

export function useTask(id?: string): Task | undefined {
  const { messages } = useContext(AppContext);

  return useMemo(() => findMessagesWithId(messages, id), [id, messages]);
}
