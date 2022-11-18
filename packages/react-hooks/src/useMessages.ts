// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { DidUrl } from '@zcloak/did-resolver/types';
import { BaseMessage, MessageType } from '@zcloak/message/types';

export function useMessages<T extends MessageType>(
  type: 'all' | 'sent' | 'received',
  did?: DidUrl | null
): BaseMessage<T>[] {
  // TODO
  return [];
}
