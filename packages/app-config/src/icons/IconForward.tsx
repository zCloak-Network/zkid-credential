// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconForwardSvg from '../assets/icon_forward.svg';

function IconForward(props: any) {
  return (
    <SvgIcon
      component={IconForwardSvg}
      viewBox="0 0 14.085 12.325"
      {...props}
      sx={{ width: 14.085, height: 12.325, ...props?.sx }}
    />
  );
}

export default React.memo(IconForward);
