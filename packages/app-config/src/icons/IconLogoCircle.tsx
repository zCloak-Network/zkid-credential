// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconLogoCircleSvg from '../assets/icon_logo_circle.svg';

function IconLogoCircle(props: any) {
  return (
    <SvgIcon
      component={IconLogoCircleSvg}
      viewBox="0 0 60 60"
      {...props}
      sx={{ width: 60, height: 60, ...props?.sx }}
    />
  );
}

export default React.memo(IconLogoCircle);
