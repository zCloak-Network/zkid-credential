// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

// generate by buildAssets.js

import type { SvgIconProps } from '@mui/material';

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconApproveSvg from '../assets/icon_approve.svg';

function IconApprove(props: SvgIconProps) {
  return <SvgIcon component={IconApproveSvg} fontSize='inherit' viewBox='0 0 12 12' {...props} />;
}

export default React.memo(IconApprove);
