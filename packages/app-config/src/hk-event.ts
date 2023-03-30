// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { isRelease } from './isRelease';

export const LOGGED_PREFIX = 'logged_hk_event:';
export const CTYPE_ID = isRelease
  ? '0x449fc52725462c610c9c1652fe208c205b654e9a5133d3bbfe99d010de99fe4f'
  : '0x449fc52725462c610c9c1652fe208c205b654e9a5133d3bbfe99d010de99fe4f';
