// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

// generate by buildAssets.js

import type { SvgIconProps } from '@mui/material';

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconMyctypeSvg from '../assets/icon_myctype.svg';

function IconMyctype(props: SvgIconProps) {
  return <SvgIcon component={IconMyctypeSvg} fontSize='inherit' viewBox='0 0 15.502 15.502' {...props} />;
}

export default React.memo(IconMyctype);
