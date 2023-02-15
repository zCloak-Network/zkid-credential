// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Dialog, Typography } from '@mui/material';
import { Box } from '@mui/system';

import { BacDownloadzkid } from '@credential/app-config/images';
import { Button, DialogHeader } from '@credential/react-components';

const WalletNotInstall: React.FC<{ open: boolean; onClose: () => void }> = ({ onClose, open }) => {
  return (
    <Dialog
      onClose={onClose}
      open={open}
      sx={{
        '.MuiPaper-root': {
          overflowY: 'visible',
          borderRadius: '10px',
          zIndex: 1
        }
      }}
    >
      <DialogHeader onClose={onClose} />
      <Box sx={{ width: '500px', height: '300px', paddingTop: '120px' }}>
        <Box
          sx={{
            position: 'absolute',
            zIndex: -1,
            top: '-65px',
            img: {
              width: '100%'
            }
          }}
        >
          <img src={BacDownloadzkid} />
        </Box>
        <Typography component="h4" fontSize={20} fontWeight={500} mb={2} textAlign="center">
          zkID Wallet Not Installed
        </Typography>
        <Typography color="#666" fontSize={14} mb={4} textAlign="center">
          Please download zkID Wallet.
        </Typography>
        <Box
          sx={{
            width: '400px',
            margin: '0 auto'
          }}
        >
          <Button
            onClick={() => {
              window.open(
                'https://chrome.google.com/webstore/detail/zkid-wallet/ahkpfejaeoepmfopmbhjgjekibmfcfgo'
              );
            }}
            sx={{
              width: '100%'
            }}
            variant="contained"
          >
            DownLoad
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default WalletNotInstall;
