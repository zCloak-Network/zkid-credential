// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Dialog, DialogContent, Stack } from '@mui/material';
import { useMemo } from 'react';

import {
  BASESCAN_URL,
  ETHERSCAN_URL,
  IconEtherscan,
  IconOpensea,
  IconTestnet,
  OPENSEA_URL,
  ZONIC_URL
} from '@credential/app-config';
import {
  baseGoerli,
  Button,
  DialogHeader,
  Failed,
  Loading,
  optimismGoerli,
  Success,
  useNetwork
} from '@credential/react-components';

const MintStatus: React.FC<{
  open: boolean;
  onClose: () => void;
  error?: Error | null;
  recipient: string;
  success: boolean;
  hash?: string;
}> = ({ error, hash, onClose, open, recipient, success }) => {
  const errorMessage = useMemo(() => {
    const err = error as any;

    if (err?.abi) {
      return err?.metaMessages?.[0];
    } else if (err?.name === 'TransactionExecutionError') {
      return err?.shortMessage;
    } else {
      return err?.name;
    }
  }, [error]);

  const { chain } = useNetwork();

  return (
    <Dialog maxWidth='sm' onClose={onClose} open={open}>
      <DialogHeader onClose={onClose}>Mint zkID Card</DialogHeader>
      <DialogContent>
        <Stack alignItems='center' fontSize={60} mb={4} spacing={2}>
          {error ? <Failed message={errorMessage} /> : <>{success ? <Success /> : <Loading />}</>}
        </Stack>
        {success && hash && recipient && chain?.id === optimismGoerli.id && (
          <Stack direction='row' justifyContent='center' paddingY={2}>
            <Button onClick={() => window.open(`${OPENSEA_URL}/${recipient}`)} startIcon={<IconOpensea />}>
              OpenSea
            </Button>
            <Button onClick={() => window.open(`${ETHERSCAN_URL}/${hash}`)} startIcon={<IconEtherscan />}>
              Etherscan
            </Button>
          </Stack>
        )}
        {success && hash && recipient && chain?.id === baseGoerli.id && (
          <Stack direction='row' justifyContent='center' paddingY={2}>
            <Button onClick={() => window.open(`${ZONIC_URL}/${recipient}`)} startIcon={<IconTestnet />}>
              Zonic
            </Button>
            <Button onClick={() => window.open(`${BASESCAN_URL}/${hash}`)} startIcon={<IconEtherscan />}>
              Basescan
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
