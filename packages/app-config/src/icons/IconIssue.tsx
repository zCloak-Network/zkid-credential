// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

// generate by buildAssets.js

import type { SvgIconProps } from '@mui/material';

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconIssueSvg from '../assets/icon_issue.svg';

function IconIssue(props: SvgIconProps) {
  return (
    <SvgIcon component={IconIssueSvg} fontSize="inherit" viewBox="0 0 13.815 14.471" {...props} />
  );
}

export default React.memo(IconIssue);
