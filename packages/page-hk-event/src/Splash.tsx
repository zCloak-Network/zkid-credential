// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Box, Stack } from '@mui/material';
import { useEffect } from 'react';

import { FirstTopLogo } from '@credential/app-config';
import { useToggle } from '@credential/react-hooks';

const Splash = () => {
  const [open, toggle] = useToggle(true);

  useEffect(() => {
    setTimeout(toggle, 200);
  }, [toggle]);

  return (
    <>
      {open && (
        <Box
          sx={{
            width: '100vw',
            height: '100vh',
            zIndex: 99,
            background: '#4B45FF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Stack
            alignItems='center'
            justifyContent='center'
            sx={{
              width: 76,
              height: 76,
              background: '#FFFFFF',
              borderRadius: '15px',
              fontSize: '3rem'
            }}
          >
            <FirstTopLogo />
          </Stack>
        </Box>
      )}
    </>
  );
};

export default Splash;
