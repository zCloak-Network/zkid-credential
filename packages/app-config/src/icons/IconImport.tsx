// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

// generate by buildAssets.js

import type { SvgIconProps } from '@mui/material';

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconImportSvg from '../assets/icon_import.svg';

function IconImport(props: SvgIconProps) {
  return <SvgIcon component={IconImportSvg} fontSize="inherit" viewBox="0 0 12.907 12.907" {...props} />;
}

export default React.memo(IconImport);
