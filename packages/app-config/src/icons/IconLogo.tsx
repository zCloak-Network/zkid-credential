// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconLogoSvg from '../assets/icon_logo.svg';

function IconLogo(props: any) {
  return (
    <SvgIcon
      component={IconLogoSvg}
      viewBox="0 0 35.626 37.885"
      {...props}
      sx={{ width: 35.626, height: 37.885, ...props?.sx }}
    />
  );
}

export default React.memo(IconLogo);
