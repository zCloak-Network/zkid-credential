// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

// generate by buildAssets.js

import type { SvgIconProps } from '@mui/material';

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconChaintoolSvg from '../assets/icon_chaintool .svg';

function IconChaintool(props: SvgIconProps) {
  return <SvgIcon component={IconChaintoolSvg} fontSize='inherit' viewBox='0 0 40.81 40.224' {...props} />;
}

export default React.memo(IconChaintool);
