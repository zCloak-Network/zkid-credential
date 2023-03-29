// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Box, styled } from '@mui/material';

import LoginProvider from './LoginProvider';
import Main from './Main';
import Splash from './Splash';

const Wrapper = styled(Box)({
  width: '100vw',
  height: '100vh'
});

const HkEvent = () => {
  return (
    <LoginProvider>
      <Wrapper>
        <Splash />
        <Main />
      </Wrapper>
    </LoginProvider>
  );
};

export default HkEvent;
