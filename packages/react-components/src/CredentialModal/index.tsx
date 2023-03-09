// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { VerifiableCredential } from '@zcloak/vc/types';

import React, { useMemo } from 'react';

import { DidName } from '@credential/react-dids';

import { FullScreenDialog, FullScreenDialogContent, FullScreenDialogHeader, IdentityIcon } from '..';
import CredentialContents from './CredentialContents';

interface Props {
  credential: VerifiableCredential<boolean>;
  actions?: React.ReactNode;
  onClose?: () => void;
}

const CredentialModal: React.FC<Props> = ({ credential, onClose }) => {
  const owner = useMemo(() => credential.holder, [credential.holder]);
  const digest = useMemo(() => credential.digest, [credential.digest]);
  const ctypeHash = useMemo(() => credential.ctype, [credential.ctype]);
  const attester = useMemo(() => credential.issuer, [credential.issuer]);
  const contents = useMemo(() => credential.credentialSubject, [credential.credentialSubject]);

  return (
    <FullScreenDialog open>
      <FullScreenDialogHeader
        desc={digest}
        icon={<IdentityIcon diameter={50} value={owner} />}
        onClose={onClose}
        title={<DidName value={owner} />}
      />
      <FullScreenDialogContent>
        <CredentialContents
          attester={attester}
          contents={contents}
          ctypeHash={ctypeHash}
          owner={owner}
          status='approved'
        />
      </FullScreenDialogContent>
    </FullScreenDialog>
  );
};

export default React.memo(CredentialModal);
