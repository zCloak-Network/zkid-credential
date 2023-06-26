// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

// generate by buildAssets.js

import type { SvgIconProps } from '@mui/material';

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import BlockscoutLogoSvg from '../assets/blockscout_logo.svg';

function BlockscoutLogo(props: SvgIconProps) {
  return <SvgIcon component={BlockscoutLogoSvg} fontSize='inherit' viewBox='0 0 74.9 73' {...props} />;
}

export default React.memo(BlockscoutLogo);
