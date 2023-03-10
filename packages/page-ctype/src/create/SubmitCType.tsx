// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BaseCType, CType, CTypeSchema } from '@zcloak/ctype/types';

import React, { useContext, useMemo, useState } from 'react';

import { Button, Recaptcha } from '@credential/react-components';
import { DidsContext, DidsModal } from '@credential/react-dids';
import { addCtype, signCType, Steps } from '@credential/react-dids/steps';
import { useToggle } from '@credential/react-hooks';

const SubmitCType: React.FC<{
  title?: string;
  properties?: Record<string, CTypeSchema>;
  onDone: () => void;
  description?: string;
}> = ({ description, onDone, properties, title }) => {
  const { did: publisher } = useContext(DidsContext);
  const [open, toggleOpen] = useToggle();
  const [ctype, setCType] = useState<CType>();
  const [recaptchaToken, setRecaptchaToken] = useState<string>();

  const base: BaseCType | null = useMemo(
    () =>
      title && description
        ? {
            title,
            description,
            type: 'object',
            properties: properties || {},
            required: []
          }
        : null,
    [description, properties, title]
  );

  return (
    <>
      <Button onClick={toggleOpen} variant='contained'>
        Submit
      </Button>
      <DidsModal
        onClose={toggleOpen}
        open={open}
        steps={
          <Steps
            onDone={onDone}
            steps={[
              {
                label: 'Sign ctype',
                paused: true,
                exec: () => signCType(base, publisher).then(setCType)
              },
              {
                label: 'Upload ctype',
                paused: true,
                content: <Recaptcha onCallback={setRecaptchaToken} />,
                exec: () => addCtype(ctype, recaptchaToken)
              }
            ]}
            submitText='Submit ctype'
          />
        }
        title='Submit ctype'
      />
    </>
  );
};

export default React.memo(SubmitCType);
