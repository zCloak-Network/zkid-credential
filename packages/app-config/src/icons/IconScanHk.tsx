// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

// generate by buildAssets.js

import type { SvgIconProps } from '@mui/material';

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconScanHkSvg from '../assets/icon_scan_hk.svg';

function IconScanHk(props: SvgIconProps) {
  return <SvgIcon component={IconScanHkSvg} fontSize='inherit' viewBox='0 0 16 16' {...props} />;
}

export default React.memo(IconScanHk);
