// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

// generate by buildAssets.js

import type { SvgIconProps } from '@mui/material';

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconEthSvg from '../assets/icon_eth.svg';

function IconEth(props: SvgIconProps) {
  return <SvgIcon component={IconEthSvg} fontSize='inherit' viewBox='0 0 16 16' {...props} />;
}

export default React.memo(IconEth);
