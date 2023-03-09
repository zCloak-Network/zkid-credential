// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { VerifiableCredential } from '@zcloak/vc/types';

import { stringToHex } from '@polkadot/util';
import React, { useCallback, useContext } from 'react';

import { IconImport } from '@credential/app-config/icons';
import { Button, NotificationContext } from '@credential/react-components';
import { provider } from '@credential/react-dids/instance';

function ImportButton({ credential }: { withText?: boolean; credential: VerifiableCredential<boolean> }) {
  const { notifyError } = useContext(NotificationContext);

  const importToExtension: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.stopPropagation();
      provider?.importCredential(stringToHex(JSON.stringify(credential))).catch(notifyError);
    },
    [credential, notifyError]
  );

  return (
    <Button
      fullWidth
      onClick={importToExtension}
      startIcon={
        <IconImport
          style={{
            fontSize: 12
          }}
        />
      }
      sx={({ palette, spacing }) => ({
        height: spacing(4.5),
        bgcolor: '#F0F0F3',
        color: palette.common.black,
        borderRadius: spacing(1),
        fontSize: spacing(1.5)
      })}
      variant='contained'
    >
      Import to zkID Wallet
    </Button>
  );
}

export default React.memo(ImportButton);
