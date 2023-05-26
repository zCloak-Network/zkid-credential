// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useContext, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  AppContext,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogHeader,
  Stack
} from '@credential/react-components';
import { ellipsisMixin } from '@credential/react-components/utils';
import { useDecryptedMessage, useTask } from '@credential/react-hooks';

import Approve from './Approve';
import ClaimInfo from './ClaimInfo';
import Details from './Details';
import Reject from './Reject';

const RequestDetails: React.FC = () => {
  const { readMessage } = useContext(AppContext);
  const { id } = useParams<{ id: string }>();

  const task = useTask(id);
  const navigate = useNavigate();
  const [decrypted, decrypt] = useDecryptedMessage(task);

  const decryptedTask = useMemo(() => decrypted && task && { ...decrypted, meta: task.meta }, [decrypted, task]);

  useEffect(() => {
    id && readMessage(id);
  }, [id, readMessage]);

  if (!decryptedTask) {
    return (
      <Dialog fullScreen open>
        <DialogHeader onClose={() => navigate('/attester/tasks', { replace: true })}>
          <Box sx={{ ...ellipsisMixin(), maxWidth: '80%' }}>{id}</Box>
        </DialogHeader>
        <Container component={DialogContent} maxWidth='lg' sx={{ background: 'transparent !important' }}></Container>
        <DialogActions>
          <Stack alignItems='center' direction='row' spacing={1.5}>
            <Button onClick={decrypt} variant='contained'>
              Decrypt to view
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Dialog fullScreen open>
      <DialogHeader onClose={() => navigate('/attester/tasks', { replace: true })}>
        <Box sx={{ ...ellipsisMixin(), maxWidth: '80%' }}>{id}</Box>
      </DialogHeader>
      <Container component={DialogContent} maxWidth='lg' sx={{ background: 'transparent !important' }}>
        <ClaimInfo showActions task={decryptedTask} />
        <Details contents={decryptedTask.data.credentialSubject} ctype={decryptedTask.data.ctype} />
      </Container>
      <DialogActions>
        <Stack alignItems='center' direction='row' spacing={1.5} sx={{ display: { md: 'none', xs: 'flex' } }}>
          {decryptedTask.meta.taskStatus === 'pending' && <Approve task={decryptedTask} />}
          {decryptedTask.meta.taskStatus === 'pending' && <Reject task={decryptedTask} />}
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default RequestDetails;
