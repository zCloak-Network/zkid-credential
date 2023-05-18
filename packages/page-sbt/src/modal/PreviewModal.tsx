// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Modal, useMediaQuery, useTheme } from '@mui/material';

import { SbtCard } from '@credential/react-components';

interface Props {
  open: boolean;
  attester: string;
  output: string;
  onClose: () => void;
}

function PreviewModal({ attester, onClose, open, output }: Props) {
  const theme = useTheme();
  const upSm = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Modal
      onClose={onClose}
      open={open}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <SbtCard attester={attester} multiply={upSm ? 2 : 1} output={output} />
    </Modal>
  );
}

export default PreviewModal;
