// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

// generate by buildAssets.js

import type { SvgIconProps } from '@mui/material';

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconClaimerSvg from '../assets/icon_claimer.svg';

function IconClaimer(props: SvgIconProps) {
  return (
    <SvgIcon component={IconClaimerSvg} fontSize="inherit" viewBox="0 0 15.192 11.655" {...props} />
  );
}

export default React.memo(IconClaimer);
