// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

// generate by buildAssets.js

import type { SvgIconProps } from '@mui/material';

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconLogoBlackSvg from '../assets/icon_logo_black.svg';

function IconLogoBlack(props: SvgIconProps) {
  return (
    <SvgIcon
      component={IconLogoBlackSvg}
      fontSize="inherit"
      viewBox="0 0 28.384 30.184"
      {...props}
    />
  );
}

export default React.memo(IconLogoBlack);
