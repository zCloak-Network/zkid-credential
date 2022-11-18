// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Message, MessageType } from '@zcloak/message/types';

import { assert } from '@polkadot/util';

export async function sendMessage<T extends MessageType>(
  encryptedMessage?: Message<T> | null,
  reCaptchaToken?: string | null
): Promise<void> {
  assert(encryptedMessage, 'Not encrypted message found');
  assert(reCaptchaToken, 'No recaptcha token provided');

  // TODO send message to server
  return Promise.resolve();
}
