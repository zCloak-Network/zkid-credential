// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { VerifiableCredential } from '@zcloak/vc/types';

import IconQrcode from '@mui/icons-material/QrCode';
import { IconButton, Stack, Tooltip, Typography } from '@mui/material';
import React, { useCallback, useContext } from 'react';

import { DidsContext } from '@credential/react-dids';
import { useToggle } from '@credential/react-hooks';

import QrcodeModal from './QrcodeModal';

const QrcodeButton: React.FC<{ credential: VerifiableCredential; withText?: boolean }> = ({
  credential,
  withText = false
}) => {
  const { unlock } = useContext(DidsContext);
  const [open, toggleOpen] = useToggle();
  const _toggleOpen: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.stopPropagation();

      unlock().then(toggleOpen);
      toggleOpen();
    },
    [toggleOpen, unlock]
  );

  return (
    <>
      <Tooltip title="Show QR code">
        <Stack alignItems="center">
          <IconButton onClick={_toggleOpen}>
            <IconQrcode sx={{ width: 14, height: 14 }} />
          </IconButton>
          {withText && (
            <Typography sx={({ palette }) => ({ color: palette.common.white })} variant="inherit">
              QR code
            </Typography>
          )}
        </Stack>
      </Tooltip>
      {open && <QrcodeModal credential={credential} onClose={toggleOpen} open={open} />}
    </>
  );
};

export default React.memo(QrcodeButton);
