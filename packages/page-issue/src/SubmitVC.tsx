// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CType } from '@zcloak/ctype/types';
import type { Did } from '@zcloak/did';
import type { AnyJson, RawCredential, VerifiableCredential } from '@zcloak/vc/types';

import React, { useCallback, useContext, useState } from 'react';

import { Message } from '@zcloak/message/types';
import { Raw } from '@zcloak/vc';

import { DEFAULT_ROOT_HASH_TYPE } from '@credential/app-config/vc';
import { Button, CTypeContext, NotificationContext, Recaptcha } from '@credential/react-components';
import { DidsContext, DidsModal } from '@credential/react-dids';
import {
  encryptMessageStep,
  sendMessage,
  signAndBuildVC,
  Steps
} from '@credential/react-dids/steps';
import { useToggle } from '@credential/react-hooks';

interface Props {
  contents: AnyJson;
  holder: Did | null;
  ctype: CType;
  onDone?: () => void;
}

function SubmitVC({ contents, ctype, holder, onDone }: Props) {
  const { did: sender } = useContext(DidsContext);
  const { serverCTypes } = useContext(CTypeContext);
  const { notifyError } = useContext(NotificationContext);
  const [open, toggleOpen] = useToggle();
  const [encryptedMessage, setEncryptedMessage] = useState<Message<'Send_issuedVC'>>();
  const [recaptchaToken, setRecaptchaToken] = useState<string>();
  const [rawCredential, setRawCredential] = useState<RawCredential | null>(null);
  const [vc, setVC] = useState<VerifiableCredential | null>(null);

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
    onDone?.();
  }, [onDone]);

  return (
    <>
      <Button disabled={!holder || !ctype || !contents} onClick={_toggleOpen} variant="contained">
        Submit
      </Button>
      {open && rawCredential && (
        <DidsModal
          onClose={toggleOpen}
          open={open}
          steps={
            <Steps
              onDone={_onDone}
              steps={[
                {
                  label: 'Sign verifiable Credential',
                  paused: true,
                  exec: () => signAndBuildVC(rawCredential, serverCTypes, sender).then(setVC)
                },
                {
                  label: 'Encrypt message',
                  exec: () =>
                    encryptMessageStep<'Send_issuedVC'>('Send_issuedVC', vc, sender, holder).then(
                      setEncryptedMessage
                    )
                },
                {
                  label: 'Send message',
                  paused: true,
                  content: <Recaptcha onCallback={setRecaptchaToken} />,
                  exec: () => sendMessage(encryptedMessage, recaptchaToken)
                }
              ]}
              submitText="Submit"
            />
          }
          title="Issue Verifiable Credential"
        />
      )}
    </>
  );
}

export default React.memo(SubmitVC);
