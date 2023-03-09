// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { IDidDetails } from '@zcloak/did/types';

import React, { useRef } from 'react';

import { alpha, Button, IdentityIcon, useMediaQuery, useTheme } from '@credential/react-components';
import { DidName } from '@credential/react-dids';
import { useToggle } from '@credential/react-hooks';

import DidMenu from './DidMenu';

interface Props {
  did: IDidDetails;
}

const AccountInfo: React.FC<Props> = ({ did }) => {
  const [open, toggleOpen] = useToggle();
  const anchorEl = useRef<HTMLButtonElement | null>(null);
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <>
      <Button
        endIcon={<IdentityIcon value={did.id} />}
        onClick={toggleOpen}
        ref={anchorEl}
        size={upMd ? 'medium' : 'small'}
        sx={({ palette }) => ({
          border: '1px solid',
          borderColor: alpha(palette.primary.main, 0.12),
          background: palette.common.white,
          borderRadius: 50,
          boxShadow: 'none',
          color: palette.text.primary,
          ':hover': {
            background: palette.common.white
          }
        })}
        variant='contained'
      >
        <DidName value={did.id} />
      </Button>
      <DidMenu anchorEl={anchorEl.current} did={did} onClose={toggleOpen} open={open} />
    </>
  );
};

export default React.memo(AccountInfo);
