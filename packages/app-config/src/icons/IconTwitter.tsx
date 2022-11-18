// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { SvgIcon } from '@mui/material';
import React from 'react';

import IconTwitterSvg from '../assets/icon_twitter.svg';

function IconTwitter(props: any) {
  return (
    <SvgIcon
      component={IconTwitterSvg}
      viewBox="0 0 48 48"
      {...props}
      sx={{ width: 14, height: 14, ...props?.sx }}
    />
  );
}

export default React.memo(IconTwitter);
