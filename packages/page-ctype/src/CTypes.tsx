// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CType } from '@zcloak/ctype/types';

import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import React from 'react';
import { Link } from 'react-router-dom';

import { IconLogoCircle } from '@credential/app-config/icons';
import { Box, Button, Copy, Paper, Stack, Typography } from '@credential/react-components';
import { ellipsisMixin } from '@credential/react-components/utils';
import { DidName } from '@credential/react-dids';

const CTypes: React.FC<{ list: CType[] }> = ({ list }) => {
  return (
    <Box>
      <Box sx={{ textAlign: 'right', mb: 3 }}>
        <Button
          component={Link}
          startIcon={<AddBoxOutlinedIcon />}
          to="/attester/ctypes/create"
          variant="contained"
        >
          Create ctype
        </Button>
      </Box>
      <Stack spacing={3}>
        {list.map((cType) => (
          <Paper
            key={cType.$id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingY: 2.5,
              paddingX: 4.5,
              boxShadow: '0px 3px 6px rgba(153, 155, 168, 0.1)'
            }}
            variant="outlined"
          >
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
              sx={({ breakpoints }) => ({
                width: '20%',
                [breakpoints.down('lg')]: { width: '40%' },
                [breakpoints.down('md')]: { width: '100%' }
              })}
            >
              <IconLogoCircle sx={{ width: 35, height: 35 }} />
              <Typography fontWeight={500}>{cType.title}</Typography>
            </Stack>
            <Stack
              spacing={0.5}
              sx={({ breakpoints }) => ({
                width: '40%',
                [breakpoints.down('lg')]: { display: 'none' }
              })}
            >
              <Typography
                fontWeight={300}
                sx={({ palette }) => ({ color: palette.grey[500] })}
                variant="inherit"
              >
                Created by
              </Typography>
              <Typography sx={{ ...ellipsisMixin() }} variant="inherit">
                <DidName shorten={false} value={cType.publisher} />
              </Typography>
            </Stack>
            <Stack
              spacing={0.5}
              sx={({ breakpoints }) => ({
                width: '40%',
                [breakpoints.down('md')]: { display: 'none' }
              })}
            >
              <Typography
                fontWeight={300}
                sx={({ palette }) => ({ color: palette.grey[500] })}
                variant="inherit"
              >
                CType Hash
              </Typography>
              <Stack direction="row" spacing={1}>
                <Typography sx={{ ...ellipsisMixin() }} variant="inherit">
                  {cType.$id}
                </Typography>
                <Copy value={cType.$id} />
              </Stack>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

export default CTypes;
