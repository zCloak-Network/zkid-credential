// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

// generate by buildAssets.js

import type { SvgIconProps } from '@mui/material';

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconDownloadSvg from '../assets/icon_download.svg';

function IconDownload(props: SvgIconProps) {
  return <SvgIcon component={IconDownloadSvg} fontSize='inherit' viewBox='0 0 13.327 14.135' {...props} />;
}

export default React.memo(IconDownload);
