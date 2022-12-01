// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { VerifiableCredential } from '@zcloak/vc/types';

import FileSaver from 'file-saver';
import React, { useCallback } from 'react';

import { IconDownload } from '@credential/app-config/icons';
import { IconButton, Stack, Tooltip, Typography } from '@credential/react-components';

const ImportButton: React.FC<{ credential: VerifiableCredential; withText?: boolean }> = ({
  credential,
  withText = false
}) => {
  const download: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.stopPropagation();

      const blob = new Blob([JSON.stringify(credential)], {
        type: 'text/plain;charset=utf-8'
      });

      FileSaver.saveAs(blob, 'credential.json');
    },
    [credential]
  );

  return (
    <Tooltip title="Download">
      <Stack alignItems="center">
        <IconButton onClick={download}>
          <IconDownload />
        </IconButton>
        {withText && (
          <Typography sx={({ palette }) => ({ color: palette.common.white })} variant="inherit">
            Download
          </Typography>
        )}
      </Stack>
    </Tooltip>
  );
};

export default React.memo(ImportButton);
