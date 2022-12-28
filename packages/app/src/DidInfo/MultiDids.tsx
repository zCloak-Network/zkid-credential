// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Did } from '@zcloak/did';

import DoneIcon from '@mui/icons-material/Done';
import React, { useCallback, useContext, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { IconCopy, IconCreate, IconDelete, IconImportDid } from '@credential/app-config/icons';
import {
  alpha,
  ButtonWallet,
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
import { didManager } from '@credential/react-dids/instance';
import { useCopyClipboard } from '@credential/react-hooks';

function DidCell({ active, did, onClose }: { active?: boolean; did: Did; onClose: () => void }) {
  const [isCopy, copy] = useCopyClipboard();

  const handleClick = useCallback(() => {
    didManager.setCurrent(did);
    onClose();
  }, [did, onClose]);

  const handleCopy = useCallback(() => {
    copy(did.id);
  }, [copy, did.id]);

  const handleDelete = useCallback(() => {
    didManager.remove(did.id);
  }, [did.id]);

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
          <IconButton onClick={handleCopy} size="small">
            {isCopy ? <DoneIcon /> : <IconCopy />}
          </IconButton>
          <IconButton onClick={handleDelete} size="small">
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

  const localDids = useMemo(() => all.filter((did) => !isLoginDid(did)), [all]);
  const loginDid = useMemo(() => all.find(isLoginDid), [all]);

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
          {loginDid ? (
            <DidCell active={loginDid === did} did={loginDid} key={loginDid.id} onClose={onClose} />
          ) : (
            <ButtonWallet fullWidth variant="contained" />
          )}
          {localDids.map((item) => (
            <DidCell active={item === did} did={item} key={item.id} onClose={onClose} />
          ))}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default React.memo(MultiDids);
