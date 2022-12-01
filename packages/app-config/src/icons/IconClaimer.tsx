// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconClaimerSvg from '../assets/icon_claimer.svg';

function IconClaimer(props: any) {
  return (
    <SvgIcon
      component={IconClaimerSvg}
      viewBox="0 0 15.192 11.655"
      {...props}
      sx={{ width: 15.192, height: 11.655, ...props?.sx }}
    />
  );
}

export default React.memo(IconClaimer);
