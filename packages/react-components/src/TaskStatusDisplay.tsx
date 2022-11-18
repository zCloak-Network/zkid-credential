// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TaskStatus } from '@credential/react-hooks/types';

import Circle from '@mui/icons-material/Circle';
import { Stack, Typography, useTheme } from '@mui/material';
import React, { useMemo } from 'react';

const TaskStatusDisplay: React.FC<{
  status: TaskStatus;
  showText?: boolean;
}> = ({ showText, status }) => {
  const theme = useTheme();
  const pendingText = useMemo(() => 'Pending', []);
  const approvedText = useMemo(() => 'Valid', []);
  const rejectedText = useMemo(() => 'Rejected', []);
  const revokedText = useMemo(() => 'Revoked', []);

  const pendingColor = useMemo(() => theme.palette.grey[600], [theme.palette.grey]);
  const approvedColor = useMemo(() => theme.palette.success.main, [theme.palette.success.main]);
  const rejectedColor = useMemo(() => theme.palette.error.main, [theme.palette.error.main]);
  const revokedColor = useMemo(() => theme.palette.error.main, [theme.palette.error.main]);

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={() => ({
        display: 'inline-flex',
        alignItems: 'center',
        direction: 'row',
        color:
          status === 'approved'
            ? approvedColor
            : status === 'rejected'
            ? rejectedColor
            : status === 'pending'
            ? pendingColor
            : revokedColor
      })}
    >
      <Circle sx={{ width: 10, height: 10 }} />
      {showText && (
        <Typography variant="inherit">
          {status === 'approved'
            ? approvedText
            : status === 'rejected'
            ? rejectedText
            : status === 'pending'
            ? pendingText
            : revokedText}
        </Typography>
      )}
    </Stack>
  );
};

export default React.memo(TaskStatusDisplay);
