// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

// generate by buildAssets.js

import type { SvgIconProps } from '@mui/material';

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconSliderSvg from '../assets/icon_slider.svg';

function IconSlider(props: SvgIconProps) {
  return <SvgIcon component={IconSliderSvg} fontSize='inherit' viewBox='0 0 31.301 4' {...props} />;
}

export default React.memo(IconSlider);
