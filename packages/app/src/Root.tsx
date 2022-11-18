// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React from 'react';
import { HashRouter } from 'react-router-dom';

import {
  AppProvider,
  CTypeProvider,
  NotificationProvider,
  ThemeProvider,
  ZkidExtensionProvider
} from '@credential/react-components';
import { DidsProvider } from '@credential/react-dids';

import App from './App';

const Root: React.FC = () => {
  return (
    <HashRouter>
      <StyledEngineProvider injectFirst>
        <ThemeProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <NotificationProvider>
              <DidsProvider>
                <AppProvider>
                  <ZkidExtensionProvider>
                    <CTypeProvider>
                      <CssBaseline />
                      <App />
                    </CTypeProvider>
                  </ZkidExtensionProvider>
                </AppProvider>
              </DidsProvider>
            </NotificationProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </HashRouter>
  );
};

export default Root;
