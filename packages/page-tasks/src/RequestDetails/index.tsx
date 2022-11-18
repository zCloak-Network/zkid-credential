// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Box, Container, Dialog, DialogActions, DialogContent, Stack } from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { DialogHeader } from '@credential/react-components';
import { ellipsisMixin } from '@credential/react-components/utils';
import { useTask } from '@credential/react-hooks';

import Approve from './Approve';
import ClaimInfo from './ClaimInfo';
import Details from './Details';
import Reject from './Reject';

const RequestDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const task = useTask(id);
  const navigate = useNavigate();

  if (!task) {
    return <Dialog fullScreen open></Dialog>;
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
        <ClaimInfo showActions task={task} />
        <Details contents={task.data.credentialSubject} />
      </Container>
      <DialogActions>
        <Stack
          alignItems="center"
          direction="row"
          spacing={1.5}
          sx={{ display: { md: 'none', xs: 'flex' } }}
        >
          {task.status === 'pending' && <Approve task={task} />}
          {task.status === 'pending' && <Reject task={task} />}
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default RequestDetails;
