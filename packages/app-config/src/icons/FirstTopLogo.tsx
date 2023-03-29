// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

// generate by buildAssets.js

import type { SvgIconProps } from '@mui/material';

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import FirstTopLogoSvg from '../assets/first_top_logo.svg';

function FirstTopLogo(props: SvgIconProps) {
  return <SvgIcon component={FirstTopLogoSvg} fontSize='inherit' viewBox='0 0 44.263 47.762' {...props} />;
}

export default React.memo(FirstTopLogo);
