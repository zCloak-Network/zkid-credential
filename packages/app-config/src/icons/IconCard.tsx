// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

// generate by buildAssets.js

import type { SvgIconProps } from '@mui/material';

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconCardSvg from '../assets/icon_card.svg';

function IconCard(props: SvgIconProps) {
  return <SvgIcon component={IconCardSvg} fontSize='inherit' viewBox='0 0 38.869 34.01' {...props} />;
}

export default React.memo(IconCard);
