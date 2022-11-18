// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { VerifiableCredential } from '@zcloak/vc/types';

import { IconButton, Stack, Tooltip, Typography } from '@mui/material';
import React, { useCallback } from 'react';

import { IconTwitter } from '@credential/app-config/icons';

const RetweetButton: React.FC<{ credential: VerifiableCredential; withText?: boolean }> = ({
  credential,
  withText = false
}) => {
  const retweet = useCallback(() => {
    const search = new URLSearchParams();

    search.append(
      'text',
      `I have claimed my @zCloakNetwork Membership Credential.

Credential type hash: ${credential.ctype}

Attester: ${credential.issuer}

Come get yours at: https://zkid.app`
    );
    window.open(`https://twitter.com/intent/tweet?${search}`);
  }, [credential.ctype, credential.issuer]);

  return (
    <Tooltip title="Retweet">
      <Stack alignItems="center">
        <IconButton onClick={retweet}>
          <IconTwitter />
        </IconButton>
        {withText && (
          <Typography sx={({ palette }) => ({ color: palette.common.white })} variant="inherit">
            Retweet
          </Typography>
        )}
      </Stack>
    </Tooltip>
  );
};

export default React.memo(RetweetButton);
