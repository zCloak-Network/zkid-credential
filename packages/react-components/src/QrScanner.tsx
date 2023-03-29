// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Modal } from '@mui/material';
import Scanner from 'qr-scanner';
import React, { useEffect, useRef, useState } from 'react';

function QrScanner({ onClose, onResult }: { onResult: (result: string) => void; onClose: () => void }) {
  const container = useRef<HTMLVideoElement | null>(null);
  const [scanner, setScanner] = useState<Scanner>();

  useEffect(() => {
    setTimeout(() => {
      if (container.current) {
        const _scanner = new Scanner(
          container.current,
          (result) => {
            onResult(result.data);
          },
          {
            highlightScanRegion: true,
            highlightCodeOutline: true
          }
        );

        setScanner(_scanner);
      }
    });
  }, [onResult]);

  useEffect(() => {
    if (!scanner) return;
    scanner.start();

    return () => {
      scanner.stop();
    };
  }, [scanner]);

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
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 12, top: 12, color: '#fff' }}>
          <CloseIcon />
        </IconButton>
      </Box>
    </Modal>
  );
}

export default React.memo(QrScanner);
