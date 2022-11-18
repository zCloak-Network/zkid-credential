// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { SvgIcon } from '@mui/material';
import React from 'react';

import IconLogoBlackSvg from '../assets/icon_logo_black.svg';

function IconLogoBlack(props: any) {
  return (
    <SvgIcon
      component={IconLogoBlackSvg}
      viewBox="0 0 28.384 30.184"
      {...props}
      sx={{ width: 28.384, height: 30.184, ...props?.sx }}
    />
  );
}

export default React.memo(IconLogoBlack);
