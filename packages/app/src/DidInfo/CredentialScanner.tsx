// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { VerifiableCredential } from '@zcloak/vc/types';

import React, { useCallback, useState } from 'react';

import { isVP } from '@zcloak/vc/utils';

import { CredentialModal, QrScanner } from '@credential/react-components';
import { useToggle } from '@credential/react-hooks';

function CredentialScanner({ onClose }: { onClose: () => void }) {
  const [credential, setCredential] = useState<VerifiableCredential>();
  const [open, toggleOpen] = useToggle();

  const onResult = useCallback(
    (result: string) => {
      try {
        const vp = JSON.parse(result);

        if (isVP(vp)) {
          setCredential(vp.verifiableCredential[0]);
          toggleOpen();
        }
      } catch {}
    },
    [toggleOpen]
  );

  return open && credential ? (
    <CredentialModal credential={credential} onClose={onClose} />
  ) : (
    <QrScanner onClose={onClose} onResult={onResult} />
  );
}

export default React.memo(CredentialScanner);
