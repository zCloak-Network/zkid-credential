// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

// generate by buildAssets.js

import type { SvgIconProps } from '@mui/material';

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconScanSvg from '../assets/icon_scan.svg';

function IconScan(props: SvgIconProps) {
  return <SvgIcon component={IconScanSvg} fontSize="inherit" viewBox="0 0 14 14" {...props} />;
}

export default React.memo(IconScan);
