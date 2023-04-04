// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

// generate by buildAssets.js

import type { SvgIconProps } from '@mui/material';

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconExportHkSvg from '../assets/icon_export_hk.svg';

function IconExportHk(props: SvgIconProps) {
  return <SvgIcon component={IconExportHkSvg} fontSize='inherit' viewBox='0 0 15.17 16.2' {...props} />;
}

export default React.memo(IconExportHk);
