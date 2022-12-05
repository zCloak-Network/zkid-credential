// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DidUrl } from '@zcloak/did-resolver/types';

import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { mnemonicGenerate } from '@zcloak/crypto';

import {
  Container,
  Stack,
  Step,
  StepConnector,
  StepIcon,
  StepLabel,
  Stepper,
  Typography
} from '@credential/react-components';
import { useQueryParam } from '@credential/react-hooks';

import Step1 from './create/Step1';
import Step2 from './create/Step2';
import Step3 from './create/Step3';
import Success from './Success';

const Create: React.FC = () => {
  const [step, setStep] = useState(0);
  const [password, setPassword] = useState<string>();
  const mnemonic = useMemo(() => mnemonicGenerate(12), []);
  const navigate = useNavigate();
  const [redirect] = useQueryParam<string>('redirect');
  const [didUrl, setDidUrl] = useState<DidUrl>();

  const nextStep = useCallback(() => {
    setStep((step) => step + 1);
  }, []);
  const prevStep = useCallback(() => {
    setStep((step) => step - 1);
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      {step === 3 && didUrl ? (
        <Success
          desc="Remember to keep your secret recovery phrase safe, it’s your responsibility."
          didUrl={didUrl}
          title="Your account has been restored account!"
          toggleStart={() => navigate(`/${redirect ?? 'claimer'}`)}
        />
      ) : (
        <Stack alignItems="center" spacing={5.5}>
          <Typography textAlign="center" variant="h3">
            Create A New Account
          </Typography>
          <Stepper
            activeStep={step}
            alternativeLabel
            connector={<StepConnector sx={{ top: 18 }} />}
            sx={{ width: '100%' }}
          >
            <Step>
              <StepLabel StepIconComponent={StepIcon}>Create password</StepLabel>
            </Step>
            <Step>
              <StepLabel StepIconComponent={StepIcon}>Generate mnemonic</StepLabel>
            </Step>
            <Step>
              <StepLabel StepIconComponent={StepIcon}>Confirm</StepLabel>
            </Step>
          </Stepper>
          <Typography textAlign="center">
            {step === 0
              ? 'Master password is the only key to access/retrieve your local storage including all your secret keys and claims. Never forget your master password.'
              : step === 1
              ? 'Please write down your secret recovery phrase and keep it in a safe place. Never give this phrase to anyone as it will hand over control of your assets!'
              : 'Please confirm your secret recovery phrase by filling in the correct word for each position.'}
          </Typography>
          {step === 0 && (
            <Step1
              onConfirm={(password) => {
                setPassword(password);
                nextStep();
              }}
            />
          )}
          {step === 1 && <Step2 mnemonic={mnemonic} nextStep={nextStep} prevStep={prevStep} />}
          {step === 2 && (
            <Step3
              mnemonic={mnemonic}
              nextStep={nextStep}
              password={password}
              prevStep={prevStep}
              setDidUrl={setDidUrl}
            />
          )}
        </Stack>
      )}
    </Container>
  );
};

export default React.memo(Create);
