// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

// generate by buildAssets.js

import type { SvgIconProps } from '@mui/material';

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconRevokeSvg from '../assets/icon_revoke.svg';

function IconRevoke(props: SvgIconProps) {
  return <SvgIcon component={IconRevokeSvg} fontSize='inherit' viewBox='0 0 12 12' {...props} />;
}

export default React.memo(IconRevoke);
