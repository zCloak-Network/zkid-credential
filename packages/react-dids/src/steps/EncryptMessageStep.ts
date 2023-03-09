// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Message, MessageData, MessageType } from '@zcloak/message/types';

import { assert } from '@polkadot/util';

import { Did } from '@zcloak/did';
import { encryptMessage } from '@zcloak/message';

import { resolver } from '../instance';

export async function encryptMessageStep<T extends MessageType>(
  type: T,
  data?: MessageData[T] | null,
  sender?: Did | null,
  receiver?: Did | null,
  reply?: string
): Promise<Message<T>> {
  assert(data, 'No data provided');
  assert(sender, 'No sender did provided');
  assert(receiver, 'No receiver did provided');

  const encrypted = await encryptMessage<T>(type, data, sender, receiver.getKeyUrl('keyAgreement'), reply, resolver);

  return encrypted;
}
