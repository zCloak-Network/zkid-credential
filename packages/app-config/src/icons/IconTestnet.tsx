// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

// generate by buildAssets.js

import type { SvgIconProps } from '@mui/material';

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconTestnetSvg from '../assets/icon_testnet.svg';

function IconTestnet(props: SvgIconProps) {
  return <SvgIcon component={IconTestnetSvg} fontSize='inherit' viewBox='0 0 20 20' {...props} />;
}

export default React.memo(IconTestnet);
