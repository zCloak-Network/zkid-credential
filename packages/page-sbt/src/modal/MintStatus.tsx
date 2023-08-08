// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Dialog, DialogContent, Stack } from '@mui/material';
import { useMemo } from 'react';

import {
  ARBISCAN_URL,
  BASESCAN_URL,
  BLOCK_SCOUT_URL,
  BlockscoutLogo,
  ETHERSCAN_URL,
  IconEtherscan,
  IconOpensea,
  IconTestnet,
  OPENSEA_URL,
  ZONIC_URL
} from '@credential/app-config';
import {
  arbitrum,
  arbitrumGoerli,
  baseGoerli,
  Button,
  DialogHeader,
  Failed,
  lineaTestnet,
  Loading,
  optimismGoerli,
  Success,
  useNetwork
} from '@credential/react-components';

import ArbLogo from '../../../app-config/src/assets/icon_arbitrum.png';

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
        {success && hash && recipient && chain?.id === arbitrum.id && (
          <Stack direction='row' justifyContent='center' paddingY={2}>
            <Button onClick={() => window.open(`${OPENSEA_URL}/${recipient}`)} startIcon={<IconOpensea />}>
              OpenSea
            </Button>
            <Button onClick={() => window.open(`${ARBISCAN_URL}/${hash}`)} startIcon={<img src={ArbLogo} />}>
              Etherscan
            </Button>
          </Stack>
        )}
        {success && hash && recipient && chain?.id === arbitrumGoerli.id && (
          <Stack direction='row' justifyContent='center' paddingY={2}>
            <Button onClick={() => window.open(`${OPENSEA_URL}/${recipient}`)} startIcon={<IconOpensea />}>
              OpenSea
            </Button>
            <Button onClick={() => window.open(`${ARBISCAN_URL}/${hash}`)} startIcon={<img src={ArbLogo} />}>
              Arbiscan
            </Button>
          </Stack>
        )}
        {success && hash && recipient && chain?.id === lineaTestnet.id && (
          <Stack direction='row' justifyContent='center' paddingY={2}>
            <Button onClick={() => window.open(`${ZONIC_URL}/${recipient}`)} startIcon={<IconTestnet />}>
              Zonic
            </Button>
            <Button onClick={() => window.open(`${BLOCK_SCOUT_URL}/${hash}`)} startIcon={<BlockscoutLogo />}>
              Blockscout
            </Button>
          </Stack>
        )}
        <Button disabled={!(success || error)} fullWidth onClick={onClose} variant='contained'>
          Confirm
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default MintStatus;
