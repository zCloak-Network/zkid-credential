// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DecryptedMessage, Message, MessageType } from '@zcloak/message/types';

import type { ServerMessage } from '@credential/react-dids/types';
import type { MessageWithMeta } from '@credential/react-hooks/types';

import { assert } from '@polkadot/util';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { isSameUri } from '@zcloak/did/utils';
import { DidUrl } from '@zcloak/did-resolver/types';
import { decryptMessage, verifyMessageEnvelope } from '@zcloak/message';

import { MESSAGE_WS } from '@credential/app-config/endpoints';
import { addVC } from '@credential/app-store';
import { updatePendingCredential } from '@credential/app-store/pending-credential';
import { DidsContext } from '@credential/react-dids';
import { resolver } from '@credential/react-dids/instance';

import { SyncProvider } from './SyncProvider';

interface State {
  messages: MessageWithMeta<MessageType>[];
  sentMessages: MessageWithMeta<MessageType>[];
  readMessage: (id: string) => Promise<void>;
  sendMessage: <T extends MessageType>(message?: Message<T>, reCaptchaToken?: string | null) => Promise<void>;
  decrypt: <T extends MessageType>(message: Message<T>) => Promise<DecryptedMessage<T>>;
}

export const AppContext = createContext({} as State);

function sortMessages<T extends MessageType>(messages: ServerMessage<T>[]): ServerMessage<T>[] {
  return messages.sort((l, r) => r.rawData.createTime - l.rawData.createTime);
}

function transformMessage(
  data: ServerMessage<MessageType>[],
  didUrl: DidUrl
): [MessageWithMeta<MessageType>[], MessageWithMeta<MessageType>[]] {
  const _messages: MessageWithMeta<MessageType>[] = [];
  const _sentMessages: MessageWithMeta<MessageType>[] = [];

  data.forEach((message) => {
    if (isSameUri(message.rawData.receiver, didUrl)) {
      _messages.push({
        ...message.rawData,
        meta: {
          isRead: message.isRead,
          isPush: message.isPush,
          taskStatus:
            message.replyStatus === 'approved' ? 'approved' : message.replyStatus === 'reject' ? 'rejected' : 'pending'
        }
      });
    }

    if (isSameUri(message.rawData.sender, didUrl)) {
      _sentMessages.push({
        ...message.rawData,
        meta: {
          isRead: message.isRead,
          isPush: message.isPush,
          taskStatus:
            message.replyStatus === 'approved' ? 'approved' : message.replyStatus === 'reject' ? 'rejected' : 'pending'
        }
      });
    }
  });

  return [_messages, _sentMessages];
}

function duplicateServerMessages(messages: ServerMessage<MessageType>[]): ServerMessage<MessageType>[] {
  const messagesMap: Map<string, ServerMessage<MessageType>> = new Map();

  messages.forEach((message) => messagesMap.set(message.rawData.id, message));

  return sortMessages(Array.from(messagesMap.values()));
}

export const decryptedCache: Map<string, DecryptedMessage<MessageType>> = new Map();
export const decryptedCachePromise: Map<string, Promise<DecryptedMessage<MessageType>>> = new Map();

// eslint-disable-next-line @typescript-eslint/ban-types
function AppProvider({ children }: { children: React.ReactNode }) {
  const { did } = useContext(DidsContext);
  const [serverMessages, setServerMessages] = useState<ServerMessage<MessageType>[]>([]);

  const didUrl = useMemo(() => {
    try {
      return did.getKeyUrl('keyAgreement');
    } catch {}

    return null;
  }, [did]);

  const [messages, sentMessages] = useMemo(() => transformMessage(serverMessages, did.id), [did.id, serverMessages]);

  const decrypt = useCallback(
    async <T extends MessageType>(message: Message<T>): Promise<DecryptedMessage<T>> => {
      const cache = decryptedCache.get(message.id);

      if (cache) return cache as DecryptedMessage<T>;

      const cachePromise = decryptedCachePromise.get(message.id);

      if (cachePromise) return cachePromise as Promise<DecryptedMessage<T>>;

      const promise: Promise<DecryptedMessage<T>> = decryptMessage(message, did, resolver)
        .then((decrypted) => {
          if (decrypted.msgType === 'Response_Approve_Attestation') {
            addVC(decrypted.data);
          } else if (decrypted.msgType === 'Send_issuedVC') {
            addVC(decrypted.data);
          }

          // set cache when success
          decryptedCache.set(message.id, decrypted);
          // delete cache promise when success
          decryptedCachePromise.delete(message.id);

          return decrypted;
        })
        .catch((error) => {
          decryptedCachePromise.delete(message.id);
          throw error;
        });

      decryptedCachePromise.set(message.id, promise);

      return promise;
    },
    [did]
  );

  useEffect(() => {
    if (!didUrl) {
      return;
    }

    const syncProvider = new SyncProvider(MESSAGE_WS);

    resolver
      .getMessages({ receiver: didUrl })
      .then((data) => {
        setServerMessages((serverMessages) => duplicateServerMessages(data.concat(serverMessages)));

        return data;
      })
      .then((messages) => {
        syncProvider.isReady.then((provider) => {
          provider.subscribe(didUrl, messages?.[0]?.rawData.createTime || 0, (messages) => {
            setServerMessages((serverMessages) => duplicateServerMessages(messages.concat(serverMessages)));
          });
        });
      });
    resolver.getMessages({ sender: didUrl }).then((data) => {
      setServerMessages((serverMessages) => duplicateServerMessages(data.concat(serverMessages)));
    });

    return () => {
      syncProvider.close();
    };
  }, [didUrl]);

  useEffect(() => {
    serverMessages.forEach((message) => {
      if (message.rawData.msgType === 'Response_Approve_Attestation') {
        if (message.rawData.reply) updatePendingCredential(message.rawData.reply, 'approved');
      } else if (message.rawData.msgType === 'Response_Reject_Attestation') {
        if (message.rawData.reply) updatePendingCredential(message.rawData.reply, 'rejected');
      }
    });
  }, [serverMessages]);

  const readMessage = useCallback(async (id: string) => {
    setServerMessages((serverMessages) =>
      serverMessages.map((message) =>
        id === message.id
          ? {
              ...message,
              isRead: true
            }
          : message
      )
    );

    await resolver.readMessage(id);
  }, []);

  const sendMessage = useCallback(
    async <T extends MessageType>(message?: Message<T> | null, reCaptchaToken?: string | null) => {
      assert(message, 'Not encrypted message found');

      verifyMessageEnvelope(message);

      const serverMessage = await resolver.postMessage(message, reCaptchaToken ?? undefined);

      setServerMessages((serverMessages) => {
        let messages = [serverMessage].concat(serverMessages);

        if (serverMessage.rawData.reply) {
          messages = messages.map((message) =>
            message.id === serverMessage.rawData.reply
              ? {
                  ...message,
                  replyStatus: ['Response_Approve_Attestation', 'Response_Accept_VP'].includes(
                    serverMessage.rawData.msgType
                  )
                    ? 'approved'
                    : ['Response_Reject_Attestation', 'Response_Reject_VP'].includes(serverMessage.rawData.msgType)
                    ? 'reject'
                    : message.replyStatus
                }
              : message
          );
        }

        return duplicateServerMessages(messages);
      });
    },
    []
  );

  const value = useMemo(
    () => ({ messages, sentMessages, readMessage, sendMessage, decrypt }),
    [decrypt, messages, readMessage, sentMessages, sendMessage]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppProvider;
