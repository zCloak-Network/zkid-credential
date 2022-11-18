// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { createContext } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
type State = {};

export const AppContext = createContext({} as State);

// eslint-disable-next-line @typescript-eslint/ban-types
const AppProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

export default AppProvider;
