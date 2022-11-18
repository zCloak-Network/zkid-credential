// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DidRole } from '@credential/react-dids/types';

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { DidsContext } from '@credential/react-dids';

const AccountAuth: React.FC<React.PropsWithChildren<{ didRole: DidRole }>> = ({
  children,
  didRole
}) => {
  const { all } = useContext(DidsContext);

  return all.length > 0 ? (
    <>{children}</>
  ) : (
    <Navigate
      to={{
        pathname: '/account',
        search: `?redirect=${didRole}`
      }}
    />
  );
};

export default React.memo(AccountAuth);
