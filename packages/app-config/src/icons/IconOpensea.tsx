// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

// generate by buildAssets.js

import type { SvgIconProps } from '@mui/material';

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconOpenseaSvg from '../assets/icon_opensea.svg';

function IconOpensea(props: SvgIconProps) {
  return <SvgIcon component={IconOpenseaSvg} fontSize='inherit' viewBox='0 0 24 24' {...props} />;
}

export default React.memo(IconOpensea);
