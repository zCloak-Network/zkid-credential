// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

// generate by buildAssets.js

import type { SvgIconProps } from '@mui/material';

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconSuccessSvg from '../assets/icon_success.svg';

function IconSuccess(props: SvgIconProps) {
  return <SvgIcon component={IconSuccessSvg} fontSize='inherit' viewBox='0 0 69.918 71.005' {...props} />;
}

export default React.memo(IconSuccess);
