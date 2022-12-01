// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconMyctypeSvg from '../assets/icon_myctype.svg';

function IconMyctype(props: any) {
  return (
    <SvgIcon
      component={IconMyctypeSvg}
      viewBox="0 0 15.502 15.502"
      {...props}
      sx={{ width: 15.502, height: 15.502, ...props?.sx }}
    />
  );
}

export default React.memo(IconMyctype);
