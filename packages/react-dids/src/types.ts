// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Did } from '@zcloak/did';
import type { DidUrl } from '@zcloak/did-resolver/types';
import type { KeyringPair$Json } from '@zcloak/keyring/types';
import type { Message, MessageType } from '@zcloak/message/types';

import type { CType } from '@credential/app-store';

export type DidRole = 'attester' | 'claimer';

export interface DidsState {
  all: Did[];
  did: Did;
  didRole: DidRole;
  isLocked: boolean;
  lock: () => void;
}

type DidKeys$JsonVersion = '1';

export interface DidKeys$Json {
  didUrl: DidUrl;
  version: DidKeys$JsonVersion;
  identifierKey: KeyringPair$Json;
  keys: KeyringPair$Json[];
  authentication: DidUrl[];
  assertionMethod: DidUrl[];
  keyAgreement: DidUrl[];
  capabilityInvocation: DidUrl[];
  capabilityDelegation: DidUrl[];
}

export interface ServerMessage<T extends MessageType> {
  id: string;
  timestamp: number;
  sender: DidUrl;
  receiver: DidUrl;
  isRead: boolean;
  isPush: boolean;
  replyStatus?: 'approved' | 'reject';
  rawData: Message<T>;
}

export interface ServerCtypes {
  _id: string;
  status: number;
  rawData: CType;
  id: string;
  title: string;
  transactionId: string;
}
