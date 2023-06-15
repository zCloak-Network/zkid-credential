// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

// generate by buildAssets.js

import type { SvgIconProps } from '@mui/material';

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconNetworkSvg from '../assets/icon_network.svg';

function IconNetwork(props: SvgIconProps) {
  return <SvgIcon component={IconNetworkSvg} fontSize='inherit' viewBox='0 0 18 18' {...props} />;
}

export default React.memo(IconNetwork);
