// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BaseMessage, MessageType } from '@zcloak/message/types';

import { Link, useMediaQuery, useTheme } from '@mui/material';
import moment from 'moment';
import React from 'react';

import { CTypeName } from '@credential/react-components';
import { DidName } from '@credential/react-dids';

import { MessageCard, MessageCardItem } from './MessageCard';
import MessageTypeDisplay from './MessageTypeDisplay';

function MessageRow({ message }: { message: BaseMessage<MessageType> }) {
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <MessageCard>
      <MessageCardItem
        content={
          <>
            {upMd && <span>Claimer: </span>}
            <Link>
              <DidName value={message.sender} />
            </Link>
          </>
        }
        label="Claimer"
      />
      <MessageCardItem
        content={
          <>
            {upMd && <span>Attester: </span>}
            <Link>
              <DidName value={message.receiver} />
            </Link>
          </>
        }
        label="Attester"
      />
      <MessageCardItem content={message.id} label="Message id" />
      <MessageCardItem content={<CTypeName cTypeHash={message.ctype} />} label="Credential type" />
      <MessageCardItem content={<MessageTypeDisplay message={message} />} label="Type" />
      <MessageCardItem
        content={moment(message.createTime).format('YYYY-MM-DD HH:mm:ss')}
        label="Time"
      />
    </MessageCard>
  );
}

export default React.memo(MessageRow);
