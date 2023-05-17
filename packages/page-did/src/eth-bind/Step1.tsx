// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ButtonEnableMetamask, Stack, Typography } from '@credential/react-components';

const Step1: React.FC<{ next: () => void }> = ({ next }) => {
  return (
    <Stack mt={5} spacing={6}>
      <Typography
        sx={({ palette }) => ({
          color: palette.grey[700]
        })}
        textAlign='center'
        variant='inherit'
      >
        Connect your common used Ethereum Address
      </Typography>
      <ButtonEnableMetamask onClick={next} onEnable={next} variant='contained'>
        Connect Wallet
      </ButtonEnableMetamask>
    </Stack>
  );
};

export default Step1;
