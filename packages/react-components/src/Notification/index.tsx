// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Alert, AlertTitle, Box, Collapse, Portal, styled } from '@mui/material';
import React, { createContext, useCallback, useEffect, useRef, useState } from 'react';
import { TransitionGroup } from 'react-transition-group';

type Message = {
  id: number;
  title: string;
  message?: React.ReactNode;
  severity: 'success' | 'info' | 'warning' | 'error';
};

interface NotificationState {
  notifyError: (error: unknown, destroy?: number | null) => number;
  closeNotification: (id: number) => void;
}

export const NotificationContext = createContext<NotificationState>({} as NotificationState);

const NotificationWrapper = styled(Box)`
  z-index: 9999;
  position: fixed;
  top: 0;
  right: 0;
`;

let id = 0;

function makeErrorMessage(error: unknown): Message {
  const theId = id++;

  if (error instanceof Error) {
    return {
      id: theId,
      title: 'Error',
      message: error.message,
      severity: 'error'
    };
  } else {
    return {
      id: theId,
      title: 'Unknown error',
      severity: 'error'
    };
  }
}

// eslint-disable-next-line @typescript-eslint/ban-types
const NotificationProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const messageRef = useRef(messages);

  useEffect(() => {
    messageRef.current = messages;
  }, [messages]);

  const closeNotification = useCallback((id: number) => {
    setMessages(messageRef.current.filter(({ id: _id }) => _id !== id));
  }, []);
  const notifyError = useCallback(
    (error: unknown, destroy: number | null = 6000) => {
      const message = makeErrorMessage(error);

      setMessages([...messageRef.current, message]);

      if (destroy) {
        setTimeout(() => {
          closeNotification(message.id);
        }, destroy);
      }

      return message.id;
    },
    [closeNotification]
  );

  return (
    <NotificationContext.Provider value={{ notifyError, closeNotification }}>
      {children}
      <Portal>
        <NotificationWrapper>
          <TransitionGroup>
            {messages.map(({ id, message, severity, title }) => (
              <Collapse key={id} mountOnEnter unmountOnExit>
                <Alert
                  onClose={() => closeNotification(id)}
                  severity={severity}
                  sx={{ my: 1, mx: 2, width: '300px' }}
                  variant="filled"
                >
                  <AlertTitle>{title}</AlertTitle>
                  <Box sx={{ wordBreak: 'break-all' }}>{message}</Box>
                </Alert>
              </Collapse>
            ))}
          </TransitionGroup>
        </NotificationWrapper>
      </Portal>
    </NotificationContext.Provider>
  );
};

export default React.memo<typeof NotificationProvider>(NotificationProvider);
