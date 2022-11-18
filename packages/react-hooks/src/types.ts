// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DecryptedMessage } from '@zcloak/message/types';

export type TaskStatus = 'pending' | 'approved' | 'rejected' | 'revoked';

export interface Task extends DecryptedMessage<'Request_Attestation'> {
  status: TaskStatus;
}
