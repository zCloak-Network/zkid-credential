// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { isRelease } from './isRelease';

export const LOGGED_PREFIX = 'logged_hk_event:';
export const CTYPE_ID = isRelease
  ? '0x3257b78e3cf6e21b5a346a2d714d656f3379175e48d7f9abf098b3b0d1ed324b'
  : '0x6c62809700813f4ffb59ea97a31f4d34e206a4233bc2bb75bed1d705c4314930';
