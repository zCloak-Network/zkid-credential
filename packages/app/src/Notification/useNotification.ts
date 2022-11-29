// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { MessageType } from '@zcloak/message/types';

import type { MessageWithMeta } from '@credential/react-hooks/types';

import { useContext, useMemo } from 'react';

import { AppContext } from '@credential/react-components';

type All = MessageWithMeta<MessageType>;
type Task = MessageWithMeta<'Request_Attestation'>;
type Message = MessageWithMeta<Exclude<MessageType, 'Request_Attestation'>>;

export type UseNotification = {
  all: All[];
  task: Task[];
  message: Message[];
  allUnread: number;
  taskUnread: number;
  messageUnread: number;
};

function getNotification(messages: All[]): UseNotification {
  const _all: All[] = [];
  const _task: Task[] = [];
  const _message: Message[] = [];
  let allUnread = 0;
  let taskUnread = 0;
  let messageUnread = 0;

  for (const message of messages) {
    _all.push(message);

    if (!message.meta.isRead) {
      allUnread++;

      if (message.msgType === 'Request_Attestation') {
        taskUnread++;
      } else {
        messageUnread++;
      }
    }

    if (message.msgType === 'Request_Attestation') {
      _task.push(message as Task);
    } else {
      _message.push(message as Message);
    }
  }

  return {
    all: _all,
    task: _task,
    message: _message,
    allUnread,
    taskUnread,
    messageUnread
  };
}

export function useNotification(): UseNotification {
  const { messages } = useContext(AppContext);

  return useMemo(() => getNotification(messages), [messages]);
}
