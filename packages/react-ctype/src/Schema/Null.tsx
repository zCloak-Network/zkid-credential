// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CTypeSchemaProps } from '../types';

import React, { useEffect } from 'react';

import { InputString } from '@credential/react-components';

function SchemaNull({ name, onChange }: CTypeSchemaProps<null>) {
  useEffect(() => {
    onChange?.(null);
  }, [onChange]);

  return <InputString defaultValue='Null' disabled label={name} />;
}

export default React.memo(SchemaNull);
