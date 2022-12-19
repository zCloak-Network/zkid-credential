// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DB } from '@credential/app-store/db';

import { liveQuery, Subscription } from 'dexie';
import { useContext, useEffect, useRef, useState } from 'react';

import { DidsContext } from '@credential/react-dids';

interface LiveQueryFn<T> {
  (nameOrDB: string | DB, ...args: never[]): Promise<T>;
}

type PopFirst<T extends unknown[]> = T extends [string | DB, ...infer N] ? N : [];

type Awaited<T> = T extends Promise<infer U> ? U : T;

type Tracker<F> = {
  fn: F | null;
  serialized: string | null;
  subscriber: Subscription | null;
  id: string | null;
};

type TrackerRef<F> = {
  current: Tracker<F>;
};

function subscribe<T extends Awaited<ReturnType<F>>, F extends LiveQueryFn<T>>(
  tracker: TrackerRef<F>,
  name: string,
  setValue: (value: Awaited<ReturnType<F>>) => void,
  params?: PopFirst<Parameters<F>>
) {
  unsubscribe(tracker);

  tracker.current.subscriber = liveQuery(() => {
    if (tracker.current.fn) {
      tracker.current.fn(name, ...(params ?? [])).then(setValue);
    }
  }).subscribe();
}

function unsubscribe<T extends Awaited<ReturnType<F>>, F extends LiveQueryFn<T>>(
  tracker: TrackerRef<F>
) {
  if (tracker.current.subscriber) {
    tracker.current.subscriber.unsubscribe();
    tracker.current.subscriber = null;
  }
}

export function useLiveQuery<T extends Awaited<ReturnType<F>>, F extends LiveQueryFn<T>>(
  fn: F,
  params?: PopFirst<Parameters<F>>
): Awaited<ReturnType<F>> | undefined {
  const { did } = useContext(DidsContext);
  const trackerRef = useRef<Tracker<F>>({ fn: null, serialized: null, subscriber: null, id: null });
  const [value, setValue] = useState<Awaited<ReturnType<F>>>();

  useEffect(() => {
    return () => unsubscribe(trackerRef);
  }, []);

  useEffect(() => {
    const serialized = JSON.stringify(params);

    if (
      trackerRef.current.serialized !== serialized ||
      trackerRef.current.fn !== fn ||
      trackerRef.current.id !== did.id
    ) {
      trackerRef.current.fn = fn;
      trackerRef.current.serialized = serialized;
      trackerRef.current.id = did.id;

      subscribe(trackerRef, did.id, setValue, params);
    }
  }, [did.id, fn, params]);

  return value;
}
