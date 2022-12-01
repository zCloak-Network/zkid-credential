// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

import { SvgIcon } from '@credential/react-components';

import IconImportDidSvg from '../assets/icon_import_did.svg';

function IconImportDid(props: any) {
  return (
    <SvgIcon
      component={IconImportDidSvg}
      viewBox="0 0 16 17"
      {...props}
      sx={{ width: 16, height: 17, ...props?.sx }}
    />
  );
}

export default React.memo(IconImportDid);
