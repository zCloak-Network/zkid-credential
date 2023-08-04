// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { IconLogoBlack } from '@credential/app-config/icons';
import { Box, Link, useMediaQuery, useTheme } from '@credential/react-components';

export default function Logo() {
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Link
      //   onClick={() => navigate('/claimer/ctype')}
      sx={{
        display: 'flex',
        alignItems: 'center',
        fontSize: '20px',
        fontWeight: 700,
        cursor: 'pointer'
      }}
    >
      <Box component={IconLogoBlack} mr={upMd ? 1.5 : 1} />
      {upMd && (
        <>
          Credential&nbsp;
          <Box color='black' component='span'>
            Platform
          </Box>
        </>
      )}
    </Link>
  );
}
