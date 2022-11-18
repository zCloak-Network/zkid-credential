// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DidUrl } from '@zcloak/did-resolver/types';

import Check from '@mui/icons-material/Check';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, Typography } from '@mui/material';
import React, { useMemo } from 'react';

import { ellipsisMixin } from '@credential/react-components/utils';
import { useCopyClipboard } from '@credential/react-hooks';

interface Props {
  value?: DidUrl | undefined | null;
  copyable?: boolean;
}

function DidCell({ copyable, value }: Props) {
  const [isCopied, copy] = useCopyClipboard();

  const str = useMemo(() => {
    if (!value) return null;

    return value;
  }, [value]);

  return (
    <Box
      sx={({ palette }) => ({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 34,
        borderRadius: '17px',
        paddingX: 2,
        paddingY: 1,
        border: '1px solid',
        borderColor: palette.grey[300]
      })}
    >
      <Typography sx={{ ...ellipsisMixin(), maxWidth: 'calc(100% - 20px)' }}>{str}</Typography>
      {copyable ? (
        isCopied ? (
          <Check sx={{ marginLeft: 0.875, width: 12, height: 12, cursor: 'pointer' }} />
        ) : (
          <ContentCopyIcon
            onClick={() => copy(str ?? '')}
            sx={{ marginLeft: 1, width: 12, height: 12, cursor: 'pointer' }}
          />
        )
      ) : null}
    </Box>
  );
}

export default React.memo(DidCell);
