// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { isRelease } from './isRelease';

export const LOGGED_PREFIX = 'logged_hk_event:';
export const CTYPE_ID = isRelease
  ? '0x5d8ec528de14ceafef6991244d4350af8b3a638dc18654a73d3c255e5c2b3e9e'
  : '0x92df1b439f0280b3099531c9b26a2bf9bca02ec8bbb341eafe317a046d3cbda4';
