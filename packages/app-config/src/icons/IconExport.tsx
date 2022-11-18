// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { SvgIcon } from '@mui/material';
import React from 'react';

import IconExportSvg from '../assets/icon_export.svg';

function IconExport(props: any) {
  return (
    <SvgIcon
      component={IconExportSvg}
      viewBox="0 0 14 15.133"
      {...props}
      sx={{ width: 14, height: 15.133, ...props?.sx }}
    />
  );
}

export default React.memo(IconExport);
