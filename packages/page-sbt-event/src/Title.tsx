// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { alpha, Typography } from '@mui/material';

const Title: React.FC<{ value?: string }> = ({ value }) => {
  return (
    <Typography
      fontWeight={800}
      position='relative'
      sx={{
        zIndex: 10,
        display: 'inline-block',
        '::before': {
          content: "''",
          width: '100%',
          height: 8,
          background: alpha('#0042F1', 0.5),
          position: 'absolute',
          bottom: 6,
          zIndex: -1
        }
      }}
      variant='h1'
    >
      {value}
    </Typography>
  );
};

export default Title;
