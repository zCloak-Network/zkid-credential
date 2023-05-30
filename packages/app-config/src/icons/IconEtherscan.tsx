// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

// generate by buildAssets.js

import type { SvgIconProps } from '@mui/material';

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconEtherscanSvg from '../assets/icon_etherscan.svg';

function IconEtherscan(props: SvgIconProps) {
  return <SvgIcon component={IconEtherscanSvg} fontSize='inherit' viewBox='0 0 24 24' {...props} />;
}

export default React.memo(IconEtherscan);
