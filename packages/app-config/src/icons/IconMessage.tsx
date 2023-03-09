// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

// generate by buildAssets.js

import type { SvgIconProps } from '@mui/material';

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconMessageSvg from '../assets/icon_message.svg';

function IconMessage(props: SvgIconProps) {
  return <SvgIcon component={IconMessageSvg} fontSize='inherit' viewBox='0 0 14 14.22' {...props} />;
}

export default React.memo(IconMessage);
