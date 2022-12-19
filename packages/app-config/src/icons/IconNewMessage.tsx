// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

// generate by buildAssets.js

import type { SvgIconProps } from '@mui/material';

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconNewMessageSvg from '../assets/icon_new_message.svg';

function IconNewMessage(props: SvgIconProps) {
  return <SvgIcon component={IconNewMessageSvg} fontSize="inherit" viewBox="0 0 18.999 18.999" {...props} />;
}

export default React.memo(IconNewMessage);
