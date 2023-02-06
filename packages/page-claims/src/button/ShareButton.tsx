// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { VerifiableCredential } from '@zcloak/vc/types';

import React, { useCallback } from 'react';

import { IconForward } from '@credential/app-config/icons';
import { IconButton, Stack, Tooltip, Typography } from '@credential/react-components';
import { useToggle } from '@credential/react-hooks';

import ShareModal from './ShareModal';

const ShareButton: React.FC<{ credential: VerifiableCredential; withText?: boolean }> = ({
  credential,
  withText = false
}) => {
  const [open, toggleOpen] = useToggle();
  const _toggleOpen: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.stopPropagation();
      toggleOpen();
    },
    [toggleOpen]
  );

  return (
    <>
      <Tooltip title="Share to other">
        <Stack alignItems="center">
          <IconButton color="inherit" onClick={_toggleOpen} size="small">
            <IconForward />
          </IconButton>
          {withText && (
            <Typography sx={({ palette }) => ({ color: palette.common.white })} variant="inherit">
              Share
            </Typography>
          )}
        </Stack>
      </Tooltip>
      {open && <ShareModal credential={credential} onClose={toggleOpen} open={open} />}
    </>
  );
};

export default React.memo(ShareButton);
