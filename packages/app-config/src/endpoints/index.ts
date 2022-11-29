// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { isRelease } from '../isRelease';

export const MESSAGE_WS = isRelease
  ? 'wss://wss.did-service.zkid.app'
  : 'wss://wss.did-service.starks.network';

export const DID_SERVICE = isRelease
  ? 'https://did-service.zkid.app'
  : 'https://did-service.starks.network';
