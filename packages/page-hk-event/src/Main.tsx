// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useContext, useEffect } from 'react';

import { CTYPE_ID } from '@credential/app-config';
import { useAttestCTypes } from '@credential/page-ctype/useAttestCTypes';
import { CTypeContext } from '@credential/react-components';

import Login from './Login';
import { LoginContext } from './LoginProvider';
import Menu from './Menu';

const Main = () => {
  const { isLogged } = useContext(LoginContext);
  const ctypes = useAttestCTypes();
  const { importCType } = useContext(CTypeContext);

  useEffect(() => {
    const ctype = ctypes.filter((c) => c.$id === CTYPE_ID)[0];

    if (!ctype) {
      importCType(CTYPE_ID);
    }
  }, [importCType, ctypes]);

  return <>{isLogged ? <Menu /> : <Login />}</>;
};

export default Main;
