// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DecryptedMessage, MessageType } from '@zcloak/message/types';

import { useMemo } from 'react';

export type UseNotification = {
  all: DecryptedMessage<MessageType>[];
  task: DecryptedMessage<'Request_Attestation'>[];
  message: DecryptedMessage<Exclude<MessageType, 'Request_Attestation'>>[];
  allUnread: number;
  taskUnread: number;
  messageUnread: number;
};

export function useNotification(): UseNotification {
  return useMemo(
    () =>
      ({
        all: [],
        task: [],
        message: [],
        allUnread: [],
        taskUnread: [],
        messageUnread: []
      } as any),
    []
  );
}
