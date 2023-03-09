// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Box, BoxTypeMap } from '@mui/material';
import { OverridableComponent, OverrideProps } from '@mui/material/OverridableComponent';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props<D extends React.ElementType = BoxTypeMap['defaultComponent'], P = {}> = OverrideProps<BoxTypeMap<P, D>, D>;

const Ellipsis: OverridableComponent<BoxTypeMap> = React.forwardRef(function ({ children, ...props }: Props, ref: any) {
  return (
    <Box
      {...props}
      className='CredentialEllipsis'
      overflow='hidden'
      ref={ref}
      textOverflow='ellipsis'
      whiteSpace='nowrap'
    >
      {children}
    </Box>
  );
}) as OverridableComponent<BoxTypeMap>;

export default Ellipsis;
