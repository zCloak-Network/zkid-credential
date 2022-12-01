// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DecryptedTask } from '@credential/react-hooks/types';

import moment from 'moment';
import React from 'react';

import {
  Box,
  CTypeName,
  IdentityIcon,
  Stack,
  TaskStatusDisplay,
  Typography,
  Unstable_Grid2 as Grid
} from '@credential/react-components';
import { ellipsisMixin } from '@credential/react-components/utils';
import { DidName } from '@credential/react-dids';
import { useRootHash } from '@credential/react-hooks';

import Approve from './Approve';
import Reject from './Reject';

function Cell({ content, label }: { label: string; content: React.ReactNode }) {
  return (
    <Grid
      lg={3}
      sx={{
        display: { xs: 'flex', sm: 'block' },
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
      xl={3}
      xs={4}
    >
      <Typography
        sx={({ palette, typography }) => ({
          color: palette.grey[700],
          fontSize: { xs: typography.fontSize, sm: 'inherit' },
          width: { xs: '50%', sm: '100%' }
        })}
      >
        {label}
      </Typography>
      <Box
        sx={{
          width: { xs: '50%', sm: '100%' },
          display: 'flex',
          flexDirection: { xs: 'row-reverse', sm: 'row' }
        }}
      >
        {content}
      </Box>
    </Grid>
  );
}

const ClaimInfo: React.FC<{
  showActions: boolean;
  task: DecryptedTask;
}> = ({ showActions, task }) => {
  const rootHash = useRootHash(
    task.data.credentialSubject,
    task.data.hasher[0],
    task.data.credentialSubjectNonceMap
  );

  return (
    <Box
      sx={({ palette }) => ({
        background: palette.common.white,
        paddingX: { xs: 4, md: 8 },
        paddingY: 4
      })}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Stack alignItems="center" direction="row" spacing={3} sx={{ width: '60%' }}>
          <IdentityIcon diameter={70} value={task.data.holder} />
          <Box sx={{ width: 300 }}>
            <Typography sx={({ palette }) => ({ color: palette.grey[700] })}>Claimer</Typography>
            <Typography sx={{ ...ellipsisMixin() }} variant="h4">
              <DidName value={task.data.holder} />
            </Typography>
          </Box>
        </Stack>
        {showActions && (
          <Stack
            alignItems="center"
            direction="row"
            spacing={1.5}
            sx={{ display: { md: 'flex', xs: 'none' } }}
          >
            {task.meta.taskStatus === 'pending' && <Approve task={task} />}
            {task.meta.taskStatus === 'pending' && <Reject task={task} />}
          </Stack>
        )}
      </Box>
      <Box mt={5}>
        <Grid
          columns={{ xs: 4, sm: 8, lg: 12 }}
          container
          spacing={{
            lg: 6,
            xs: 3
          }}
        >
          <Cell
            content={
              <Typography sx={{ ...ellipsisMixin() }} variant="inherit">
                {rootHash}
              </Typography>
            }
            label="Claim hash"
          />
          <Cell
            content={
              <Typography sx={{ ...ellipsisMixin() }} variant="inherit">
                <CTypeName cTypeHash={task.data.ctype} />
              </Typography>
            }
            label="Credential type"
          />
          <Cell
            content={
              <Stack alignItems="center" direction="row" spacing={0.75}>
                <TaskStatusDisplay showText status={task.meta.taskStatus} />
                <Typography sx={({ palette }) => ({ color: palette.grey[700] })} variant="inherit">
                  <DidName value={task.data.holder} />
                </Typography>
              </Stack>
            }
            label={'Status'}
          />
          <Cell
            content={
              <Typography variant="inherit">
                {moment(task.createTime).format('YYYY-MM-DD HH:mm:ss')}
              </Typography>
            }
            label="Request time"
          />
        </Grid>
      </Box>
    </Box>
  );
};

export default ClaimInfo;
