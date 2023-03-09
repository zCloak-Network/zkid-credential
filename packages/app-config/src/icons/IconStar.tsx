// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

// generate by buildAssets.js

import type { SvgIconProps } from '@mui/material';

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconStarSvg from '../assets/icon_star.svg';

function IconStar(props: SvgIconProps) {
  return <SvgIcon component={IconStarSvg} fontSize='inherit' viewBox='0 0 14 13.364' {...props} />;
}

export default React.memo(IconStar);
