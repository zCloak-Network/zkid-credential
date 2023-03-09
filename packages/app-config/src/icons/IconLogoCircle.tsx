// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

// generate by buildAssets.js

import type { SvgIconProps } from '@mui/material';

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconLogoCircleSvg from '../assets/icon_logo_circle.svg';

function IconLogoCircle(props: SvgIconProps) {
  return <SvgIcon component={IconLogoCircleSvg} fontSize='inherit' viewBox='0 0 60 60' {...props} />;
}

export default React.memo(IconLogoCircle);
