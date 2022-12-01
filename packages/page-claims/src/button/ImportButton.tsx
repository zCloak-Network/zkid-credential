// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { VerifiableCredential } from '@zcloak/vc/types';

import React, { useCallback, useContext } from 'react';

import { IconImport } from '@credential/app-config/icons';
import {
  IconButton,
  NotificationContext,
  Stack,
  Tooltip,
  Typography,
  ZkidExtensionContext
} from '@credential/react-components';

const ImportButton: React.FC<{ withText?: boolean; credential: VerifiableCredential }> = ({
  credential,
  withText = false
}) => {
  const { notifyError } = useContext(NotificationContext);
  const { isInstall, zkidExtension } = useContext(ZkidExtensionContext);

  const importToExtension: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.stopPropagation();

      if (isInstall) {
        zkidExtension.importCredential(credential);
      } else {
        notifyError(new Error('zkID Wallet extension not install'));
      }
    },
    [credential, isInstall, notifyError, zkidExtension]
  );

  return (
    <Tooltip title="Import to zCloak ID Wallet">
      <Stack alignItems="center">
        <IconButton onClick={importToExtension}>
          <IconImport />
        </IconButton>
        {withText && (
          <Typography sx={({ palette }) => ({ color: palette.common.white })} variant="inherit">
            Import
          </Typography>
        )}
      </Stack>
    </Tooltip>
  );
};

export default React.memo(ImportButton);
