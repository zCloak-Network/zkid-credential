// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DecryptedMessage, MessageType } from '@zcloak/message/types';
import type { VerifiableCredential, VerifiablePresentation } from '@zcloak/vc/types';

import type { MessageWithMeta } from '@credential/react-hooks/types';

import moment from 'moment';
import React, { useEffect, useState } from 'react';

import {
  CredentialModal,
  CTypeName,
  Link,
  useMediaQuery,
  useTheme
} from '@credential/react-components';
import { DidName } from '@credential/react-dids';
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

function MessageRow({ message }: { message: MessageWithMeta<MessageType> }) {
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const decrypted = useDecryptedMessage(message);
  const [open, toggleOpen] = useToggle();
  const [credential, setCredential] = useState<VerifiableCredential | null>(null);

  useEffect(() => {
    decrypted && setCredential(getCredential(decrypted));
  }, [decrypted]);

  return (
    <>
      <MessageCard onClick={toggleOpen}>
        <MessageCardItem
          content={
            <>
              {upMd && <span>Sender: </span>}
              <Link>
                <DidName value={message.sender} />
              </Link>
            </>
          }
          label="Sender"
        />
        <MessageCardItem
          content={
            <>
              {upMd && <span>Receiver: </span>}
              <Link>
                <DidName value={message.receiver} />
              </Link>
            </>
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
      </MessageCard>
      {open && credential && <CredentialModal credential={credential} onClose={toggleOpen} />}
    </>
  );
}

export default React.memo(MessageRow);
