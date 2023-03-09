// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

// generate by buildAssets.js

import type { SvgIconProps } from '@mui/material';

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconExportSvg from '../assets/icon_export.svg';

function IconExport(props: SvgIconProps) {
  return <SvgIcon component={IconExportSvg} fontSize='inherit' viewBox='0 0 14 15.133' {...props} />;
}

export default React.memo(IconExport);
