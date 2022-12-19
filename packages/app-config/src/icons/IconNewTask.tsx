// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

// generate by buildAssets.js

import type { SvgIconProps } from '@mui/material';

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconNewTaskSvg from '../assets/icon_new_task.svg';

function IconNewTask(props: SvgIconProps) {
  return <SvgIcon component={IconNewTaskSvg} fontSize="inherit" viewBox="0 0 16.448 19" {...props} />;
}

export default React.memo(IconNewTask);
