// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DidRole } from '@credential/react-dids/types';

import React, { useMemo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import PageAccount from '@credential/page-account';
import PageCreateAccount from '@credential/page-account/Create';
import PageRestoreAccount from '@credential/page-account/Restore';
import PageClaims from '@credential/page-claims';
import PageCType from '@credential/page-ctype';
import AutoImport from '@credential/page-ctype/AutoImport';
import PageCreateCType from '@credential/page-ctype/create';
import PageOwnerCType from '@credential/page-ctype/OwnerCType';
import PageDidProfile from '@credential/page-did/DidProfile';
import Issue from '@credential/page-issue';
import PageMessage from '@credential/page-message';
import PageAttesterMessage from '@credential/page-message/attester';
import PageTasks from '@credential/page-tasks';
import PageRequestDetails from '@credential/page-tasks/RequestDetails';
import {
  AppProvider,
  Box,
  CTypeProvider,
  useMediaQuery,
  useTheme
} from '@credential/react-components';
import { DidsProvider } from '@credential/react-dids';

import Account from './Account';
import Attester from './Attester';
import Claimer from './Claimer';

const NoMatch: React.FC<{ to: string }> = ({ to }) => {
  return <Navigate replace to={to} />;
};

function Container({
  children,
  hasPaddingTop,
  hasPaddingX
}: {
  hasPaddingTop?: boolean;
  hasPaddingX?: boolean;
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const upSm = useMediaQuery(theme.breakpoints.up('sm'));

  const paddingT = useMemo(
    () =>
      hasPaddingTop ? (upMd ? theme.spacing(4) : upSm ? theme.spacing(3) : theme.spacing(2)) : 0,
    [hasPaddingTop, theme, upMd, upSm]
  );
  const paddingH = useMemo(
    () =>
      hasPaddingX ? (upMd ? theme.spacing(4) : upSm ? theme.spacing(3) : theme.spacing(2)) : 0,
    [hasPaddingX, theme, upMd, upSm]
  );

  return (
    <Box
      sx={{
        paddingBottom: '44px',
        paddingTop: paddingT,
        paddingX: paddingH
      }}
    >
      {children}
    </Box>
  );
}

function BaseProvider({ children, role }: { children: any; role: DidRole }) {
  return (
    <DidsProvider didRole={role}>
      <AppProvider>
        <CTypeProvider>{children}</CTypeProvider>
      </AppProvider>
    </DidsProvider>
  );
}

const createClaimerApp = () => (
  <Route
    element={
      <BaseProvider role="claimer">
        <Claimer />
      </BaseProvider>
    }
    path="claimer"
  >
    <Route path="did">
      <Route
        element={
          <Container>
            <PageDidProfile />
          </Container>
        }
        path="profile"
      />
    </Route>
    <Route path="ctype">
      <Route
        element={
          <Container hasPaddingTop hasPaddingX>
            <PageCType />
          </Container>
        }
        index
      />
      <Route element={<AutoImport />} path=":id/create-claim" />
    </Route>
    <Route
      element={
        <Container hasPaddingTop hasPaddingX>
          <PageClaims />
        </Container>
      }
      path="claims"
    />
    <Route
      element={
        <Container hasPaddingTop hasPaddingX>
          <PageMessage />
        </Container>
      }
      path="message"
    />
    <Route element={<NoMatch to="ctype" />} path="*" />
    <Route element={<NoMatch to="ctype" />} index />
  </Route>
);

const createAttesterApp = () => (
  <Route
    element={
      <BaseProvider role="attester">
        <Attester />
      </BaseProvider>
    }
    path="attester"
  >
    <Route path="did">
      <Route
        element={
          <Container>
            <PageDidProfile />
          </Container>
        }
        path="profile"
      />
    </Route>
    <Route path="ctypes">
      <Route
        element={
          <Container hasPaddingTop>
            <PageOwnerCType />
          </Container>
        }
        index
      />
      <Route
        element={
          <Container hasPaddingTop>
            <PageCreateCType />
          </Container>
        }
        path="create"
      />
    </Route>
    <Route path="tasks">
      <Route
        element={
          <Container hasPaddingTop>
            <PageTasks />
          </Container>
        }
        index
      />
      <Route
        element={
          <Container hasPaddingTop>
            <PageRequestDetails />
          </Container>
        }
        path=":id"
      />
    </Route>
    <Route path="issue">
      <Route
        element={
          <Container hasPaddingTop>
            <Issue />
          </Container>
        }
        index
      />
    </Route>
    <Route
      element={
        <Container hasPaddingTop>
          <PageAttesterMessage />
        </Container>
      }
      path="message"
    />
    <Route element={<NoMatch to="ctypes" />} path="*" />
    <Route element={<NoMatch to="ctypes" />} index />
  </Route>
);

const AppClaimer = createClaimerApp();
const AppAttester = createAttesterApp();

const App: React.FC = () => {
  return (
    <Routes>
      {AppClaimer}
      {AppAttester}
      <Route element={<Account />} path="account">
        <Route element={<PageCreateAccount />} path="create" />
        <Route element={<PageRestoreAccount />} path="restore" />
        <Route element={<PageAccount />} index />
      </Route>
      <Route element={<NoMatch to="/claimer" />} path="*" />
    </Routes>
  );
};

export default React.memo(App);
