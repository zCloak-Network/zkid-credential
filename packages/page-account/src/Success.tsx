// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Box, Button, Stack, Typography } from '@mui/material';
import React from 'react';

const Success: React.FC<{ title: string; desc: string; toggleStart: () => void }> = ({
  desc,
  title,
  toggleStart
}) => {
  return (
    <>
      <Stack spacing={3} textAlign="center">
        <Box component="img" src="/images/home-pic.webp" />
        <Typography variant="h5">{title}</Typography>
        <Typography>{desc}</Typography>
      </Stack>
      <Box mt={5.5} textAlign="center">
        <Button onClick={toggleStart} size="large" variant="contained">
          Get Start
        </Button>
      </Box>
    </>
  );
};

export default React.memo(Success);
