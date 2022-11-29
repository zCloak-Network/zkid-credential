// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CTypeMeta } from '@credential/app-config/ctypes/type';
import type { CType } from '@credential/app-store';

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { alpha, Box, IconButton, Paper, Stack, styled, Tooltip, Typography } from '@mui/material';
import React, { useCallback, useContext } from 'react';

import { IconLogoCircle } from '@credential/app-config/icons';
import { Copy, CTypeContext } from '@credential/react-components';
import { ellipsisMixin } from '@credential/react-components/utils';
import { DidName } from '@credential/react-dids';
import { isMobile } from '@credential/react-hooks/utils/userAgent';

interface Props {
  ctype: CType;
  meta?: CTypeMeta;
  actions?: React.ReactNode;
}

const Wrapper = styled(Paper)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(4),
  height: 240,
  borderRadius: theme.spacing(2.5),

  ':hover': {
    boxShadow: theme.shadows[3],

    '.CTypeCard_logo': {
      transform: 'scale(0.8)'
    },

    '.CTypeCard_title': {
      transform: 'translate(60px, -62px) scale(0.8)'
    },
    '.CTypeCard_attester': {
      transform: 'translate(0, -50px)'
    },
    '.CTypeCard_actions': {
      opacity: 1,
      transform: 'translateY(0)'
    }
  },
  '.CTypeCard_logo': {
    width: 60,
    height: 60,
    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
    borderRadius: 30,
    padding: theme.spacing(0.5),
    transformOrigin: 'top left',
    transform: isMobile ? 'scale(0.8)' : null,

    transition: theme.transitions.create(['transform'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),

    '>svg': {
      width: '100%',
      height: '100%'
    }
  },
  '.CTypeCard_title': {
    transformOrigin: 'top left',
    transform: isMobile ? 'translate(60px, -62px) scale(0.8)' : null,
    ...ellipsisMixin(),

    transition: theme.transitions.create(['transform'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  '.CTypeCard_attester': {
    transformOrigin: 'top left',
    transform: isMobile ? 'translate(0, -50px)' : null,

    transition: theme.transitions.create(['transform'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  '.CTypeCard_actions': {
    left: theme.spacing(4),
    right: theme.spacing(4),
    bottom: theme.spacing(4),
    position: 'absolute',
    textAlign: 'center',
    opacity: isMobile ? 1 : 0,
    transform: isMobile ? 'translateY(0)' : 'translateY(20px)',

    transition: theme.transitions.create(['transform', 'opacity'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  }
}));

function CTypeCard({ actions, ctype, meta }: Props) {
  const { deleteCType } = useContext(CTypeContext);

  const handleDelete = useCallback(() => {
    deleteCType(ctype.$id);
  }, [ctype.$id, deleteCType]);

  return (
    <Wrapper
      sx={
        meta?.card
          ? {
              background: `url(${meta.card}) no-repeat, #fff`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }
          : {}
      }
    >
      <IconButton
        onClick={handleDelete}
        size="small"
        sx={{ position: 'absolute', right: 10, top: 10 }}
      >
        <DeleteOutlineOutlinedIcon />
      </IconButton>
      <Stack spacing={1.5}>
        <Box className="CTypeCard_logo">
          {meta?.icon ? (
            <Box component="img" src={meta.icon} sx={{ width: 50, height: 50 }} />
          ) : (
            <IconLogoCircle />
          )}
        </Box>
        <Tooltip title={ctype.title}>
          <Typography className="CTypeCard_title" variant="h3">
            {ctype.title}
          </Typography>
        </Tooltip>
        <Stack className="CTypeCard_attester" direction="row" justifyContent="space-between">
          <Box width="50%">
            <Typography sx={({ palette }) => ({ color: palette.grey[600] })} variant="inherit">
              Publisher
            </Typography>
            <Tooltip placement="top" title={ctype.publisher ?? ''}>
              <Typography sx={{ fontWeight: 500, ...ellipsisMixin() }}>
                <DidName value={ctype.publisher} />
              </Typography>
            </Tooltip>
          </Box>
          <Box width="50%">
            <Typography sx={({ palette }) => ({ color: palette.grey[600] })} variant="inherit">
              Hash
            </Typography>
            <Stack direction="row" spacing={1}>
              <Tooltip placement="top" title={ctype.$id ?? ''}>
                <Typography sx={{ fontWeight: 500, ...ellipsisMixin() }}>{ctype.$id}</Typography>
              </Tooltip>
              <Copy value={ctype.$id} />
            </Stack>
          </Box>
        </Stack>
        <Box className="CTypeCard_actions">{actions}</Box>
      </Stack>
    </Wrapper>
  );
}

export default React.memo(CTypeCard);
