// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Did } from '@zcloak/did';

import React, { useCallback, useContext, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  IconCopy,
  IconCreate,
  IconDelete,
  IconExport,
  IconImportDid
} from '@credential/app-config/icons';
import {
  alpha,
  Chip,
  Dialog,
  DialogContent,
  DialogHeader,
  IconButton,
  IdentityIcon,
  lighten,
  Stack,
  Typography
} from '@credential/react-components';
import { DidName, DidsContext, isLoginDid } from '@credential/react-dids';

function DidCell({ active, did }: { active?: boolean; did: Did }) {
  const { switchDid } = useContext(DidsContext);

  const handleClick = useCallback(() => {
    switchDid(did);
  }, [did, switchDid]);

  const isLogin = useMemo(() => isLoginDid(did), [did]);

  return (
    <Stack
      alignItems="center"
      direction="row"
      justifyContent="space-between"
      onClick={handleClick}
      sx={({ palette }) => ({
        paddingX: 2.5,
        paddingY: 1,
        borderRadius: 2,
        height: 56,
        background: active ? alpha(palette.primary.main, 0.2) : lighten(palette.primary.main, 0.9),
        border: '1px solid',
        borderColor: active ? palette.primary.main : 'transparent',
        cursor: 'pointer',
        ':hover': {
          borderColor: palette.primary.main
        }
      })}
    >
      <Stack alignItems="center" direction="row" spacing={1.5}>
        <IdentityIcon diameter={24} value={did.id} />
        <Typography>
          <DidName value={did.id} />
        </Typography>
        <Chip
          color={isLogin ? 'success' : 'primary'}
          label={isLogin ? 'zkID Wallet' : 'Local'}
          size="small"
        />
      </Stack>
      {!active && !isLogin && (
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
          sx={({ palette }) => ({
            '.MuiIconButton-root': {
              borderRadius: 2.5,
              background: lighten(palette.primary.main, 0.98)
            }
          })}
        >
          <IconButton size="small">
            <IconExport />
          </IconButton>
          <IconButton size="small">
            <IconCopy />
          </IconButton>
          <IconButton size="small">
            <IconDelete />
          </IconButton>
        </Stack>
      )}
    </Stack>
  );
}

function MultiDids({ onClose }: { onClose: () => void }) {
  const location = useLocation();
  const { all, did } = useContext(DidsContext);
  const navigate = useNavigate();

  return (
    <Dialog maxWidth="sm" onClose={onClose} open>
      <DialogHeader onClose={onClose}>Manage DID Account</DialogHeader>
      <DialogContent>
        <Stack direction="row" justifyContent="center" spacing={7}>
          <Stack spacing={1}>
            <IconButton
              color="primary"
              onClick={() =>
                navigate({
                  pathname: '/account/restore',
                  search: `?redirect=${location.pathname}`
                })
              }
            >
              <IconImportDid />
            </IconButton>
            <Typography color="primary.main">Import</Typography>
          </Stack>
          <Stack spacing={1}>
            <IconButton
              color="primary"
              onClick={() =>
                navigate({
                  pathname: '/account/create',
                  search: `?redirect=${location.pathname}`
                })
              }
            >
              <IconCreate />
            </IconButton>
            <Typography color="primary.main">Create</Typography>
          </Stack>
        </Stack>
        <Stack mt={4} spacing={1}>
          {all.map((item) => (
            <DidCell active={item === did} did={item} key={item.id} />
          ))}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default React.memo(MultiDids);
