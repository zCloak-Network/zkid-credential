// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useContext } from 'react';

import Login from './Login';
import { LoginContext } from './LoginProvider';
import Menu from './Menu';

const Main = () => {
  const { isLogged } = useContext(LoginContext);

  return <>{isLogged ? <Menu /> : <Login />}</>;
};

export default Main;
