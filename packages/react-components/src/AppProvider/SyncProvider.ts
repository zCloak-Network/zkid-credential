// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { MessageType } from '@zcloak/message/types';

import type { ServerMessage } from '@credential/react-dids/types';

import { Manager, Socket } from 'socket.io-client';

export class SyncProvider extends Socket {
  #handlers = new Set<(messages: ServerMessage<MessageType>[]) => void>();
  public isReady: Promise<this>;

  #handleMessages = (messages: ServerMessage<MessageType>[]) => {
    this.#handlers.forEach((cb) => {
      cb(messages);
    });
  };

  constructor(url: string, nsp = '/ws') {
    const manager = new Manager(url, {
      transports: ['websocket'],
      autoConnect: true
    });

    super(manager, nsp);
    this.on('message:list', this.#handleMessages);
    this.isReady = new Promise((resolve) => {
      this.once('connect', () => {
        resolve(this);
      });
    });
  }

  public subscribe(
    address: string,
    startTimestamp: number,
    callback: (messages: ServerMessage<MessageType>[]) => void
  ) {
    this.#handlers.add(callback);
    this.emit('message:subscribe', {
      address,
      startTimestamp
    });
  }
}
