// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Dialog, DialogContent, Stack, Typography } from '@mui/material';

import { zCloakSBTAbi, ZKSBT_ADDRESS, ZKSBT_CHAIN_ID } from '@credential/app-config';
import { Button, DialogHeader, Failed, Loading, Success, useContractEvent } from '@credential/react-components';

const MintStatus: React.FC<{
  open: boolean;
  onClose: () => void;
  error?: Error;
  recipient: string;
  success: boolean;
}> = ({ error, onClose, open, success }) => {
  // const [success, setSuccess] = useState<boolean>(_success);

  const unwatch = useContractEvent({
    abi: zCloakSBTAbi,
    address: ZKSBT_ADDRESS,
    chainId: ZKSBT_CHAIN_ID,
    eventName: 'MintSuccess',
    listener() {
      // const args = logs?.[0]?.args;
      unwatch?.();

      // if (args?.recipient === recipient) {
      //   // setSuccess(true);
      //   unwatch?.();
      // }
    }
  });

  return (
    <Dialog maxWidth='sm' onClose={onClose} open={open}>
      <DialogHeader>
        <Typography variant='h3'>Mint zkID Card</Typography>
      </DialogHeader>
      <DialogContent>
        <Stack alignItems='center' fontSize={60} mb={4} spacing={2}>
          {error ? <Failed message={error.name} /> : <>{success ? <Success /> : <Loading />}</>}
        </Stack>
        <Button fullWidth onClick={onClose} variant='contained'>
          Confirm
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default MintStatus;
