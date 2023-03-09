// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { LoginDid } from '@zcloak/login-did';

export function isLoginDid(value: unknown): value is LoginDid {
  return value instanceof LoginDid;
}
