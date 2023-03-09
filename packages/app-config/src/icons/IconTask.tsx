// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

// generate by buildAssets.js

import type { SvgIconProps } from '@mui/material';

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconTaskSvg from '../assets/icon_task.svg';

function IconTask(props: SvgIconProps) {
  return <SvgIcon component={IconTaskSvg} fontSize='inherit' viewBox='0 0 16 12.799' {...props} />;
}

export default React.memo(IconTask);
