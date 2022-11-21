// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CType } from '@zcloak/ctype/types';
import type { Did } from '@zcloak/did';
import type { AnyJson } from '@zcloak/vc/types';

import { Button } from '@mui/material';
import React, { useCallback, useContext, useMemo, useState } from 'react';

import { Message } from '@zcloak/message/types';
import { Raw } from '@zcloak/vc';

import { addPendingCredential } from '@credential/app-store/pending-credential';
import { useDB } from '@credential/app-store/useDB';
import { Recaptcha } from '@credential/react-components';
import { DidsContext, DidsModal } from '@credential/react-dids';
import { encryptMessageStep, sendMessage, Steps } from '@credential/react-dids/steps';
import { useToggle } from '@credential/react-hooks';

const SubmitClaim: React.FC<{
  hasError?: boolean;
  contents: AnyJson;
  attester: Did | null;
  ctype?: CType;
  onDone?: () => void;
}> = ({ attester, contents, ctype, hasError, onDone }) => {
  const { did: sender, unlock } = useContext(DidsContext);
  const db = useDB(sender?.id);
  const [open, toggleOpen] = useToggle();
  const [encryptedMessage, setEncryptedMessage] = useState<Message<'Request_Attestation'>>();
  const [recaptchaToken, setRecaptchaToken] = useState<string>();

  const rawCredential = useMemo(() => {
    if (!contents || !sender || !ctype) {
      return null;
    }

    try {
      const raw = new Raw({
        contents,
        owner: sender.id,
        ctype,
        hashType: 'Rescue'
      });

      raw.calcRootHash();

      return raw.toRawCredential();
    } catch {}

    return null;
  }, [contents, ctype, sender]);

  const _toggleOpen = useCallback(() => {
    unlock().then(toggleOpen);
  }, [toggleOpen, unlock]);

  const _onDone = useCallback(() => {
    if (rawCredential && encryptedMessage && db && attester) {
      addPendingCredential(rawCredential, attester.id, encryptedMessage.id, db);
    }

    onDone?.();
  }, [attester, db, encryptedMessage, onDone, rawCredential]);

  return (
    <>
      <Button
        disabled={!attester || !ctype || !contents || hasError}
        onClick={_toggleOpen}
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
              onDone={_onDone}
              steps={[
                {
                  label: 'Encrypt message',
                  exec: () =>
                    encryptMessageStep<'Request_Attestation'>(
                      'Request_Attestation',
                      rawCredential,
                      sender,
                      attester
                    ).then(setEncryptedMessage)
                },
                {
                  label: 'Send message',
                  paused: true,
                  content: <Recaptcha onCallback={setRecaptchaToken} />,
                  exec: () => sendMessage(encryptedMessage, recaptchaToken)
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
