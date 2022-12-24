// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CType } from '@zcloak/ctype/types';
import type { Did } from '@zcloak/did';
import type { AnyJson, RawCredential } from '@zcloak/vc/types';

import React, { useCallback, useContext, useState } from 'react';

import { Message } from '@zcloak/message/types';
import { Raw } from '@zcloak/vc';

import { DEFAULT_ROOT_HASH_TYPE } from '@credential/app-config/vc';
import { addPendingCredential } from '@credential/app-store/pending-credential';
import { AppContext, Button, NotificationContext, Recaptcha } from '@credential/react-components';
import { DidsContext, DidsModal } from '@credential/react-dids';
import { encryptMessageStep, Steps } from '@credential/react-dids/steps';
import { useToggle } from '@credential/react-hooks';

const SubmitClaim: React.FC<{
  contents: AnyJson;
  attester: Did | null;
  ctype: CType;
  onDone?: () => void;
}> = ({ attester, contents, ctype, onDone }) => {
  const { did: sender } = useContext(DidsContext);
  const { notifyError } = useContext(NotificationContext);
  const { sendMessage } = useContext(AppContext);
  const [open, toggleOpen] = useToggle();
  const [encryptedMessage, setEncryptedMessage] = useState<Message<'Request_Attestation'>>();
  const [recaptchaToken, setRecaptchaToken] = useState<string>();
  const [rawCredential, setRawCredential] = useState<RawCredential | null>(null);

  const _toggleOpen = useCallback(() => {
    try {
      const raw = new Raw({
        contents,
        owner: sender.id,
        ctype,
        hashType: DEFAULT_ROOT_HASH_TYPE
      });

      raw.calcRootHash();

      setRawCredential(raw.toRawCredential());

      toggleOpen();
    } catch (error) {
      notifyError(error);
    }
  }, [contents, ctype, notifyError, sender, toggleOpen]);

  const _onDone = useCallback(() => {
    if (rawCredential && encryptedMessage && attester) {
      addPendingCredential(rawCredential, attester.id, encryptedMessage.id);
    }

    onDone?.();
  }, [attester, encryptedMessage, onDone, rawCredential]);

  return (
    <>
      <Button disabled={!attester || !ctype || !contents} onClick={_toggleOpen} variant="contained">
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
