// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useCallback, useState } from 'react';

import { isDidUrl } from '@zcloak/did/utils';

import { useToggle } from '@credential/react-hooks';

import Step0 from './Step0';
import Step1 from './Step1';

const Menu = () => {
  const [open, toggle] = useToggle();
  const [address, setAddress] = useState<string>();
  const [step, setStep] = useState<number>(0);

  const next = useCallback(() => {
    setStep(step + 1);
  }, [step]);

  const prev = useCallback(() => {
    setStep(step - 1);
  }, [step]);

  const onScan = useCallback(
    (val: string) => {
      if (isDidUrl(val)) {
        setAddress(val);
        next();
      }

      toggle();
    },
    [toggle, next]
  );

  const retry = useCallback(() => {
    prev();
    toggle();
  }, [prev, toggle]);

  return (
    <>
      {step === 0 ? (
        <Step0 next={next} onScan={onScan} open={open} toggle={toggle} />
      ) : (
        address && <Step1 prev={prev} receiver={address} retry={retry} />
      )}
    </>
  );
};

export default Menu;
