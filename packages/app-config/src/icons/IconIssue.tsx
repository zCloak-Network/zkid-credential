// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconIssueSvg from '../assets/icon_issue.svg';

function IconIssue(props: any) {
  return (
    <SvgIcon
      component={IconIssueSvg}
      viewBox="0 0 13.815 14.471"
      {...props}
      sx={{ width: 13.815, height: 14.471, ...props?.sx }}
    />
  );
}

export default React.memo(IconIssue);
