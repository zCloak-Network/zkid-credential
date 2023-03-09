// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

// generate by buildAssets.js

import type { SvgIconProps } from '@mui/material';

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconQrcodeSvg from '../assets/icon_qrcode.svg';

function IconQrcode(props: SvgIconProps) {
  return <SvgIcon component={IconQrcodeSvg} fontSize='inherit' viewBox='0 0 48 48' {...props} />;
}

export default React.memo(IconQrcode);
