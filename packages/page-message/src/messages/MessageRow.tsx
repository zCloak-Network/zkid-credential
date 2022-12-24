// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DecryptedMessage, Message, MessageType } from '@zcloak/message/types';
import type { VerifiableCredential, VerifiablePresentation } from '@zcloak/vc/types';

import moment from 'moment';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { isSameUri } from '@zcloak/did/utils';

import { Button, CredentialModal, CTypeName, Link } from '@credential/react-components';
import { DidName, DidsContext } from '@credential/react-dids';
import { useDecryptedMessage, useToggle } from '@credential/react-hooks';

import { MessageCard, MessageCardItem } from './MessageCard';
import MessageTypeDisplay from './MessageTypeDisplay';

function getCredential(
  decryptedMessage: DecryptedMessage<MessageType>
): VerifiableCredential | null {
  switch (decryptedMessage.msgType) {
    case 'Send_VP':
      return (decryptedMessage.data as VerifiablePresentation).verifiableCredential[0];

    case 'Response_Accept_VP':
      return (decryptedMessage.data as VerifiablePresentation).verifiableCredential[0];

    case 'Send_issuedVC':
      return decryptedMessage.data as VerifiableCredential;

    case 'Response_Approve_Attestation':
      return decryptedMessage.data as VerifiableCredential;

    default:
      return null;
  }
}

function MessageRow({ message }: { message: Message<MessageType> }) {
  const { did } = useContext(DidsContext);
  const [decrypted, decrypt] = useDecryptedMessage(message);
  const [open, toggleOpen] = useToggle();
  const [credential, setCredential] = useState<VerifiableCredential | null>(null);
  const [loading, setLoading] = useState(false);

  const isReceiver = useMemo(() => isSameUri(message.receiver, did.id), [did.id, message.receiver]);

  const handleView = useCallback(() => {
    setLoading(true);
    decrypt()
      .then(toggleOpen)
      .finally(() => setLoading(false));
  }, [decrypt, toggleOpen]);

  useEffect(() => {
    decrypted && setCredential(getCredential(decrypted));
  }, [decrypted]);

  return (
    <>
      <MessageCard onClick={toggleOpen}>
        <MessageCardItem
          content={
            <Link>
              <DidName value={message.sender} />
            </Link>
          }
          label="Sender"
        />
        <MessageCardItem
          content={
            <Link>
              <DidName value={message.receiver} />
            </Link>
          }
          label="Receiver"
        />
        <MessageCardItem content={message.id} label="Message id" />
        <MessageCardItem
          content={<CTypeName cTypeHash={message.ctype} />}
          label="Credential type"
        />
        <MessageCardItem content={<MessageTypeDisplay message={message} />} label="Type" />
        <MessageCardItem
          content={moment(message.createTime).format('YYYY-MM-DD HH:mm:ss')}
          label="Time"
        />
        <MessageCardItem
          content={
            isReceiver && (
              <Button disabled={loading} onClick={handleView}>
                View
              </Button>
            )
          }
          label="Operation"
        />
      </MessageCard>
      {open && credential && <CredentialModal credential={credential} onClose={toggleOpen} />}
    </>
  );
}

export default React.memo(MessageRow);
