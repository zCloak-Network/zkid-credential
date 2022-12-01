// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DidsStepProps } from './types';

import {
  Button,
  CircularProgress,
  lighten,
  Step,
  StepContent,
  StepLabel,
  Stepper
} from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useStopPropagation } from '@credential/react-hooks';

const DidsModal: React.FC<{
  submitText?: string;
  onDone?: () => void;
  beforeStart?: () => Promise<void>;
  steps: DidsStepProps[];
}> = ({ onDone, steps, submitText }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState<Error | null>();
  const [status, setStatus] = useState<{ message?: string; loading?: boolean } | null>();
  const [execing, setExecing] = useState(false);
  const [loading, setLoading] = useState(false);
  const stepsRef = useRef<DidsStepProps[]>(steps);

  useEffect(() => {
    stepsRef.current = steps;
  }, [steps]);

  const nextStep = useCallback(() => {
    setError(null);
    setStatus(null);

    setActiveStep(activeStep + 1);
  }, [activeStep]);

  const report = useCallback((error: Error | null, loading?: boolean, message?: string): void => {
    if (error) {
      setError(error);
    } else {
      setStatus({ loading, message });
    }
  }, []);

  useEffect(() => {
    if (!execing) return;

    if (activeStep >= stepsRef.current.length) return;

    if (stepsRef.current[activeStep].paused) {
      setExecing(false);

      return;
    }

    setStatus({ loading: true });
    stepsRef.current[activeStep]
      .exec(report)
      .then(() => {
        nextStep();
      })
      .catch((error) => {
        report(error);
        setExecing(false);
      })
      .finally(() => {
        setStatus({ loading: false });
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep, execing]);

  const handleExec = useStopPropagation(
    useCallback(() => {
      setError(null);
      setStatus({ loading: true });
      setLoading(true);
      stepsRef.current[activeStep]
        .exec(report)
        .then(() => {
          nextStep();
        })
        .catch(report)
        .finally(() => {
          setLoading(false);
          setStatus({ loading: false });
          setExecing(true);
        });
    }, [activeStep, nextStep, report])
  );

  useEffect(() => {
    setExecing(true);
  }, []);

  return (
    <>
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        sx={({ palette }) => ({
          padding: 4.5,
          borderRadius: 2.5,
          background: lighten(palette.primary.main, 0.94)
        })}
      >
        {steps.map(({ content, label, optional }, index) => (
          <Step key={index}>
            <StepLabel
              error={activeStep === index && !!error}
              icon={
                activeStep === index ? (
                  error ? undefined : status?.loading ? (
                    <CircularProgress size={24} />
                  ) : undefined
                ) : undefined
              }
              optional={
                activeStep === index
                  ? error
                    ? error.message ?? optional
                    : status
                    ? status?.message ?? optional
                    : optional
                  : optional
              }
            >
              {label}
            </StepLabel>
            <StepContent>{content}</StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? (
        <Button fullWidth onClick={onDone} variant="contained">
          Finish
        </Button>
      ) : (
        <Button disabled={execing || loading} fullWidth onClick={handleExec} variant="contained">
          {submitText ?? 'Submit'}
        </Button>
      )}
    </>
  );
};

export default React.memo(DidsModal);
