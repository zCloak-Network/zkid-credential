// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

// generate by buildAssets.js

import type { SvgIconProps } from '@mui/material';

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconZkidSvg from '../assets/icon_zkid.svg';

function IconZkid(props: SvgIconProps) {
  return <SvgIcon component={IconZkidSvg} fontSize='inherit' viewBox='0 0 34.994 34.994' {...props} />;
}

export default React.memo(IconZkid);
