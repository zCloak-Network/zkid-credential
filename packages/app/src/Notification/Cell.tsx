// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DecryptedMessage, Message, MessageType } from '@zcloak/message/types';
import type { VerifiableCredential, VerifiablePresentation } from '@zcloak/vc/types';

import Circle from '@mui/icons-material/Circle';
import {
  alpha,
  Box,
  Button,
  Link,
  Stack,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import moment from 'moment';
import React, { useCallback, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { IconNewMessage, IconNewTask } from '@credential/app-config/icons';
import { CredentialModal, CTypeName } from '@credential/react-components';
import { DidName } from '@credential/react-dids';
import { useDecryptedMessage, useToggle } from '@credential/react-hooks';
import { MessageWithMeta } from '@credential/react-hooks/types';

function getCredential(message: DecryptedMessage<MessageType>): VerifiableCredential | null {
  switch (message.msgType) {
    case 'Send_VP':
      return (message.data as VerifiablePresentation).verifiableCredential[0];

    case 'Response_Accept_VP':
      return (message.data as VerifiablePresentation).verifiableCredential[0];

    case 'Send_issuedVC':
      return message.data as VerifiableCredential;

    case 'Response_Approve_Attestation':
      return message.data as VerifiableCredential;

    default:
      return null;
  }
}

function getDesc(
  { ctype, msgType, sender }: Message<MessageType>,
  decrypted?: DecryptedMessage<MessageType> | null
): React.ReactNode {
  switch (msgType) {
    case 'Request_Attestation':
      return (
        <>
          <Link>
            <DidName value={sender} />
          </Link>{' '}
          submitted{' '}
          <Link>
            <CTypeName cTypeHash={ctype} />
          </Link>{' '}
          verification request, Please deal with it in time!
        </>
      );

    case 'Response_Approve_Attestation':
      return (
        <>
          <Link>
            <DidName value={sender} />
          </Link>{' '}
          approved{' '}
          <Link>
            <CTypeName cTypeHash={ctype} />
          </Link>{' '}
          attestation
        </>
      );

    case 'Response_Reject_Attestation':
      return (
        <>
          <Link>
            <DidName value={sender} />
          </Link>{' '}
          rejected{' '}
          <Link>
            <CTypeName cTypeHash={ctype} />
          </Link>
          attestation
        </>
      );

    case 'Send_VP':
      return 'You are have received a presentation, Please check in time!';

    case 'Send_issuedVC':
      return 'You are have received a verifiable credential, Please check in time!';

    case 'Extends_World_Cup':
      return `⚽️ ${decrypted?.data?.reason}`;

    default:
      return (
        <>
          <Link>
            <DidName value={sender} />
          </Link>{' '}
          send a [{msgType}] messsage to you.
        </>
      );
  }
}

function Cell({
  isRead,
  message,
  onRead
}: {
  isRead: boolean;
  message: MessageWithMeta<MessageType>;
  onRead: () => void;
}) {
  const theme = useTheme();
  const upSm = useMediaQuery(theme.breakpoints.up('sm'));
  const navigate = useNavigate();
  const decrypted = useDecryptedMessage(message);

  const credential = useRef<VerifiableCredential | null>(null);

  const [open, toggleOpen] = useToggle();

  const desc = useMemo(() => getDesc(message), [message]);

  const handleClick = useCallback(() => {
    onRead();

    if (message.msgType === 'Request_Attestation') {
      navigate(`/attester/tasks/${message.id}`);
    }

    if (message.msgType === 'Send_issuedVC') {
      navigate('/claimer/claims');
    }

    if (!decrypted) return;

    const _credential = getCredential(decrypted);

    if (_credential) {
      credential.current = _credential;
      toggleOpen();
    }
  }, [decrypted, message.id, message.msgType, navigate, onRead, toggleOpen]);

  return (
    <>
      <Stack
        alignItems="flex-start"
        direction={upSm ? 'row' : 'column'}
        justifyContent="space-between"
        onClick={handleClick}
        paddingX={2}
        paddingY={1.5}
        spacing={upSm ? 2.5 : 1.5}
        sx={({ palette }) => ({
          ':hover': {
            background: alpha(palette.primary.main, 0.1)
          }
        })}
      >
        {upSm && (
          <Box sx={{ width: 24, display: 'flex', alignSelf: 'center', flex: '0 0 auto' }}>
            {message.msgType === 'Request_Attestation' ? (
              <IconNewTask color="primary" />
            ) : (
              <IconNewMessage color="primary" />
            )}
          </Box>
        )}
        <Box sx={{ width: upSm ? 'calc(100% - 24px) * 0.41' : '100%' }}>
          <Typography variant="inherit">{desc}</Typography>
        </Box>
        <Box
          sx={{
            width: upSm ? 'calc(100% - 24px) * 0.59' : '100%',
            textAlign: 'right',
            whiteSpace: 'nowrap'
          }}
        >
          <Stack alignItems="center" direction="row" spacing={1.5}>
            <Typography
              sx={({ palette }) => ({
                color: palette.grey[500],
                fontSize: 12
              })}
              variant="inherit"
            >
              {moment(message.createTime).format('YYYY-MM-DD HH:mm:ss')}
            </Typography>
            <Circle color={isRead ? 'disabled' : 'warning'} sx={{ width: 8, height: 8 }} />
          </Stack>
          {!isRead && (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onRead();
              }}
              sx={{
                fontSize: 12
              }}
            >
              Mask as read
            </Button>
          )}
        </Box>
      </Stack>
      {open && credential.current && (
        <CredentialModal credential={credential.current} onClose={toggleOpen} />
      )}
    </>
  );
}

export default React.memo(Cell);
