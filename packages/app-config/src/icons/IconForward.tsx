// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

// generate by buildAssets.js

import type { SvgIconProps } from '@mui/material';

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconForwardSvg from '../assets/icon_forward.svg';

function IconForward(props: SvgIconProps) {
  return (
    <SvgIcon component={IconForwardSvg} fontSize="inherit" viewBox="0 0 14.085 12.325" {...props} />
  );
}

export default React.memo(IconForward);
