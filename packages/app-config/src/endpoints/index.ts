// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

const isRelease = location.hostname.includes('zkid.app');

export const MESSAGE_WS = isRelease
  ? 'wss.did-service.zkid.app'
  : 'wss://wss.did-service.starks.network';

export const DID_SERVICE = isRelease
  ? 'https://did-service.zkid.app'
  : 'https://did-service.starks.network';
