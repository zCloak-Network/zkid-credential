// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import CloseIcon from '@mui/icons-material/Close';
import { Button, Collapse, Divider, IconButton, Link, Stack, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import React from 'react';

import SharePng from '../../app/public/hk-event/icon_share.png';
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
  const [open, setOpen] = React.useState(false);

  console.log(`Introduction ${location.href}`);
  console.log(`Introduction ${location.href.includes('main-zk-kyc2023')}`);

  return (
    <>
      <Stack ml='auto' width={250}>
        <Collapse in={open}>
          <Alert
            action={
              <IconButton
                aria-label='close'
                color='inherit'
                onClick={() => {
                  setOpen(false);
                }}
                size='small'
              >
                <CloseIcon fontSize='inherit' />
              </IconButton>
            }
          >
            Link has been copied!
          </Alert>
        </Collapse>
      </Stack>

      <Stack direction='row' justifyContent='space-between'>
        <Title value='Introduction' />

        <Button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            setOpen(true);
            setTimeout(() => {
              setOpen(false);
            }, 2000);
          }}
          startIcon={<img src={SharePng} />}
          sx={{
            justifySelf: 'end',
            borderRadius: '24px',
            width: '138px',
            height: '48px',
            border: '1px solid #DFE2E6'
          }}
        >
          <Typography color='#282930' fontFamily='Kanit-SemiBold' fontSize='18px'>
            Share
          </Typography>
        </Button>
      </Stack>
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
        a user without disclosing their privacy.{'\u00A0'}
        {'\u00A0'}
        {'\u00A0'}
        {!location.href.includes('zk-kyc-demo2023') ? (
          <Link
            color='#1E5EFF'
            fontFamily='Kanit-SemiBold'
            href='https://cred.zkid.xyz/#/event/zk-kyc-demo2023'
            rel='noopener'
            sx={{ textDecoration: 'underline' }}
          >
            Try On Testnet
          </Link>
        ) : (
          <Link
            color='#1E5EFF'
            fontFamily='Kanit-SemiBold'
            href='https://cred.zkid.xyz/#/event/zk-kyc2023'
            rel='noopener'
            sx={{ textDecoration: 'underline' }}
          >
            Try On Mainnet
          </Link>
        )}
      </Typography>

      <Stack direction='row' mb={6} mt={6} spacing={10}>
        <Item label='Start Time ' value='May 31th, 2023' />
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
