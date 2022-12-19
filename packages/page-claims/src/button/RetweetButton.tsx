// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { VerifiableCredential } from '@zcloak/vc/types';

import React, { useCallback } from 'react';

import { IconTwitter } from '@credential/app-config/icons';
import { IconButton, Stack, Tooltip, Typography } from '@credential/react-components';

const RetweetButton: React.FC<{ credential: VerifiableCredential; withText?: boolean }> = ({
  withText = false
}) => {
  const retweet = useCallback(() => {
    const search = new URLSearchParams();

    search.append(
      'text',
      `I have participated in the World’s First zk-Guessing for the World Cup Games powered by @zCloakNetwork.

Come join me to see how zero-knowledge proof plays with football games and get your reward.

Tutorial: https://zcloaknetwork.medium.com/worlds-first-zk-guessing-for-the-world-cup-games-dc2d22fa5a83`
    );
    window.open(`https://twitter.com/intent/tweet?${search}`);
  }, []);

  return (
    <Tooltip title="Retweet">
      <Stack alignItems="center">
        <IconButton onClick={retweet} size="small">
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
