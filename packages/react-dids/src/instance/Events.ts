// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import EventEmitter from 'eventemitter3';

export type DidEvents = 'add' | 'remove' | 'unlocked';

export class Events {
  #eventemitter = new EventEmitter();

  protected emit(type: DidEvents, ...args: unknown[]): boolean {
    return this.#eventemitter.emit(type, ...args);
  }

  public on(type: DidEvents, handler: (...args: any[]) => any): this {
    this.#eventemitter.on(type, handler);

    return this;
  }

  public off(type: DidEvents, handler: (...args: any[]) => any): this {
    this.#eventemitter.removeListener(type, handler);

    return this;
  }

  public once(type: DidEvents, handler: (...args: any[]) => any): this {
    this.#eventemitter.once(type, handler);

    return this;
  }
}
