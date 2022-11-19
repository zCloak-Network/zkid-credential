// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Did } from '@zcloak/did';
import type { MessageType } from '@zcloak/message/types';

import type { ServerMessage } from '@credential/react-dids/types';
import type { MessageWithMeta } from '@credential/react-hooks/types';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { decryptMessage } from '@zcloak/message';

import { addVC } from '@credential/app-store';
import { DB } from '@credential/app-store/db';
import { updatePendingCredential } from '@credential/app-store/pending-credential';
import { useDB } from '@credential/app-store/useDB';
import { DidsContext } from '@credential/react-dids';
import { didManager, resolver } from '@credential/react-dids/instance';

import { SyncProvider } from './SyncProvider';

interface State {
  messages: MessageWithMeta<MessageType>[];
  sentMessages: MessageWithMeta<MessageType>[];
}

export const AppContext = createContext({} as State);

function sortMessages<T extends MessageType>(messages: MessageWithMeta<T>[]): MessageWithMeta<T>[] {
  return messages.sort((l, r) => r.createTime - l.createTime);
}

function transformMessage<T extends MessageType>(data: ServerMessage<T>[]): MessageWithMeta<T>[] {
  return sortMessages(
    data.map((d) => ({
      ...d.rawData,
      meta: {
        isRead: d.isRead,
        isPush: d.isPush,
        taskStatus:
          d.replyStatus === 'approved'
            ? 'approved'
            : d.replyStatus === 'reject'
            ? 'rejected'
            : 'pending'
      }
    }))
  );
}

function saveIssuedVC(db: DB, did: Did, message: MessageWithMeta<'Response_Approve_Attestation'>) {
  return decryptMessage(message, did, resolver).then((decryptedMessage) =>
    addVC(decryptedMessage.data, db)
  );
}

// eslint-disable-next-line @typescript-eslint/ban-types
const AppProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const { did } = useContext(DidsContext);
  const [messages, setMessages] = useState<MessageWithMeta<MessageType>[]>([]);
  const [sentMessages, setSentMessages] = useState<MessageWithMeta<MessageType>[]>([]);
  const [isLocked, setIsLocked] = useState<boolean>(true);
  const db = useDB(did?.id);

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

  useEffect(() => {
    did && setIsLocked(didManager.isLocked(did.id));

    const toggleUnlock = () => {
      did && setIsLocked(didManager.isLocked(did.id));
    };

    didManager.on('unlocked', toggleUnlock);

    return () => {
      didManager.off('unlocked', toggleUnlock);
    };
  }, [did]);

  useEffect(() => {
    if (!db || !did) return;

    messages.forEach((message) => {
      if (message.msgType === 'Response_Approve_Attestation') {
        if (!isLocked) {
          saveIssuedVC(db, did, message as MessageWithMeta<'Response_Approve_Attestation'>);
        }

        if (message.reply) updatePendingCredential(message.reply, 'approved', db);
      } else if (message.msgType === 'Response_Reject_Attestation') {
        if (message.reply) updatePendingCredential(message.reply, 'rejected', db);
      }
    });
  }, [db, did, isLocked, messages]);

  const value = useMemo(() => ({ messages, sentMessages }), [messages, sentMessages]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
