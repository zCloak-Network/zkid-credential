// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { isRelease } from './isRelease';

export const LOGGED_PREFIX = 'logged_hk_event:';
export const CTYPE_ID = isRelease
  ? '0x341829ca64a7105ff941b4b8a9710e2806053cbfb7c97fc9cfd569ab4b5d55d2'
  : '0x6c62809700813f4ffb59ea97a31f4d34e206a4233bc2bb75bed1d705c4314930';
