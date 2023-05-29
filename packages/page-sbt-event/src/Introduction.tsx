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
      <Typography color='#8A7F7B' fontSize='1.125rem' fontWeight={400} textAlign='right'>
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
        As blockchain compliance and regulatory requirements continue to develop, the demand for personal information in
        on-chain applications is becoming increasingly strong. It has become an urgent issue to enable on-chain
        verifiers, e.g. smart contracts, to check the compliance status of users without revealing any personally
        identifiable information (PII).
      </Typography>
      <Typography color='#333' fontSize={18} lineHeight='30px'>
        The collaboration between zCloak and Chaintool demonstrates such an example, where we put the zk computation
        results in the blockchain instead of the PII itself. Verifiers can use the no-code tool from zCloak to develop
        their own zkPrograms based on the regulation in their region. The zkProgram will be executed using user KYC data
        in their zkID wallet. The end result will become available in the blockchain as a zk-SBT, proving attributes of
        a user without disclosing their privacy.
      </Typography>
      <Stack direction='row' mb={6} mt={6} spacing={10}>
        <Item label='Start Time ' value='May 30th, 2023 - June 30th, 2023' />
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
