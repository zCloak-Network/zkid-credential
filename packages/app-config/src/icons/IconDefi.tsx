// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

// generate by buildAssets.js

import type { SvgIconProps } from '@mui/material';

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconDefiSvg from '../assets/icon_defi.svg';

function IconDefi(props: SvgIconProps) {
  return <SvgIcon component={IconDefiSvg} fontSize='inherit' viewBox='0 0 40.81 40.224' {...props} />;
}

export default React.memo(IconDefi);
