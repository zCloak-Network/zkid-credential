// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { IDidDetails } from '@zcloak/did/types';

import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { IconExport, IconScan, IconStar } from '@credential/app-config/icons';
import {
  alpha,
  Box,
  Button,
  Copy,
  Divider,
  IdentityIcon,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography
} from '@credential/react-components';
import { DidName, isLoginDid } from '@credential/react-dids';
import { useToggle } from '@credential/react-hooks';

import CredentialScanner from './CredentialScanner';
import ExportModal from './ExportModal';
import MultiDids from './MultiDids';

interface Props {
  did: IDidDetails;
  anchorEl: Element | null;
  open: boolean;
  onClose: () => void;
}

const DidMenu: React.FC<Props> = ({ anchorEl, did, onClose, open }) => {
  const [exportOpen, toggleExportOpen] = useToggle();
  const [scannerOpen, toggleScannerOpen] = useToggle();
  const [multiDidOpen, toggleMultiDid] = useToggle();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleScanner = useCallback(() => {
    toggleScannerOpen();
    onClose();
  }, [onClose, toggleScannerOpen]);

  const handleExport = useCallback(() => {
    toggleExportOpen();
    onClose();
  }, [onClose, toggleExportOpen]);

  const handleProfile = useCallback(() => {
    navigate(pathname.startsWith('/attester') ? '/attester/did/profile' : '/claimer/did/profile');
    onClose();
  }, [navigate, onClose, pathname]);

  const handleChange = useCallback(() => {
    toggleMultiDid();
    onClose();
  }, [onClose, toggleMultiDid]);

  return (
    <>
      <Menu
        MenuListProps={{
          sx: {
            fontSize: '1rem',
            '.MuiMenuItem-root,.MuiListItem-root': {
              paddingY: 1.5,
              paddingX: '5px'
            },
            '.MuiListItemIcon-root': {
              minWidth: '32px'
            }
          }
        }}
        anchorEl={anchorEl}
        onClose={onClose}
        open={open}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography fontWeight={500} variant='h6'>
            Did
          </Typography>
          <Button onClick={handleChange} size='small'>
            Change
          </Button>
        </Box>
        <ListItem
          sx={({ palette }) => ({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: 300,
            height: 72,
            paddingX: 3,
            marginTop: 1,
            borderRadius: 2.5,
            background: alpha(palette.primary.main, 0.2)
          })}
        >
          <ListItemIcon>
            <IdentityIcon value={did.id} />
          </ListItemIcon>
          <ListItemText primary={<DidName value={did.id} />} />
          <Copy value={did.id} />
        </ListItem>
        <Divider sx={{ marginTop: 3, marginBottom: 1 }} />
        <MenuItem onClick={handleScanner}>
          <ListItemIcon>
            <IconScan sx={{ fontSize: '0.875rem' }} />
          </ListItemIcon>
          <ListItemText>Scan QR code</ListItemText>
        </MenuItem>
        <Divider sx={{ marginY: 1 }} />
        <MenuItem onClick={handleProfile}>
          <ListItemIcon>
            <IconStar color='error' sx={{ fontSize: '0.875rem' }} />
          </ListItemIcon>
          <ListItemText>DID Profile</ListItemText>
        </MenuItem>
        {!isLoginDid(did) && (
          <MenuItem onClick={handleExport}>
            <ListItemIcon>
              <IconExport sx={{ fontSize: '0.875rem' }} />
            </ListItemIcon>
            <ListItemText>Export DID-Key</ListItemText>
          </MenuItem>
        )}
      </Menu>
      {exportOpen && <ExportModal did={did} onClose={toggleExportOpen} />}
      {scannerOpen && <CredentialScanner onClose={toggleScannerOpen} />}
      {multiDidOpen && <MultiDids onClose={toggleMultiDid} />}
    </>
  );
};

export default React.memo(DidMenu);
