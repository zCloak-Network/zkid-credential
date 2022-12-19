// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import React from 'react';

import {
  alpha,
  Button,
  IconButton,
  ImportCTypeModal,
  useMediaQuery,
  useTheme
} from '@credential/react-components';
import { useToggle } from '@credential/react-hooks';

function ImportCType({ variant }: { variant?: 'text' | 'outlined' | 'contained' }) {
  const [open, toggleOpen] = useToggle();
  const theme = useTheme();
  const downSm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      {downSm ? (
        <IconButton color="primary" onClick={toggleOpen}>
          <FileUploadOutlinedIcon />
        </IconButton>
      ) : (
        <Button
          onClick={toggleOpen}
          startIcon={<FileUploadOutlinedIcon />}
          sx={({ palette }) =>
            variant === 'contained'
              ? {
                  borderRadius: 6,
                  color: palette.primary.main,
                  boxShadow: 'none',
                  background: alpha(palette.primary.main, 0.2),
                  ':hover': {
                    boxShadow: 'none',
                    background: alpha(palette.primary.main, 0.35)
                  }
                }
              : {
                  borderRadius: 6
                }
          }
          variant={variant}
        >
          Import
        </Button>
      )}
      <ImportCTypeModal onClose={toggleOpen} open={open} />
    </>
  );
}

export default React.memo(ImportCType);
