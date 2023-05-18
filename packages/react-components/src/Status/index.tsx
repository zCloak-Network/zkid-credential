// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import { IconFalied, IconSuccess } from '@credential/app-config';

export const Loading = () => {
  return (
    <>
      <CircularProgress />
      <Typography color='#8F95B2'>Pending...</Typography>
    </>
  );
};

export const Failed: React.FC<{ message?: string }> = ({ message }) => {
  return (
    <>
      <IconFalied fontSize='inherit' />
      <Typography color='#8F95B2'>{message}</Typography>
    </>
  );
};

export const Success = () => {
  return (
    <>
      <IconSuccess fontSize='inherit' />
      <Typography color='#8F95B2'>Success!</Typography>
    </>
  );
};
