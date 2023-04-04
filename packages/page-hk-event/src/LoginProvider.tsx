// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { createContext, PropsWithChildren } from 'react';

import { Did } from '@zcloak/did';

import { useLogin } from './hook/useLogin';

export interface WhiteProps {
  did: string;
  name?: string;
}

interface State {
  isLogged: boolean;
  logout: () => Promise<void>;
  login: (did?: Did) => Promise<void>;
  org?: WhiteProps;
  error?: Error;
}

export const LoginContext = createContext({} as State);

const LoginProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { error, isLogged, login, logout, org } = useLogin();

  return <LoginContext.Provider value={{ isLogged, error, org, login, logout }}>{children}</LoginContext.Provider>;
};

export default LoginProvider;
