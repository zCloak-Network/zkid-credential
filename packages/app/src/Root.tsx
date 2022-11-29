// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React from 'react';
import { HashRouter } from 'react-router-dom';

import { NotificationProvider, ThemeProvider } from '@credential/react-components';

import App from './App';

const Root: React.FC = () => {
  return (
    <HashRouter>
      <StyledEngineProvider injectFirst>
        <ThemeProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CssBaseline />
            <NotificationProvider>
              <App />
            </NotificationProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </HashRouter>
  );
};

export default Root;
