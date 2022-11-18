// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { SvgIcon } from '@mui/material';
import React from 'react';

import IconQrcodeSvg from '../assets/icon_qrcode.svg';

function IconQrcode(props: any) {
  return (
    <SvgIcon
      component={IconQrcodeSvg}
      viewBox="0 0 48 48"
      {...props}
      sx={{ width: undefined, height: undefined, ...props?.sx }}
    />
  );
}

export default React.memo(IconQrcode);
