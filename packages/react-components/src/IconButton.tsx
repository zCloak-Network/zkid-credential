// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ExtendButtonBase, IconButton as MuiIconButton, IconButtonProps, IconButtonTypeMap } from '@mui/material';
import React, { useCallback } from 'react';

type IconButtonType = ExtendButtonBase<IconButtonTypeMap>;

const IconButton = React.forwardRef<any, IconButtonProps>(function (props, ref) {
  const onClick = useCallback(
    (e: React.MouseEvent<any>) => {
      e.stopPropagation();

      props.onClick && props.onClick(e);
    },
    [props]
  );

  return <MuiIconButton {...props} onClick={onClick} ref={ref} />;
});

export default IconButton as IconButtonType;
