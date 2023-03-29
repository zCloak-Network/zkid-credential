// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import FileSaver from 'file-saver';
import { useCallback, useContext } from 'react';

import { DidUrl } from '@zcloak/did-resolver/types';

import { IconExportHk, IconScanHk } from '@credential/app-config';
import { Box, Button, IdentityIcon, QrScanner, Stack, Typography } from '@credential/react-components';
import { resolver } from '@credential/react-dids/instance';

import { LoginContext } from './LoginProvider';

const Step0: React.FC<{ open: boolean; next?: () => void; onScan: (val: string) => void; toggle: () => void }> = ({
  onScan,
  open,
  toggle
}) => {
  const { logout, org } = useContext(LoginContext);

  const exportClaimers = useCallback(async () => {
    if (!org) return;
    const data = await resolver.exportHkClaimers(org?.did as DidUrl);

    const blobSiningJson = new Blob([data.join('\n')], {
      type: 'text/plain;charset=utf-8'
    });

    FileSaver.saveAs(blobSiningJson, `${org.did}.csv`);
  }, [org]);

  return (
    <Box height='100%' position='relative'>
      {open && <QrScanner onClose={toggle} onResult={onScan} />}
      <Stack
        alignItems='center'
        sx={{
          background: 'url(/images/bag_welcome.svg)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          height: 268
        }}
      >
        <Box
          mt={5}
          sx={{
            width: 96,
            height: 96,
            borderRadius: '50%',
            border: '1px solid #4B45FF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <IdentityIcon diameter={92} value={org?.did} />
        </Box>
        <Typography fontSize={24} mt={2}>
          Welcome
        </Typography>
        <Typography fontSize={24}>{org?.name}</Typography>
      </Stack>
      <Stack
        paddingX={2}
        spacing={2}
        sx={{
          '.MuiButton-root': {
            height: 64,
            justifyContent: 'flex-start',
            boxShadow: '0px 6px 150px rgba(100,87,87,0.05)',
            borderRadius: '10px',
            bgcolor: '#fff',
            paddingX: 3,
            color: '#000'
          },
          '.MuiButton-startIcon': {
            marginRight: '24px'
          }
        }}
      >
        <Button onClick={toggle} startIcon={<IconScanHk />}>
          Scan
        </Button>
        <Button onClick={exportClaimers} startIcon={<IconExportHk />}>
          Export
        </Button>
      </Stack>

      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          paddingX: 2,
          bottom: 32
        }}
      >
        <Button
          fullWidth
          onClick={logout}
          sx={{
            height: 64,
            border: '1px solid #D5D5D5',
            borderRadius: '10px',
            color: '#999999'
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Step0;
