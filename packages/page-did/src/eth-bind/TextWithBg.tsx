// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { PropsWithChildren } from 'react';

import { Box, Typography } from '@credential/react-components';

const TextWithBg: React.FC<
  { value?: string; bgcolor?: string; label?: string; mt?: number; mb?: number } & PropsWithChildren
> = ({ bgcolor, children, label, mb, mt, value }) => {
  return (
    <Box mb={mb} mt={mt}>
      {label && (
        <Typography color='#8F95B2' fontSize={14} mb={1}>
          {label}
        </Typography>
      )}
      <Box
        sx={{
          width: '100%',
          paddingX: 2.25,
          paddingY: 1.75,
          bgcolor,
          borderRadius: '5px',
          wordWrap: 'break-word'
        }}
      >
        {value && <Typography fontSize={14}>{value}</Typography>}
        {children}
      </Box>
    </Box>
  );
};

export default TextWithBg;
