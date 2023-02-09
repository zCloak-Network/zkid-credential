// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import Circle from '@mui/icons-material/Circle';
import { alpha, Stack, Typography, useTheme } from '@mui/material';
import React, { useMemo } from 'react';

import { CredentialStatus } from '@credential/app-store/pending-credential';

const CredentialStatusDisplay: React.FC<{
  status: CredentialStatus;
  revoked?: boolean;
  showText?: boolean;
}> = ({ revoked, showText, status }) => {
  const theme = useTheme();
  const initText = useMemo(() => 'Attesting', []);
  const submitText = useMemo(() => (revoked ? 'Revoked' : 'Attested'), [revoked]);
  const rejectText = useMemo(() => 'Rejected', []);
  const initColor = useMemo(() => theme.palette.warning.main, [theme.palette.warning.main]);
  const submitColor = useMemo(
    () => (revoked ? theme.palette.error.main : theme.palette.success.main),
    [revoked, theme.palette.error.main, theme.palette.success.main]
  );
  const rejectColor = useMemo(() => theme.palette.error.main, [theme.palette.error.main]);

  return (
    <Stack
      direction="row"
      pl={1}
      pr={1}
      spacing={1}
      sx={() => ({
        display: 'inline-flex',
        alignItems: 'center',
        direction: 'row',
        borderRadius: '5px',
        bgcolor: alpha(
          status === 'approved' ? submitColor : status === 'rejected' ? rejectColor : initColor,
          0.2
        ),
        color: status === 'approved' ? submitColor : status === 'rejected' ? rejectColor : initColor
      })}
    >
      <Circle sx={{ width: 10, height: 10 }} />
      {showText && (
        <Typography variant="inherit">
          {status === 'approved' ? submitText : status === 'rejected' ? rejectText : initText}
        </Typography>
      )}
    </Stack>
  );
};

export default React.memo(CredentialStatusDisplay);
