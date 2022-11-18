// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { SvgIcon } from '@mui/material';
import React from 'react';

import IconNewMessageSvg from '../assets/icon_new_message.svg';

function IconNewMessage(props: any) {
  return (
    <SvgIcon
      component={IconNewMessageSvg}
      viewBox="0 0 18.999 18.999"
      {...props}
      sx={{ width: 18.999, height: 18.999, ...props?.sx }}
    />
  );
}

export default React.memo(IconNewMessage);
