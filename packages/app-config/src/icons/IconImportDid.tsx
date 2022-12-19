// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

// generate by buildAssets.js

import type { SvgIconProps } from '@mui/material';

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconImportDidSvg from '../assets/icon_import_did.svg';

function IconImportDid(props: SvgIconProps) {
  return <SvgIcon component={IconImportDidSvg} fontSize="inherit" viewBox="0 0 16 17" {...props} />;
}

export default React.memo(IconImportDid);
