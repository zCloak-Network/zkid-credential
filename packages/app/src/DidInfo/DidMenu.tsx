// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { IDidDetails } from '@zcloak/did/types';

import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { IconExport, IconLogout, IconScan, IconStar } from '@credential/app-config/icons';
import {
  alpha,
  Box,
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
import { DidName } from '@credential/react-dids';
import { didManager } from '@credential/react-dids/instance';
import { useToggle } from '@credential/react-hooks';

import CredentialScanner from './CredentialScanner';
import ExportModal from './ExportModal';

interface Props {
  did: IDidDetails;
  anchorEl: Element | null;
  open: boolean;
  onClose: () => void;
}

const DidMenu: React.FC<Props> = ({ anchorEl, did, onClose, open }) => {
  const [exportOpen, toggleExportOpen] = useToggle();
  const [scannerOpen, toggleScannerOpen] = useToggle();
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

  const handleLogout = useCallback(() => {
    if (!did) return;
    didManager.remove(did.id);
  }, [did]);

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
          <Typography fontWeight={500} variant="h6">
            Did
          </Typography>
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
            <IconScan />
          </ListItemIcon>
          <ListItemText>Scan QR code</ListItemText>
        </MenuItem>
        <Divider sx={{ marginY: 1 }} />
        <MenuItem onClick={handleProfile}>
          <ListItemIcon>
            <IconStar color="error" />
          </ListItemIcon>
          <ListItemText>DID Profile</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleExport}>
          <ListItemIcon>
            <IconExport />
          </ListItemIcon>
          <ListItemText>Export DID-Key</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <IconLogout />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
      {exportOpen && <ExportModal did={did} onClose={toggleExportOpen} />}
      {scannerOpen && <CredentialScanner onClose={toggleScannerOpen} />}
    </>
  );
};

export default React.memo(DidMenu);
