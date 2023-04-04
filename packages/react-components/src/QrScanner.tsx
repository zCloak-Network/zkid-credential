// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import CloseIcon from '@mui/icons-material/Close';
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';
import { Box, Button, IconButton, SwipeableDrawer } from '@mui/material';
import Scanner from 'qr-scanner';
import React, { useEffect, useRef, useState } from 'react';

function QrScanner({ onClose, onResult }: { onResult: (result: string) => void; onClose: () => void }) {
  return (
    <SwipeableDrawer
      ModalProps={{ keepMounted: false }}
      PaperProps={{ sx: { height: '100%' } }}
      anchor='bottom'
      onClose={onClose}
      onOpen={onClose}
      open
    >
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
        <Scan onClose={onClose} onResult={onResult} />
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 12, top: 12, color: '#fff' }}>
          <CloseIcon />
        </IconButton>
      </Box>
    </SwipeableDrawer>
  );
}

export default React.memo(QrScanner);

function Scan({ onClose, onResult }: { onClose: () => void; onResult: (result: string) => void }) {
  const container = useRef<HTMLVideoElement | null>(null);
  const scanner = useRef<Scanner | null>(null);
  const onResultRef = useRef<(value: string) => void>(onResult);
  const [mode, setMode] = useState<Scanner.FacingMode>('environment');

  useEffect(() => {
    const ele = container.current as HTMLVideoElement;

    scanner.current = new Scanner(
      ele,
      (result) => {
        onResultRef.current(result.data);
      },
      {
        preferredCamera: 'environment',
        highlightScanRegion: true,
        highlightCodeOutline: true
      }
    );
    scanner.current.start();

    return () => {
      scanner.current?.destroy();
    };
  }, []);

  useEffect(() => {
    onResultRef.current = onResult;
  }, [onResult]);

  return (
    <Box>
      <Box>
        <IconButton
          onClick={() => {
            const value = mode === 'environment' ? 'user' : 'environment';

            setMode(value);
            scanner.current?.setCamera(value);
          }}
          sx={{ position: 'absolute', left: 12, top: 12, color: '#fff' }}
        >
          <FlipCameraIosIcon />
        </IconButton>
        <video
          autoPlay
          ref={container}
          style={{
            width: '100%',
            height: '100%'
          }}
        />
      </Box>
      <Box>
        <Button fullWidth onClick={onClose} variant='contained'>
          Close
        </Button>
      </Box>
    </Box>
  );
}
