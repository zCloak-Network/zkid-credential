// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

// generate by buildAssets.js

import type { SvgIconProps } from '@mui/material';

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import LineaLogoSvg from '../assets/linea_logo.svg';

function LineaLogo(props: SvgIconProps) {
  return <SvgIcon component={LineaLogoSvg} fontSize='inherit' viewBox='0 0 256 256' {...props} />;
}

export default React.memo(LineaLogo);
