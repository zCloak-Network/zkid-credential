// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { VerifiableCredential } from '@zcloak/vc/types';

import IconQrcode from '@mui/icons-material/QrCode';
import React, { useCallback } from 'react';

import { IconButton, Stack, Tooltip, Typography } from '@credential/react-components';
import { useToggle } from '@credential/react-hooks';

import QrcodeModal from './QrcodeModal';

function QrcodeButton({
  credential,
  withText = false
}: {
  credential: VerifiableCredential<boolean>;
  withText?: boolean;
}) {
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
      <Tooltip title='Show QR code'>
        <Stack alignItems='center'>
          <IconButton color='inherit' onClick={_toggleOpen} size='small'>
            <IconQrcode sx={{ width: 14, height: 14 }} />
          </IconButton>
          {withText && (
            <Typography sx={({ palette }) => ({ color: palette.common.white })} variant='inherit'>
              QR code
            </Typography>
          )}
        </Stack>
      </Tooltip>
      {open && <QrcodeModal credential={credential} onClose={toggleOpen} open={open} />}
    </>
  );
}

export default React.memo(QrcodeButton);
