// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Button as MuiButton, ButtonProps, ButtonTypeMap } from '@mui/material';
import { OverrideProps } from '@mui/material/OverridableComponent';
import React, { useCallback } from 'react';

interface ButtonType {
  (props: ButtonProps): React.ReactElement;
  <C extends React.ElementType>(props: { component: C } & OverrideProps<ButtonTypeMap, C>): React.ReactElement;
}

const Button = React.forwardRef<any, ButtonProps>(function (props, ref) {
  const onClick = useCallback(
    (e: React.MouseEvent<any>) => {
      e.stopPropagation();

      props.onClick && props.onClick(e);
    },
    [props]
  );

  return <MuiButton {...props} onClick={onClick} ref={ref} />;
});

export default Button as ButtonType;
