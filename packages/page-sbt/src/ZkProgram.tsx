// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ZkProgramConfig } from '@credential/app-config/zk/types';

import { Box, Button, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';

import { IconZk } from '@credential/app-config';
import { DidName } from '@credential/react-dids';

interface Props {
  config: ZkProgramConfig[];
  selectIndex?: number;
  onSelect: (index: number) => void;
}

function ZkProgram({ config, onSelect, selectIndex }: Props) {
  return (
    <Box sx={{ marginTop: 5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 3, gap: 1.25 }}>
        <img src={IconZk} width={40} />
        <Typography variant='h3'>zkProgram</Typography>
      </Box>
      <Grid columns={{ xs: 12 }} container marginTop={3} spacing={5}>
        {config.map((item, index) => (
          <Grid key={index} lg={3} md={4} sm={6} xs={12}>
            <Stack
              onClick={() => onSelect(index)}
              spacing={1}
              sx={{
                cursor: 'pointer',
                padding: 2.5,
                bgcolor: 'common.white',
                border: '1px solid transparent',
                borderColor: selectIndex === index ? 'primary.main' : 'transparent',
                boxShadow: selectIndex === index ? '0px 6px 20px 1px rgba(206,214,235,0.73)' : 'none',
                ':hover': {
                  borderColor: 'primary.main',
                  boxShadow: '0px 6px 20px 1px rgba(206,214,235,0.73)'
                }
              }}
            >
              <Typography variant='h4'>{item.name}</Typography>
              <Typography
                sx={{
                  height: 48,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  '-webkit-line-clamp': '2',
                  '-webkit-box-orient': 'vertical',
                  color: '#8F95B2'
                }}
              >
                {item.description}
              </Typography>
              <Typography
                sx={{
                  marginBottom: '16px !important',
                  fontSize: 12,
                  color: '#8F95B2'
                }}
              >
                Writer: <DidName value={item.author} />
              </Typography>
              <Button fullWidth size='small' sx={{ boxShadow: 'none' }} variant='contained'>
                Output list
              </Button>
              <Button color='secondary' fullWidth size='small' sx={{ boxShadow: 'none' }} variant='contained'>
                Preview
              </Button>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ZkProgram;
