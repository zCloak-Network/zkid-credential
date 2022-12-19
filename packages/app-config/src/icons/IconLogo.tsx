// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

// generate by buildAssets.js

import type { SvgIconProps } from '@mui/material';

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconLogoSvg from '../assets/icon_logo.svg';

function IconLogo(props: SvgIconProps) {
  return <SvgIcon component={IconLogoSvg} fontSize="inherit" viewBox="0 0 35.626 37.885" {...props} />;
}

export default React.memo(IconLogo);
