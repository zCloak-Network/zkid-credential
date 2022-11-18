// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Box, Button, FormControl, InputLabel, Stack } from '@mui/material';
import React, { useCallback, useState } from 'react';

import { InputPassword } from '@credential/react-components';

const Step1: React.FC<{ onConfirm: (password: string) => void }> = ({ onConfirm }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const toggleConfirm = useCallback(() => {
    onConfirm(password);
  }, [onConfirm, password]);

  return (
    <>
      <Stack spacing={2} width="100%">
        <FormControl fullWidth variant="outlined">
          <InputLabel shrink>Enter password</InputLabel>
          <InputPassword onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        <FormControl fullWidth variant="outlined">
          <InputLabel shrink>Confirm password</InputLabel>
          <InputPassword onChange={(e) => setConfirmPassword(e.target.value)} />
        </FormControl>
      </Stack>
      <Box sx={{ textAlign: 'right', width: '100%' }}>
        <Button disabled={password !== confirmPassword} onClick={toggleConfirm} variant="contained">
          Create
        </Button>
      </Box>
    </>
  );
};

export default React.memo(Step1);
