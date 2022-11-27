// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CTypeSchemaProps } from '../types';

import React, { useMemo } from 'react';

import { findComponent } from './findComponent';

function SchemaBase({ defaultValue, disabled, name, onChange, schema }: CTypeSchemaProps) {
  const Component = useMemo(() => findComponent(schema), [schema]);

  return (
    <Component
      defaultValue={defaultValue}
      disabled={disabled}
      name={name}
      onChange={onChange}
      schema={schema}
    />
  );
}

export default React.memo(SchemaBase);
