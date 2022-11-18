// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DidUrl } from '@zcloak/did-resolver/types';
import type { Task } from './types';

import { useEffect, useState } from 'react';

import { Did } from '@zcloak/did';
import { decryptMessage } from '@zcloak/message';

import { didManager, resolver } from '@credential/react-dids/instance';
import { ServerMessage } from '@credential/react-dids/types';

async function decryptToTask(
  messages: ServerMessage<'Request_Attestation'>[],
  did: Did
): Promise<Task[]> {
  const decryptedMessages = await Promise.all(
    messages.map((message) => decryptMessage(message.rawData, did, resolver))
  );

  return decryptedMessages.map((message) => ({
    ...message,
    status: 'pending'
  }));
}

export function useTasks(didUrl?: DidUrl): Task[] {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (didUrl) {
      resolver.getMessages({ receiver: didUrl, msgType: 'Request_Attestation' }).then((data) => {
        const did = didManager.getDid(didUrl);

        decryptToTask(data, did).then(setTasks);
      });
    }
  }, [didUrl]);

  return tasks;
}

export function useTask(id?: string, didUrl?: DidUrl): Task | null {
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    if (id && didUrl) {
      resolver.getMessages({ receiver: didUrl, msgType: 'Request_Attestation' }).then((data) => {
        if (data.length > 0) {
          const did = didManager.getDid(didUrl);

          decryptToTask([data[0]], did).then((tasks) => setTask(tasks[0]));
        }
      });
    }
  }, [didUrl, id]);

  return task;
}
