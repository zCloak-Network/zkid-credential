// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DidUrl } from '@zcloak/did-resolver/types';
import type { Task } from './types';

// TODO
export function useTasks(didUrl?: DidUrl): Task[] {
  return didUrl ? [] : [];
}

// TODO
export function useTask(id?: string): Task | null {
  return null;
}
