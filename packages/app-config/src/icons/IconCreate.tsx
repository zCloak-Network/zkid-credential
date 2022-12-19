// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

// generate by buildAssets.js

import type { SvgIconProps } from '@mui/material';

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconCreateSvg from '../assets/icon_create.svg';

function IconCreate(props: SvgIconProps) {
  return <SvgIcon component={IconCreateSvg} fontSize="inherit" viewBox="0 0 16 16" {...props} />;
}

export default React.memo(IconCreate);
