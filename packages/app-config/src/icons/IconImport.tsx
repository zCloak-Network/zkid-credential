// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { SvgIcon } from '@mui/material';
import React from 'react';

import IconImportSvg from '../assets/icon_import.svg';

function IconImport(props: any) {
  return (
    <SvgIcon
      component={IconImportSvg}
      viewBox="0 0 12.907 12.907"
      {...props}
      sx={{ width: 12.907, height: 12.907, ...props?.sx }}
    />
  );
}

export default React.memo(IconImport);
