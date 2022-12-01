// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { HashRouter } from 'react-router-dom';

import {
  CssBaseline,
  NotificationProvider,
  StyledEngineProvider,
  ThemeProvider
} from '@credential/react-components';

import App from './App';

const Root: React.FC = () => {
  return (
    <HashRouter>
      <StyledEngineProvider injectFirst>
        <ThemeProvider>
          <CssBaseline />
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </HashRouter>
  );
};

export default Root;
