// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CTypeSchemaProps } from '../types';

import React, { useEffect, useMemo, useState } from 'react';

import { InputBool } from '@credential/react-components';

import { isOrDefault } from './utils';

function SchemaBool({ defaultValue, disabled, name, onChange }: CTypeSchemaProps<boolean>) {
  const _defaultValue = useMemo(() => isOrDefault('boolean', defaultValue) as boolean, [defaultValue]);
  const [value, setValue] = useState<boolean>(_defaultValue);

  useEffect(() => {
    onChange?.(value);
  }, [onChange, value]);

  return <InputBool defaultValue={_defaultValue} disabled={disabled} label={name} onChange={setValue} />;
}

export default React.memo(SchemaBool);
