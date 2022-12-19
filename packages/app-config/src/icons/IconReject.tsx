// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

// generate by buildAssets.js

import type { SvgIconProps } from '@mui/material';

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconRejectSvg from '../assets/icon_reject.svg';

function IconReject(props: SvgIconProps) {
  return <SvgIcon component={IconRejectSvg} fontSize="inherit" viewBox="0 0 12 12" {...props} />;
}

export default React.memo(IconReject);
