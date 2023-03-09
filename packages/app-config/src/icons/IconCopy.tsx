// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

// generate by buildAssets.js

import type { SvgIconProps } from '@mui/material';

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconCopySvg from '../assets/icon_copy.svg';

function IconCopy(props: SvgIconProps) {
  return <SvgIcon component={IconCopySvg} fontSize='inherit' viewBox='0 0 14 14.001' {...props} />;
}

export default React.memo(IconCopy);
