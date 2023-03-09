// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { VerifiablePresentation } from '@zcloak/vc/types';

import { Box } from '@mui/material';
import qrcode from 'qrcode-generator';
import React, { useEffect, useRef } from 'react';

function CredentialQrcode({ cellSize = 5, presentation }: { cellSize?: number; presentation: VerifiablePresentation }) {
  const qr = useRef(qrcode(0, 'L'));
  const container = useRef<HTMLDivElement>();

  useEffect(() => {
    const compressCredential = JSON.stringify(presentation);

    qr.current = qrcode(0, 'L');

    qr.current.addData(JSON.stringify(compressCredential));
    qr.current.make();
    if (container.current) container.current.innerHTML = qr.current.createImgTag(cellSize);
  }, [cellSize, presentation]);

  return <Box className='CredentialQrcode' ref={container} />;
}

export default React.memo(CredentialQrcode);
