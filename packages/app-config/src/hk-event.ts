// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { isRelease } from './isRelease';

export const LOGGED_PREFIX = 'logged_hk_event:';
export const CTYPE_ID = isRelease
  ? '0x541556a04e6d3deccaa2884ae840596cdfe4de597a8334878181ee76aaee745f'
  : '0x6c62809700813f4ffb59ea97a31f4d34e206a4233bc2bb75bed1d705c4314930';
