// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { alpha, Button, IconButton, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';

import { ImportCTypeModal } from '@credential/react-components';
import { useToggle } from '@credential/react-hooks';

const ImportCType: React.FC = () => {
  const [open, toggleOpen] = useToggle();
  const theme = useTheme();
  const downSm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      {downSm ? (
        <IconButton
          onClick={toggleOpen}
          sx={({ palette }) => ({
            backgroundColor: alpha(palette.primary.main, 0.2),
            ':hover': {
              backgroundColor: alpha(palette.primary.main, 0.35)
            }
          })}
        >
          <FileUploadOutlinedIcon />
        </IconButton>
      ) : (
        <Button
          onClick={toggleOpen}
          startIcon={<FileUploadOutlinedIcon />}
          sx={({ palette }) => ({
            borderRadius: 6,
            color: palette.primary.main,
            boxShadow: 'none',
            background: alpha(palette.primary.main, 0.2),
            ':hover': {
              boxShadow: 'none',
              background: alpha(palette.primary.main, 0.35)
            }
          })}
          variant="contained"
        >
          Import
        </Button>
      )}
      <ImportCTypeModal onClose={toggleOpen} open={open} />
    </>
  );
};

export default React.memo(ImportCType);
