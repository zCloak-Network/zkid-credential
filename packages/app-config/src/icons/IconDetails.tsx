// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

// generate by buildAssets.js

import type { SvgIconProps } from '@mui/material';

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconDetailsSvg from '../assets/icon_details.svg';

function IconDetails(props: SvgIconProps) {
  return <SvgIcon component={IconDetailsSvg} fontSize="inherit" viewBox="0 0 12 12" {...props} />;
}

export default React.memo(IconDetails);
