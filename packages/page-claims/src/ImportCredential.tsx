// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import React from 'react';

import {
  alpha,
  Button,
  IconButton,
  ImportCredentialModal,
  useMediaQuery,
  useTheme
} from '@credential/react-components';
import { useToggle } from '@credential/react-hooks';

const ImportCredential: React.FC = () => {
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
          Import Credential
        </Button>
      )}
      {open && <ImportCredentialModal onClose={toggleOpen} open={open} />}
    </>
  );
};

export default React.memo(ImportCredential);
