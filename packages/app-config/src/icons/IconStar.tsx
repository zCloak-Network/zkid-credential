// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconStarSvg from '../assets/icon_star.svg';

function IconStar(props: any) {
  return (
    <SvgIcon
      component={IconStarSvg}
      viewBox="0 0 14 13.364"
      {...props}
      sx={{ width: 14, height: 13.364, ...props?.sx }}
    />
  );
}

export default React.memo(IconStar);
