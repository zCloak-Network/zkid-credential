// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DidUrl } from '@zcloak/did-resolver/types';
import type { RawCredential } from '@zcloak/vc/types';

import moment from 'moment';
import React, { useMemo } from 'react';

import { HexString } from '@zcloak/crypto/types';
import { isVC } from '@zcloak/vc/utils';

import { CredentialStatus } from '@credential/app-store/pending-credential';
import {
  Box,
  CredentialModal,
  CredentialStatusDisplay,
  CTypeName,
  Paper,
  Stack,
  styled,
  Tooltip,
  Typography
} from '@credential/react-components';
import { ellipsisMixin } from '@credential/react-components/utils';
import { DidName } from '@credential/react-dids';
import { useCTypeMeta, useToggle } from '@credential/react-hooks';
import { isMobile } from '@credential/react-hooks/utils/userAgent';

import DownloadButton from './button/DownloadButton';
import ImportButton from './button/ImportButton';
import QrcodeButton from './button/QrcodeButton';
import ShareButton from './button/ShareButton';

const Wrapper = styled(Paper)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(4),
  height: 211,
  borderRadius: theme.spacing(2.5),
  overflow: 'hidden',
  cursor: 'pointer',

  ':hover': {
    boxShadow: theme.shadows[3],

    '.CredentialCell_title': {
      transform: 'translate(90px, -40px)',
      fontSize: 18
    },
    '.CredentialCell_issuer': {
      transform: 'translate(0, -30px)'
    },
    '.CredentialCell_actions': {
      opacity: 1,
      transform: 'translateY(0)'
    },
    '.CredentialCell_Time': {
      opacity: 0
    }
  },
  '.CredentialCell_Status': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  '.CredentialCell_Time': {
    color: theme.palette.grey[500],
    opacity: isMobile ? 0 : 1
  },
  '.CredentialCell_title': {
    transformOrigin: 'top left',
    transform: isMobile ? 'translate(90px, -40px)' : null,
    fontSize: isMobile ? 18 : null,
    ...ellipsisMixin(),

    transition: theme.transitions.create(['transform', 'font-size'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  '.CredentialCell_issuer': {
    transformOrigin: 'top left',
    transform: isMobile ? 'translate(0, -30px)' : null,

    transition: theme.transitions.create(['transform'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  '.CredentialCell_actions': {
    right: theme.spacing(4),
    bottom: theme.spacing(4),
    position: 'absolute',
    textAlign: 'right',
    opacity: isMobile ? 1 : 0,
    transform: isMobile ? 'translateY(0)' : 'translateY(20px)',

    '.MuiButtonBase-root': {
      border: `1px solid ${theme.palette.grey[300]}`,
      borderRadius: `${theme.spacing(1.25)}`
    },

    transition: theme.transitions.create(['transform', 'opacity'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  }
}));

export interface CredentialProps {
  credential: RawCredential;
  rootHash: HexString;
  time: number;
  issuer: DidUrl;
  status: CredentialStatus;
}

function CredentialCell({ credential, issuer, rootHash, status, time }: CredentialProps) {
  const [open, toggleOpen] = useToggle();

  const vc = useMemo(() => (isVC(credential) ? credential : null), [credential]);

  const ctypeMeta = useCTypeMeta(vc?.ctype);

  return (
    <>
      <Box position="relative">
        <Box
          sx={({ palette }) => ({
            zIndex: 1,
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 4,
            height: '60%',
            margin: 'auto',
            borderTopRightRadius: 4,
            borderBottomRightRadius: 4,
            background:
              status === 'pending'
                ? palette.warning.main
                : status === 'rejected'
                ? palette.error.main
                : palette.success.main
          })}
        />
        <Wrapper
          onClick={toggleOpen}
          sx={
            ctypeMeta?.card
              ? {
                  background: `url(${ctypeMeta.card}) no-repeat, #fff`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  color: ctypeMeta?.color
                }
              : {}
          }
        >
          <Box className="CredentialCell_Status">
            <CredentialStatusDisplay showText status={status} />
            <Typography className="CredentialCell_Time" variant="inherit">
              {moment(time).format('YYYY-MM-DD HH:mm:ss')}
            </Typography>
          </Box>
          <Typography className="CredentialCell_title" mt={2} variant="h3">
            <CTypeName cTypeHash={credential.ctype} />
          </Typography>
          <Stack
            className="CredentialCell_issuer"
            direction="row"
            justifyContent="space-between"
            mt={2}
            spacing={1}
          >
            <Box width="50%">
              <Typography sx={({ palette }) => ({ color: palette.grey[500] })} variant="inherit">
                Attested by
              </Typography>
              <Tooltip placement="top" title={issuer}>
                <Typography sx={{ fontWeight: 500, ...ellipsisMixin() }}>
                  <DidName value={issuer} />
                </Typography>
              </Tooltip>
            </Box>
            <Box width="50%">
              <Typography sx={({ palette }) => ({ color: palette.grey[500] })} variant="inherit">
                {vc ? 'Digest' : 'Claim hash'}
              </Typography>
              <Tooltip placement="top" title={vc ? vc.digest : rootHash}>
                <Typography sx={{ fontWeight: 500, ...ellipsisMixin() }}>
                  {vc ? vc.digest : rootHash}
                </Typography>
              </Tooltip>
            </Box>
          </Stack>
          {vc && (
            <Stack
              className="CredentialCell_actions"
              direction="row-reverse"
              display="inline-flex"
              mt={2}
              onClick={(e) => e.stopPropagation()}
              spacing={1}
            >
              <ImportButton credential={vc} />
              <ShareButton credential={vc} />
              <DownloadButton credential={vc} />
              {/* <RetweetButton credential={vc} /> */}
              <QrcodeButton credential={vc} />
            </Stack>
          )}
        </Wrapper>
      </Box>
      {vc && open && <CredentialModal credential={vc} onClose={toggleOpen} />}
    </>
  );
}

export default React.memo(CredentialCell);
