// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useCallback, useEffect, useState } from 'react';

import { isDidUrl } from '@zcloak/did/utils';

import { CTYPE_ID } from '@credential/app-config';
import { CType, getCacheCType } from '@credential/app-store';

import Step0 from './Step0';
import Step1 from './Step1';

const Menu = () => {
  const [open, setQrOpen] = useState<boolean>(false);
  const [address, setAddress] = useState<string>();
  const [step, setStep] = useState<number>(0);
  const [ctype, setCtype] = useState<CType>();

  useEffect(() => {
    getCacheCType(CTYPE_ID).then(setCtype);
  }, []);

  const next = useCallback(() => {
    setStep(step + 1);
  }, [step]);

  const prev = useCallback(() => {
    setStep(step - 1);
  }, [step]);

  const openQr = useCallback(() => {
    setQrOpen(true);
  }, []);

  const closeQr = useCallback(() => {
    setQrOpen(false);
  }, []);

  const onScan = useCallback(
    (val: string) => {
      if (isDidUrl(val)) {
        setAddress(val);
        next();
      }

      closeQr();
    },
    [next, closeQr]
  );

  const retry = useCallback(() => {
    prev();
    openQr();
  }, [prev, openQr]);

  return (
    <>
      {step === 0 ? (
        <Step0 closeQr={closeQr} next={next} onScan={onScan} open={open} openQr={openQr} />
      ) : (
        address && ctype && <Step1 ctype={ctype} prev={prev} receiver={address} retry={retry} />
      )}
    </>
  );
};

export default Menu;
