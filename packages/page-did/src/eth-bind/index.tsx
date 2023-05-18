// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Step, StepLabel, Stepper } from '@mui/material';
import { useCallback, useContext, useState } from 'react';

import { zCloakSBTAbi, ZKSBT_ADDRESS, ZKSBT_CHAIN_ID } from '@credential/app-config';
import {
  Button,
  Dialog,
  DialogHeader,
  Failed,
  Loading,
  Stack,
  Success,
  useAccount,
  useContractEvent
} from '@credential/react-components';
import { DidsContext } from '@credential/react-dids';

import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';

const steps = ['Connect Wallet', 'Sign with zkID', 'Sign with Metamask', 'Publish'];

const EthBind: React.FC<{ open: boolean; onClose: () => void; refetch: () => Promise<any> }> = ({
  onClose,
  open,
  refetch
}) => {
  const [step, setStep] = useState(0);
  const [zkSig, setZkSig] = useState<string>();
  const [metaSig, setMetaSig] = useState<string>();
  const next = useCallback(() => setStep(step + 1), [step]);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  const { did } = useContext(DidsContext);
  const { address } = useAccount();

  const onError = useCallback((error: Error) => {
    setError(error);

    setLoading(false);
  }, []);

  const onSuccess = useCallback(async () => {
    await refetch();

    setError(undefined);

    setLoading(false);

    setSuccess(true);
  }, [refetch]);

  const _onClose = useCallback(() => {
    setStep(0);
    setZkSig(undefined);
    setMetaSig(undefined);
    setError(undefined);
    setSuccess(false);
    setLoading(false);
    onClose();
  }, [onClose]);

  const unwatch = useContractEvent({
    abi: zCloakSBTAbi,
    address: ZKSBT_ADDRESS,
    chainId: ZKSBT_CHAIN_ID,
    eventName: 'BindingSetSuccess',
    listener(logs: any) {
      const args = logs?.[0]?.args;

      if (args?.bindedAddr === address && args?.bindingAddr === did.identifier) {
        onSuccess();

        unwatch?.();
      }
    }
  });

  return (
    <Dialog
      open={open}
      sx={{
        '.MuiDialog-paper': {
          padding: '50px 60px',
          width: 600
        },
        '.MuiDialogTitle-root': {
          paddingY: 2
        }
      }}
    >
      <DialogHeader onClose={_onClose} />
      {loading || error || success ? (
        <>
          <Stack alignItems='center' fontSize={60} justifyContent='center' mb={8} spacing={1}>
            {loading && <Loading />}
            {error && <Failed message={error.name} />}
            {success && <Success />}
          </Stack>
          <Button onClick={_onClose} variant='contained'>
            Confirm
          </Button>
        </>
      ) : (
        <>
          <Stepper
            activeStep={step}
            sx={{
              '.MuiStepIcon-root': {
                color: '#0042F1!important'
              }
            }}
            variant='outlined'
          >
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel> </StepLabel>
              </Step>
            ))}
          </Stepper>
          {step === 0 && <Step1 next={next} />}
          {step === 1 && <Step2 next={next} onZkSigChange={setZkSig} />}
          {step === 2 && <Step3 next={next} onMetaSigChange={setMetaSig} zkSig={zkSig} />}
          {step === 3 && <Step4 metaSig={metaSig} onError={onError} onPublish={() => setLoading(true)} zkSig={zkSig} />}
        </>
      )}
    </Dialog>
  );
};

export default EthBind;
