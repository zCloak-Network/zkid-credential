// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DecryptedMessage, Message, MessageType } from '@zcloak/message/types';

export type TaskStatus = 'pending' | 'approved' | 'rejected' | 'revoked';

export type MessageMeta = {
  isRead: boolean;
  isPush: boolean;
  taskStatus: TaskStatus;
};

export interface MessageWithMeta<T extends MessageType> extends Message<T> {
  meta: MessageMeta;
}

export interface DecryptedMessageWithMeta<T extends MessageType> extends DecryptedMessage<T> {
  meta: MessageMeta;
}

export type Task = MessageWithMeta<'Request_Attestation'>;

export type DecryptedTask = DecryptedMessageWithMeta<'Request_Attestation'>;
