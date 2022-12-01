// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useContext, useMemo, useState } from 'react';

import { BaseCType, CType } from '@zcloak/ctype/types';

import { Button } from '@credential/react-components';
import { DidsContext, DidsModal } from '@credential/react-dids';
import { addCtype, signCType, Steps } from '@credential/react-dids/steps';
import { useToggle } from '@credential/react-hooks';

const SubmitCType: React.FC<{
  title?: string;
  properties?: Record<string, { type: any }>;
  onDone: () => void;
  description?: string;
}> = ({ description, onDone, properties, title }) => {
  const { did: publisher } = useContext(DidsContext);
  const [open, toggleOpen] = useToggle();
  const [ctype, setCType] = useState<CType>();

  const base: BaseCType | null = useMemo(
    () =>
      title && description && properties
        ? {
            title,
            description,
            type: 'object',
            properties,
            required: []
          }
        : null,
    [description, properties, title]
  );

  return (
    <>
      <Button onClick={toggleOpen} variant="contained">
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
                exec: () => addCtype(ctype)
              }
            ]}
            submitText="Submit ctype"
          />
        }
        title="Submit ctype"
      />
    </>
  );
};

export default React.memo(SubmitCType);
