// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DecryptedTask } from '@credential/react-hooks/types';

import { Box, Button, Container, Dialog, DialogActions, DialogContent, Stack } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { AppContext, DialogHeader } from '@credential/react-components';
import { ellipsisMixin } from '@credential/react-components/utils';
import { DidsContext } from '@credential/react-dids';
import { useDecryptedMessage, useTask } from '@credential/react-hooks';

import Approve from './Approve';
import ClaimInfo from './ClaimInfo';
import Details from './Details';
import Reject from './Reject';

const RequestDetails: React.FC = () => {
  const { isLocked, unlock } = useContext(DidsContext);
  const { readMessage } = useContext(AppContext);
  const { id } = useParams<{ id: string }>();

  const task = useTask(id);
  const navigate = useNavigate();
  const decrypted: DecryptedTask | null = useDecryptedMessage(task);

  useEffect(() => {
    id && !isLocked && readMessage(id);
  }, [id, readMessage, isLocked]);

  if (!decrypted) {
    return (
      <Dialog fullScreen open>
        <Button onClick={unlock}>Unlock</Button>
      </Dialog>
    );
  }

  return (
    <Dialog fullScreen open>
      <DialogHeader onClose={() => navigate('/attester/tasks', { replace: true })}>
        <Box sx={{ ...ellipsisMixin(), maxWidth: '80%' }}>{id}</Box>
      </DialogHeader>
      <Container
        component={DialogContent}
        maxWidth="lg"
        sx={{ background: 'transparent !important' }}
      >
        <ClaimInfo showActions task={decrypted} />
        <Details contents={decrypted.data.credentialSubject} />
      </Container>
      <DialogActions>
        <Stack
          alignItems="center"
          direction="row"
          spacing={1.5}
          sx={{ display: { md: 'none', xs: 'flex' } }}
        >
          {decrypted.meta.taskStatus === 'pending' && <Approve task={decrypted} />}
          {decrypted.meta.taskStatus === 'pending' && <Reject task={decrypted} />}
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default RequestDetails;
