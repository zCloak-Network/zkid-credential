// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Message, MessageType } from '@zcloak/message/types';

import React, { useMemo } from 'react';

import { alpha, Box, useTheme } from '@credential/react-components';

function MessageTypeDisplay({ message }: { message: Message<MessageType> }) {
  const { palette } = useTheme();

  const color = useMemo(() => {
    if (['Response_Approve_Attestation', 'Response_Accept_VP'].includes(message.msgType)) {
      return palette.success.main;
    }

    if (['Response_Reject_Attestation', 'Response_Reject_VP'].includes(message.msgType)) {
      return palette.error.main;
    }

    if (['Send_VP', 'Send_issuedVC'].includes(message.msgType)) {
      return palette.success.main;
    }

    return palette.warning.main;
  }, [message.msgType, palette.error.main, palette.success.main, palette.warning.main]);

  const text = useMemo(() => {
    switch (message.msgType) {
      case 'Request_Attestation':
        return 'Request Attestation';

      case 'Response_Approve_Attestation':
        return 'Approve Attestation';

      case 'Response_Reject_Attestation':
        return 'Reject Attestation';

      case 'Reqeust_VP':
        return 'Request Presentation';

      case 'Response_Accept_VP':
        return 'Accept Presentation';

      case 'Response_Reject_VP':
        return 'Reject Presentation';

      case 'Send_VP':
        return 'Send Presentation';

      case 'Send_issuedVC':
        return 'Issued VC';

      default:
        return 'Unknown';
    }
  }, [message]);

  return (
    <Box
      sx={() => ({
        width: 150,
        height: 28,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: alpha(color, 0.2),
        borderRadius: 1,
        color
      })}
    >
      {text}
    </Box>
  );
}

export default React.memo(MessageTypeDisplay);
