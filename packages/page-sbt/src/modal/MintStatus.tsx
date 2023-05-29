// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Dialog, DialogContent, Stack } from '@mui/material';

import { ETHERSCAN_URL, IconEtherscan, IconOpensea, OPENSEA_URL } from '@credential/app-config';
import { Button, DialogHeader, Failed, Loading, Success } from '@credential/react-components';

const MintStatus: React.FC<{
  open: boolean;
  onClose: () => void;
  error?: Error;
  recipient: string;
  success: boolean;
  hash?: string;
}> = ({ error, hash, onClose, open, recipient, success }) => {
  return (
    <Dialog maxWidth='sm' onClose={onClose} open={open}>
      <DialogHeader onClose={onClose}>Mint zkID Card</DialogHeader>
      <DialogContent>
        <Stack alignItems='center' fontSize={60} mb={4} spacing={2}>
          {error ? <Failed message={error.name} /> : <>{success ? <Success /> : <Loading />}</>}
        </Stack>
        {success && hash && recipient && (
          <Stack direction='row' justifyContent='center' paddingY={2}>
            <Button onClick={() => window.open(`${OPENSEA_URL}/${recipient}`)} startIcon={<IconOpensea />}>
              OpenSea
            </Button>
            <Button onClick={() => window.open(`${ETHERSCAN_URL}/${hash}`)} startIcon={<IconEtherscan />}>
              Etherscan
            </Button>
          </Stack>
        )}
        <Button fullWidth onClick={onClose} variant='contained'>
          Confirm
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default MintStatus;
