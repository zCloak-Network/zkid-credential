// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DidUrl } from '@zcloak/did-resolver/types';
import type { AnyJson, RawCredential, VerifiableCredential } from '@zcloak/vc/types';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, Stack, Typography } from '@mui/material';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { Did, helpers } from '@zcloak/did';
import { Message } from '@zcloak/message/types';
import { Raw } from '@zcloak/vc';

import { CTYPE_ID, DEFAULT_ROOT_HASH_TYPE } from '@credential/app-config';
import { Button, CTypeContext, IconButton, InputString } from '@credential/react-components';
import { DidsContext } from '@credential/react-dids';
import { resolver } from '@credential/react-dids/instance';
import { encryptMessageStep, signAndBuildVC, Steps } from '@credential/react-dids/steps';

import { LoginContext } from './LoginProvider';

const Step1: React.FC<{ receiver: string; prev: () => void; retry: () => void }> = ({ prev, receiver, retry }) => {
  const { did: sender } = useContext(DidsContext);
  const [rawCredential, setRawCredential] = useState<RawCredential | null>(null);
  const { ctypes } = useContext(CTypeContext);
  const [vc, setVC] = useState<VerifiableCredential<boolean> | null>(null);
  const [holder, setHolder] = useState<Did>();
  const { org } = useContext(LoginContext);
  const [encryptedMessage, setEncryptedMessage] = useState<Message<'Send_issuedVC'>>();

  const ctype = useMemo(() => ctypes.filter((c) => c.$id === CTYPE_ID)[0], [ctypes]);

  useEffect(() => {
    if (!org) return;
    helpers.fromDid(receiver as DidUrl).then(setHolder);
  }, [org, receiver]);

  useEffect(() => {
    if (!ctype || !org) return;
    const contents: AnyJson = { Project: org?.name };

    const raw = new Raw({
      contents,
      owner: receiver as DidUrl,
      ctype,
      hashType: DEFAULT_ROOT_HASH_TYPE
    });

    setRawCredential(raw.toRawCredential());
  }, [ctype, org, receiver]);

  const sign = useCallback(async () => {
    if (!rawCredential) return;

    await signAndBuildVC(rawCredential, ctypes, sender).then(setVC);
  }, [rawCredential, ctypes, sender]);

  const send = useCallback(async () => {
    if (!encryptedMessage) return;
    await resolver.sendHkMessage(encryptedMessage);
  }, [encryptedMessage]);

  return (
    <Box height='100%' paddingX={2} position='relative'>
      <Stack alignItems='center' direction='row' paddingY={3}>
        <IconButton onClick={prev}>
          <ArrowBackIosIcon />
        </IconButton>
        <Typography fontSize={20} fontWeight={600}>
          Issue Verifiable Credential
        </Typography>
      </Stack>
      <Stack
        spacing={2}
        sx={{
          padding: '15px 12px',
          background: '#fff',
          borderRadius: '15px',
          boxShadow: '0px 0px 30px rgba(53,41,183,0.07)',

          '.MuiButtonBase-root': {
            width: '100%',
            height: 50,
            background: '#000',
            marginTop: '24px'
          },
          '.Issue_Again': {
            background: '#fff',
            marginTop: '12px'
          }
        }}
      >
        <InputString defaultValue={receiver} disabled label='receiver address' />
        <Steps
          onDone={prev}
          steps={[
            {
              label: 'Sign verifiable Credential',
              paused: true,
              exec: () => sign()
            },
            {
              label: 'Encrypt message',
              exec: () =>
                encryptMessageStep<'Send_issuedVC'>('Send_issuedVC', vc, sender, holder).then(setEncryptedMessage)
            },
            {
              label: 'Send message',
              exec: () => send()
            }
          ]}
        />

        <Button className='Issue_Again' onClick={retry} variant='outlined'>
          Issue Again
        </Button>
      </Stack>
    </Box>
  );
};

export default Step1;
