// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

// generate by buildAssets.js

import type { SvgIconProps } from '@mui/material';

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import LogoMetamaskSvg from '../assets/logo_metamask.svg';

function LogoMetamask(props: SvgIconProps) {
  return <SvgIcon component={LogoMetamaskSvg} fontSize='inherit' viewBox='0 0 18.739 17.352' {...props} />;
}

export default React.memo(LogoMetamask);
