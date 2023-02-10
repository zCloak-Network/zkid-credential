// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

// generate by buildAssets.js

import type { SvgIconProps } from '@mui/material';

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconTipsSvg from '../assets/icon_tips.svg';

function IconTips(props: SvgIconProps) {
  return <SvgIcon component={IconTipsSvg} fontSize="inherit" viewBox="0 0 20 20" {...props} />;
}

export default React.memo(IconTips);
