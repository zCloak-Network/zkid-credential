// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { MessageType } from '@zcloak/message/types';

import type { ServerMessage } from '@credential/react-dids/types';
import type { MessageWithMeta } from '@credential/react-hooks/types';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { DidsContext } from '@credential/react-dids';
import { resolver } from '@credential/react-dids/instance';

import { SyncProvider } from './SyncProvider';

interface State {
  messages: MessageWithMeta<MessageType>[];
  sentMessages: MessageWithMeta<MessageType>[];
}

export const AppContext = createContext({} as State);

function sortMessages<T extends MessageType>(messages: MessageWithMeta<T>[]): MessageWithMeta<T>[] {
  return messages.sort((l, r) => l.createTime - r.createTime);
}

function transformMessage<T extends MessageType>(data: ServerMessage<T>[]): MessageWithMeta<T>[] {
  return sortMessages(
    data.map((d) => ({
      ...d.rawData,
      meta: {
        isRead: d.isRead,
        isPush: d.isPush,
        // TODO
        taskStatus: 'pending'
      }
    }))
  );
}

// eslint-disable-next-line @typescript-eslint/ban-types
const AppProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const { did } = useContext(DidsContext);
  const [messages, setMessages] = useState<MessageWithMeta<MessageType>[]>([]);
  const [sentMessages, setSentMessages] = useState<MessageWithMeta<MessageType>[]>([]);

  const didUrl = useMemo(() => {
    try {
      return did?.getKeyUrl('keyAgreement');
    } catch {}

    return null;
  }, [did]);

  useEffect(() => {
    if (!didUrl) {
      return;
    }

    const syncProvider = new SyncProvider('wss://wss.did-service.starks.network');

    resolver
      .getMessages({ receiver: didUrl })
      .then(transformMessage)
      .then((messages) => {
        setMessages(messages);

        syncProvider.isReady.then((provider) => {
          provider.subscribe(didUrl, messages[0]?.createTime || 0, (messages) => {
            setMessages((m) => [...transformMessage(messages), ...m]);
          });
        });
      });
    resolver.getMessages({ sender: didUrl }).then(transformMessage).then(setSentMessages);

    return () => {
      syncProvider.close();
    };
  }, [didUrl]);

  const value = useMemo(() => ({ messages, sentMessages }), [messages, sentMessages]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
