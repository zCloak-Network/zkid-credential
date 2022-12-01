// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useState } from 'react';

import { CredentialSubject } from '@zcloak/vc/types';

import { Box, Button, ClaimDisplay, Container, Stack } from '@credential/react-components';

interface Props {
  contents: CredentialSubject;
}

const Details: React.FC<Props> = ({ contents }) => {
  const [active, setActive] = useState<number>(0);

  return (
    <Box mt={3}>
      <Stack direction="row" justifyContent="center" spacing={2}>
        <Button
          onClick={() => setActive(0)}
          sx={({ palette }) => ({ color: active === 0 ? undefined : palette.grey[700] })}
        >
          Basic Info
        </Button>
        <Button
          onClick={() => setActive(1)}
          sx={({ palette }) => ({ color: active === 1 ? undefined : palette.grey[700] })}
        >
          History Record
        </Button>
      </Stack>
      <Box
        sx={({ palette }) => ({
          background: palette.common.white,
          paddingX: { xs: 2, sm: 4, md: 6, lg: 8 },
          paddingY: { xs: 2, sm: 4 }
        })}
      >
        {active === 0 && (
          <Container maxWidth="sm">
            <ClaimDisplay contents={contents} />
          </Container>
        )}
        {/* message history */}
      </Box>
    </Box>
  );
};

export default React.memo(Details);
