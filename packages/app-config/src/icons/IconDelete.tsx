// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

// generate by buildAssets.js

import type { SvgIconProps } from '@mui/material';

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconDeleteSvg from '../assets/icon_delete.svg';

function IconDelete(props: SvgIconProps) {
  return <SvgIcon component={IconDeleteSvg} fontSize='inherit' viewBox='0 0 13.621 14.668' {...props} />;
}

export default React.memo(IconDelete);
