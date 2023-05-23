// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

// generate by buildAssets.js

import type { SvgIconProps } from '@mui/material';

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconLogoZkidSvg from '../assets/icon_logo_zkid.svg';

function IconLogoZkid(props: SvgIconProps) {
  return <SvgIcon component={IconLogoZkidSvg} fontSize='inherit' viewBox='0 0 34.994 34.994' {...props} />;
}

export default React.memo(IconLogoZkid);
