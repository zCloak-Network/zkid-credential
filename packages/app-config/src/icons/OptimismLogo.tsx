// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

// generate by buildAssets.js

import type { SvgIconProps } from '@mui/material';

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import OptimismLogoSvg from '../assets/optimism_logo.svg';

function OptimismLogo(props: SvgIconProps) {
  return <SvgIcon component={OptimismLogoSvg} fontSize='inherit' viewBox='0 0 1024 1024' {...props} />;
}

export default React.memo(OptimismLogo);
