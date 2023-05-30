// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

// generate by buildAssets.js

import type { SvgIconProps } from '@mui/material';

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconGoSvg from '../assets/icon_go.svg';

function IconGo(props: SvgIconProps) {
  return <SvgIcon component={IconGoSvg} fontSize='inherit' viewBox='0 0 24.081 11.607' {...props} />;
}

export default React.memo(IconGo);
