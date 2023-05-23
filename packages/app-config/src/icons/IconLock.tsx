// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

// generate by buildAssets.js

import type { SvgIconProps } from '@mui/material';

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconLockSvg from '../assets/icon_lock.svg';

function IconLock(props: SvgIconProps) {
  return <SvgIcon component={IconLockSvg} fontSize='inherit' viewBox='0 0 47.441 54.219' {...props} />;
}

export default React.memo(IconLock);
