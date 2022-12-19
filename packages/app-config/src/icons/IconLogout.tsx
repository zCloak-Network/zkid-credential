// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

// generate by buildAssets.js

import type { SvgIconProps } from '@mui/material';

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconLogoutSvg from '../assets/icon_logout.svg';

function IconLogout(props: SvgIconProps) {
  return (
    <SvgIcon component={IconLogoutSvg} fontSize="inherit" viewBox="0 0 12.546 12.546" {...props} />
  );
}

export default React.memo(IconLogout);
