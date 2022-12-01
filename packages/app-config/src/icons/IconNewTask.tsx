// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconNewTaskSvg from '../assets/icon_new_task.svg';

function IconNewTask(props: any) {
  return (
    <SvgIcon
      component={IconNewTaskSvg}
      viewBox="0 0 16.448 19"
      {...props}
      sx={{ width: 16.448, height: 19, ...props?.sx }}
    />
  );
}

export default React.memo(IconNewTask);
