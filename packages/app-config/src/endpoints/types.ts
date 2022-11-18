// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

export interface Endpoint {
  name: string;
  endpoint: string;
  service: string;
  messageWs: string;
  faucetLink?: string;
}
