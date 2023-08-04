// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DidUrl } from '@zcloak/did-resolver/types';
import type { RawCredential } from '@zcloak/vc/types';

import moment from 'moment';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { isVC } from '@zcloak/vc/is';

import { zkConfig } from '@credential/app-config';
import { CredentialStatus } from '@credential/app-store/pending-credential';
import {
  Box,
  Button,
  CredentialModal,
  CredentialStatusDisplay,
  CTypeName,
  Divider,
  IdentityIcon,
  Paper,
  Stack,
  styled,
  Tooltip,
  Typography
} from '@credential/react-components';
import { alpha, ellipsisMixin } from '@credential/react-components/utils';
import { DidName } from '@credential/react-dids';
import { useCTypeMeta, useToggle } from '@credential/react-hooks';
import { isMobile } from '@credential/react-hooks/utils/userAgent';

import DownloadButton from './button/DownloadButton';
import ImportButton from './button/ImportButton';
import QrcodeButton from './button/QrcodeButton';
import ShareButton from './button/ShareButton';

const Wrapper = styled(Paper)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(2.5),
  height: 282,
  borderRadius: theme.spacing(2.5),
  overflow: 'hidden',
  cursor: 'pointer',

  ':hover': {
    boxShadow: theme.shadows[3],

    '.CredentialCell_actions': {
      opacity: 1,
      transform: 'translateY(0)'
    }
  },
  '.CredentialCell_action_status': {
    position: 'relative'
  },
  '.CredentialCell_Status': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transform: isMobile ? 'translateY(40px)' : undefined
  },
  '.CredentialCell_Time': {
    color: theme.palette.grey[500],
    textAlign: 'right'
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
    bottom: 0,
    right: 0,
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
  credential: Omit<RawCredential, 'credentialSubject'> | RawCredential;
  messageId?: string;
  time: number;
  issuer: DidUrl;
  status: CredentialStatus;
}

function CredentialCell({ credential, issuer, messageId, status, time }: CredentialProps) {
  const [open, toggleOpen] = useToggle();
  const vc = useMemo(() => (isVC(credential) ? credential : null), [credential]);
  const ctypeMeta = useCTypeMeta(vc?.ctype);
  const hasProgram = !!zkConfig[vc?.ctype || ''];
  const navigate = useNavigate();

  return (
    <>
      <Box position='relative'>
        <Wrapper
          onClick={toggleOpen}
          sx={
            ctypeMeta?.card
              ? {
                  background: `url(${ctypeMeta.card}) no-repeat, #fff`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  color: ctypeMeta?.color,
                  ':hover': {
                    '.CredentialCell_Status': {
                      opacity: vc ? 0 : 1
                    }
                  }
                }
              : {
                  ':hover': {
                    '.CredentialCell_Status': {
                      opacity: vc ? 0 : 1
                    }
                  }
                }
          }
        >
          <Typography className='CredentialCell_title' mt={0} variant='h3'>
            <CTypeName cTypeHash={credential.ctype} />
          </Typography>
          <Stack
            alignItems='center'
            className='CredentialCell_issuer'
            direction='row'
            justifyContent='space-between'
            mb={2.5}
            mt={2}
            spacing={1}
          >
            <Box width='50%'>
              <Typography sx={({ palette }) => ({ color: palette.grey[500] })} variant='inherit'>
                {vc ? 'Digest' : 'Message id'}
              </Typography>
              <Tooltip placement='top' title={vc ? vc.digest : messageId}>
                <Typography sx={{ fontWeight: 500, ...ellipsisMixin() }}>{vc ? vc.digest : messageId}</Typography>
              </Tooltip>
            </Box>
            <Stack alignItems='center' className='CredentialCell_action_status'>
              <Box className='CredentialCell_Status'>
                <CredentialStatusDisplay showText status={status} />
              </Box>

              {vc && (
                <Stack
                  className='CredentialCell_actions'
                  direction='row-reverse'
                  display='inline-flex'
                  mt={2}
                  onClick={(e) => e.stopPropagation()}
                  spacing={1}
                >
                  <ShareButton credential={vc} />
                  <DownloadButton credential={vc} />
                  {/* <RetweetButton credential={vc} /> */}
                  <QrcodeButton credential={vc} />
                </Stack>
              )}
            </Stack>
          </Stack>
          <Divider
            sx={({ palette }) => ({
              borderColor: alpha(palette.grey[300], 0.3)
            })}
          />
          <Stack alignItems='end' direction='row' justifyContent='space-between' mb={2.5} mt={2.5}>
            <Stack alignItems='center' direction='row' spacing={1}>
              <IdentityIcon diameter={40} value={issuer} />
              <Box>
                <Typography sx={({ palette }) => ({ color: palette.grey[500] })} variant='inherit'>
                  Attested by
                </Typography>
                <Tooltip placement='top' title={issuer}>
                  <Typography sx={{ fontWeight: 500, ...ellipsisMixin() }}>
                    <DidName value={issuer} />
                  </Typography>
                </Tooltip>
              </Box>
            </Stack>
            <Box>
              <Typography className='CredentialCell_Time' variant='inherit'>
                {moment(time).format('YYYY-MM-DD HH:mm:ss')}
              </Typography>
            </Box>
          </Stack>

          {vc ? (
            hasProgram ? (
              <Button
                fullWidth
                onClick={() => navigate(`/sbtdemo/${vc.digest}`)}
                sx={({ spacing }) => ({
                  height: spacing(4.5),
                  borderRadius: spacing(1),
                  fontSize: spacing(1.5)
                })}
                variant='contained'
              >
                Mint SBT
              </Button>
            ) : (
              <ImportButton credential={vc} />
            )
          ) : (
            <></>
          )}
        </Wrapper>
      </Box>
      {vc && open && <CredentialModal credential={vc} onClose={toggleOpen} />}
    </>
  );
}

export default React.memo(CredentialCell);
