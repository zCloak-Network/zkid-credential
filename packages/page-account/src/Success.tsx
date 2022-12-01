// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DidUrl } from '@zcloak/did-resolver/types';

import React from 'react';

import { Box, Button, Stack, Typography } from '@credential/react-components';

const Success: React.FC<{
  didUrl: DidUrl;
  title: string;
  desc: string;
  toggleStart: () => void;
}> = ({ desc, title, toggleStart }) => {
  return (
    <>
      <Stack spacing={3} textAlign="center">
        <Box component="img" src="/images/home-pic.webp" />
        <Typography variant="h5">{title}</Typography>
        <Typography>{desc}</Typography>
      </Stack>
      <Stack alignItems="center" direction="column" mt={5.5} spacing={3}>
        <Button onClick={toggleStart} size="large" variant="contained">
          Get Start
        </Button>
      </Stack>
    </>
  );
};

export default React.memo(Success);
