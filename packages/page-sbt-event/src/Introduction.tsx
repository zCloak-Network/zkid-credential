// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Divider, Stack, Typography } from '@mui/material';

import Title from './Title';

interface Props {
  value: string;
  label: string;
}

const Item: React.FC<Props> = ({ label, value }) => {
  return (
    <Stack>
      <Typography fontSize='1.5rem' fontWeight={600}>
        {value}
      </Typography>
      <Typography color='#8A7F7B' fontSize='1.125rem' fontWeight={400}>
        {label}
      </Typography>
    </Stack>
  );
};

const Introduction = () => {
  return (
    <>
      <Title value='Introduction' />
      <Typography color='#333' fontSize={18} lineHeight='30px' mt={4}>
        As blockchain compliance and regulatory mechanisms continue to develop, the demand for personal information in
        on-chain applications is becoming increasingly strong. How to allow on-chain project parties to understand the
        compliance status of users without revealing any personal information has become an urgent issue to be resolved
        in the web3 world.
      </Typography>
      <Typography color='#333' fontSize={18} lineHeight='30px'>
        The collaboration between zCloak and Chaintool demonstrates such a possibility, where we put the zk calculation
        results on the blockchain instead of the KYC information itself. In this way, blockchain project parties can
        develop their own zk Programs based on their compliance requirements and carry out checks in their applications
        based on the inspection results provided by trusted third parties.
      </Typography>
      <Stack direction='row' mb={6} mt={6} spacing={10}>
        <Item label='SOCIAL' value='1000' />
        <Item label='Event duration ' value='May 30th, 2023 - June 30th, 2023' />
      </Stack>
      <Divider
        sx={{
          opacity: 0.3
        }}
      />
    </>
  );
};

export default Introduction;
