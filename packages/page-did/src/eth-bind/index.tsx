// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Step, StepLabel, Stepper } from '@mui/material';
import { useCallback, useState } from 'react';

import { Dialog, DialogHeader } from '@credential/react-components';

import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';

const steps = ['', '', '', ''];

const EthBind: React.FC<{ open: boolean; onClose: () => void }> = ({ onClose, open }) => {
  const [step, setStep] = useState(0);
  const [zkSig, setZkSig] = useState<string>();
  const [metaSig, setMetaSig] = useState<string>();
  // const prev = useCallback(() => setStep(step - 1), [step]);
  const next = useCallback(() => setStep(step + 1), [step]);

  return (
    <Dialog
      open={open}
      sx={{
        '.MuiDialog-paper': {
          padding: '50px 60px',
          width: 580
        },
        '.MuiDialogTitle-root': {
          paddingY: 2
        }
      }}
    >
      <DialogHeader onClose={onClose} />
      <Stepper activeStep={step} variant='outlined'>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {step === 0 && <Step1 next={next} />}
      {step === 1 && <Step2 next={next} onZkSigChange={setZkSig} />}
      {step === 2 && <Step3 next={next} onMetaSigChange={setMetaSig} zkSig={zkSig} />}
      {step === 3 && <Step4 metaSig={metaSig} zkSig={zkSig} />}
    </Dialog>
  );
};

export default EthBind;
