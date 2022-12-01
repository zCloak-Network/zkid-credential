// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconTaskSvg from '../assets/icon_task.svg';

function IconTask(props: any) {
  return (
    <SvgIcon
      component={IconTaskSvg}
      viewBox="0 0 16 12.799"
      {...props}
      sx={{ width: 16, height: 12.799, ...props?.sx }}
    />
  );
}

export default React.memo(IconTask);
