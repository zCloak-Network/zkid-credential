// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconRejectSvg from '../assets/icon_reject.svg';

function IconReject(props: any) {
  return (
    <SvgIcon
      component={IconRejectSvg}
      viewBox="0 0 12 12"
      {...props}
      sx={{ width: 12, height: 12, ...props?.sx }}
    />
  );
}

export default React.memo(IconReject);
