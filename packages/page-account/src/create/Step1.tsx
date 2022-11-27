// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Box, Button, Stack } from '@mui/material';
import React, { useCallback, useState } from 'react';

import { InputPassword } from '@credential/react-components';

const Step1: React.FC<{ onConfirm: (password: string) => void }> = ({ onConfirm }) => {
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();

  const toggleConfirm = useCallback(() => {
    password && onConfirm(password);
  }, [onConfirm, password]);

  return (
    <>
      <Stack spacing={2} width="100%">
        <InputPassword label="Enter password" onChange={setPassword} withBorder />
        <InputPassword label="Confirm password" onChange={setConfirmPassword} withBorder />
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
