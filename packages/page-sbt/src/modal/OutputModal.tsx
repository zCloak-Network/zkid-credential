// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Dialog, DialogContent, Divider, Stack, Typography } from '@mui/material';

import { DialogHeader } from '@credential/react-components';

interface Props {
  open: boolean;
  name: string;
  outputs: [string, string][];
  onClose: () => void;
}

function Item({ condation, result }: { condation: string; result: string }) {
  return (
    <Stack alignItems='center' direction='row' justifyContent='space-between' spacing={2}>
      <Typography color='#8F95B2'>{condation}</Typography>
      <Typography color='primary.main' textAlign='right'>
        {result}
      </Typography>
    </Stack>
  );
}

function OutputModal({ name, onClose, open, outputs }: Props) {
  return (
    <Dialog maxWidth='sm' onClose={onClose} open={open}>
      <DialogHeader>
        <Typography variant='h3'>{name}</Typography>
      </DialogHeader>
      <DialogContent>
        <Stack spacing={3}>
          <Item condation='Condation' result='Output' />
          <Divider />
          {outputs.map(([condation, result], index) => (
            <Item condation={condation} key={index} result={result} />
          ))}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default OutputModal;
