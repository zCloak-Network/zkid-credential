// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { SbtResult } from './types';

import { alpha, Container, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { zkConfig } from '@credential/app-config';
import { Credential, getCredential } from '@credential/app-store';
import { ThemeProvider } from '@credential/react-components';
import { provider } from '@credential/react-dids/instance';

import Computation from './Computation';
import CredentialDetails from './CredentialDetails';
import Mint from './Mint';
import Top from './Top';
import ZkProgram from './ZkProgram';

const PageSbt: React.FC<{ isTest: boolean }> = ({ isTest }) => {
  const { digest } = useParams();
  const navigate = useNavigate();
  const [credential, setCredential] = useState<Credential>();
  const [selectIndex, setSelectIndex] = useState<number>();
  const [result, setResult] = useState<SbtResult>();

  const config = credential ? zkConfig[credential.ctype] : undefined;

  useEffect(() => {
    digest &&
      getCredential(digest).then((credential) => {
        if (credential) {
          setCredential(credential);
        } else {
          navigate('/');
        }
      });
  }, [digest, navigate]);

  useEffect(() => {
    const didChanged = () => {
      setResult(undefined);
      navigate('/claimer/claims');
    };

    provider?.on('did_changed', didChanged);

    return () => {
      provider?.off('did_changed', didChanged);
    };
  }, [navigate]);

  return credential ? (
    <ThemeProvider
      custom={{
        palette: {
          primary: {
            main: '#0042F1',
            light: '#0042F1',
            dark: '#0042F1',
            contrastText: '#fff'
          },
          secondary: {
            main: alpha('#0042F1', 0.1),
            light: alpha('#0042F1', 0.1),
            dark: alpha('#0042F1', 0.1),
            contrastText: '#0042F1'
          }
        }
      }}
    >
      {result ? (
        <Mint onCancel={() => setResult(undefined)} result={result} vc={credential.vc} />
      ) : (
        <>
          <Top isTest={isTest} />
          <Container maxWidth='xl'>
            <CredentialDetails status='approved' vc={credential.vc} />
            <Divider sx={{ marginY: '50px', borderColor: '#EBEAED' }} />
            <ZkProgram config={config || []} onSelect={setSelectIndex} selectIndex={selectIndex} vc={credential.vc} />
            <Computation onSuccess={setResult} program={config?.[selectIndex ?? -1]} vc={credential.vc} />
          </Container>
        </>
      )}
    </ThemeProvider>
  ) : (
    <></>
  );
};

export default PageSbt;
