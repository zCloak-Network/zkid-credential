// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { SvgIcon } from '@mui/material';
import React from 'react';

import IconDownloadSvg from '../assets/icon_download.svg';

function IconDownload(props: any) {
  return (
    <SvgIcon
      component={IconDownloadSvg}
      viewBox="0 0 13.327 14.135"
      {...props}
      sx={{ width: 13.327, height: 14.135, ...props?.sx }}
    />
  );
}

export default React.memo(IconDownload);
