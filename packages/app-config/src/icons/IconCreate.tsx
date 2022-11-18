// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { SvgIcon } from '@mui/material';
import React from 'react';

import IconCreateSvg from '../assets/icon_create.svg';

function IconCreate(props: any) {
  return (
    <SvgIcon
      component={IconCreateSvg}
      viewBox="0 0 16 16"
      {...props}
      sx={{ width: 16, height: 16, ...props?.sx }}
    />
  );
}

export default React.memo(IconCreate);
