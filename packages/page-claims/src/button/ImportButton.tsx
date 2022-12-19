// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { VerifiableCredential } from '@zcloak/vc/types';

import { stringToHex } from '@polkadot/util';
import React, { useCallback, useContext } from 'react';

import { IconImport } from '@credential/app-config/icons';
import {
  IconButton,
  NotificationContext,
  Stack,
  Tooltip,
  Typography
} from '@credential/react-components';
import { provider } from '@credential/react-dids/instance';

const ImportButton: React.FC<{ withText?: boolean; credential: VerifiableCredential }> = ({
  credential,
  withText = false
}) => {
  const { notifyError } = useContext(NotificationContext);

  const importToExtension: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.stopPropagation();
      provider?.importCredential(stringToHex(JSON.stringify(credential))).catch(notifyError);
    },
    [credential, notifyError]
  );

  return (
    <Tooltip title="Import to zCloak ID Wallet">
      <Stack alignItems="center">
        <IconButton onClick={importToExtension} size="small">
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
