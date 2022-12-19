// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

// generate by buildAssets.js

import type { SvgIconProps } from '@mui/material';

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconCorwnSvg from '../assets/icon_corwn.svg';

function IconCorwn(props: SvgIconProps) {
  return <SvgIcon component={IconCorwnSvg} fontSize="inherit" viewBox="0 0 14 11.455" {...props} />;
}

export default React.memo(IconCorwn);
