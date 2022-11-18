// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Modal } from '@mui/material';
import Scanner from 'qr-scanner';
import React, { useEffect, useRef } from 'react';

function QrScanner({
  onClose,
  onResult
}: {
  onResult: (result: string) => void;
  onClose: () => void;
}) {
  const container = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      if (container.current) {
        const scanner = new Scanner(
          container.current,
          (result) => {
            onResult(result.data);
          },
          {
            highlightScanRegion: true,
            highlightCodeOutline: true
          }
        );

        scanner.start();
      }
    });
  }, [onResult]);

  return (
    <Modal onClose={onClose} open>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%'
        }}
      >
        <video
          ref={container}
          style={{
            width: '100%',
            height: '100%'
          }}
        />
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', right: 12, top: 12, color: '#fff' }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
    </Modal>
  );
}

export default React.memo(QrScanner);
