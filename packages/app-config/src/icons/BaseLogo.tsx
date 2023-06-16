// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

// generate by buildAssets.js

import type { SvgIconProps } from '@mui/material';

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import BaseLogoSvg from '../assets/base-logo.svg';

function BaseLogo(props: SvgIconProps) {
  return <SvgIcon component={BaseLogoSvg} fontSize='inherit' viewBox='0 0 500 500' {...props} />;
}

export default React.memo(BaseLogo);
