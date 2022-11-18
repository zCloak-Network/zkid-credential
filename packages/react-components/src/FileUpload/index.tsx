// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ButtonProps } from '@mui/material';
import type { SxProps, Theme } from '@mui/system';

import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { Box, Button, FormControl, FormHelperText } from '@mui/material';
import React from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';

import FileListItem from './FileListItem';

export interface FileUploadProps extends Omit<DropzoneOptions, 'onDrop' | 'onDropAccepted'> {
  sx?: SxProps<Theme>;
  buttonProps?: Omit<ButtonProps, 'onClick'>;
  buttonText?: string;
  value: File[];
  onChange: (files: File[]) => void;
}

function FileUpload({
  buttonProps,
  buttonText = 'Click or drop files',
  disabled,
  maxSize,
  onChange,
  sx,
  value,
  ...options
}: FileUploadProps) {
  const { fileRejections, getInputProps, getRootProps, open } = useDropzone({
    ...options,
    disabled,
    maxSize,
    onDropAccepted: onChange,
    noClick: true,
    noKeyboard: true
  });

  const isFileTooLarge =
    maxSize !== undefined && fileRejections.length > 0 && fileRejections[0].file.size > maxSize;

  const remove = (index: number) => {
    const files = [...value];

    files.splice(index, 1);
    onChange(files);
  };

  const files = value?.map((file, i) => (
    <FileListItem key={file.name} name={file.name} onDelete={() => remove(i)} />
  ));

  return (
    <Box
      {...getRootProps()}
      sx={{
        borderRadius: 1,
        paddingY: 3,
        paddingX: 1,
        minHeight: 160,
        background: '#F5F6FA',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        ...sx
      }}
    >
      <FormControl
        error={isFileTooLarge}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <input {...getInputProps()} />
        <Button
          disabled={disabled}
          onClick={open}
          startIcon={<FileUploadOutlinedIcon />}
          variant="contained"
          {...buttonProps}
        >
          {buttonText}
        </Button>
        <FormHelperText> {fileRejections[0]?.errors[0]?.message} </FormHelperText>
      </FormControl>
      {files.length > 0 && (
        <Box
          component="ul"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            listStyle: 'none',
            p: 0.5,
            m: 0
          }}
        >
          {files}
        </Box>
      )}
    </Box>
  );
}

export default React.memo(FileUpload);
