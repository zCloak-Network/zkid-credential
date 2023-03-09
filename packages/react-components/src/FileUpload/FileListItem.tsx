// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

export interface FileListItemProps {
  name: string;
  onDelete: () => void;
}

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5)
}));

function FileListItem({ name, onDelete }: FileListItemProps) {
  return (
    <ListItem>
      <Chip icon={<UploadFileIcon />} label={name} onDelete={onDelete} sx={{ maxWidth: 200 }} variant='outlined' />
    </ListItem>
  );
}

export default React.memo(FileListItem);
