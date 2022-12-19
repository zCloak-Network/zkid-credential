// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

// generate by buildAssets.js

import type { SvgIconProps } from '@mui/material';

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconAttesterSvg from '../assets/icon_attester.svg';

function IconAttester(props: SvgIconProps) {
  return <SvgIcon component={IconAttesterSvg} fontSize="inherit" viewBox="0 0 12.757 13.676" {...props} />;
}

export default React.memo(IconAttester);
