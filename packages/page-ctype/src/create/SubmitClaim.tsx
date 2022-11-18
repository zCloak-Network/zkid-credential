// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CType } from '@zcloak/ctype/types';
import type { Did } from '@zcloak/did';

import { Button } from '@mui/material';
import React, { useContext, useMemo, useState } from 'react';

import { AppContext, Recaptcha } from '@credential/react-components';
import { DidsModal, useDerivedDid } from '@credential/react-dids';
import { didManager } from '@credential/react-dids/initManager';
import {
  encryptMessage,
  requestAttestation,
  sendMessage,
  Steps
} from '@credential/react-dids/steps';
import { useToggle } from '@credential/react-hooks';

const SubmitClaim: React.FC<{
  hasError?: boolean;
  contents: Record<string, unknown>;
  attester: Did | null;
  ctype?: CType;
  onDone?: () => void;
}> = ({ attester, contents, ctype, hasError, onDone }) => {
  const { fetcher } = useContext(AppContext);
  const [open, toggleOpen] = useToggle();
  const sender = useDerivedDid();
  const [request, setRequest] = useState<RequestForAttestation>();
  const [encryptedMessage, setEncryptedMessage] = useState<IEncryptedMessage>();
  const [recaptchaToken, setRecaptchaToken] = useState<string>();

  const message = useMemo(
    () =>
      sender && attester && request
        ? new Message(
            {
              content: { requestForAttestation: request },
              type: Message.BodyType.REQUEST_ATTESTATION
            },
            sender.uri,
            attester.uri
          )
        : null,
    [attester, request, sender]
  );

  return (
    <>
      <Button
        disabled={!attester || !ctype || !contents || hasError}
        onClick={toggleOpen}
        variant="contained"
      >
        Submit
      </Button>
      {open && (
        <DidsModal
          onClose={toggleOpen}
          open={open}
          steps={
            <Steps
              onDone={onDone}
              steps={[
                {
                  label: 'Request for attestation and sign',
                  exec: () =>
                    requestAttestation(
                      didManager,
                      sender,
                      ctype,
                      contents as Record<string, any>
                    ).then(setRequest)
                },
                {
                  label: 'Encrypt message',
                  exec: () =>
                    encryptMessage(didManager, message, sender, attester).then(setEncryptedMessage)
                },
                {
                  label: 'Send message',
                  paused: true,
                  content: <Recaptcha onCallback={setRecaptchaToken} />,
                  exec: () => sendMessage(fetcher, encryptedMessage, recaptchaToken, message)
                }
              ]}
              submitText="Submit claim"
            />
          }
          title="Submit claim"
        />
      )}
    </>
  );
};

export default React.memo(SubmitClaim);
