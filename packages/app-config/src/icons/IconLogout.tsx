// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconLogoutSvg from '../assets/icon_logout.svg';

function IconLogout(props: any) {
  return (
    <SvgIcon
      component={IconLogoutSvg}
      viewBox="0 0 12.546 12.546"
      {...props}
      sx={{ width: 12.546, height: 12.546, ...props?.sx }}
    />
  );
}

export default React.memo(IconLogout);
