// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CTypeSchemaProps } from '../types';

import { isBoolean } from '@polkadot/util';
import React, { useEffect, useMemo, useState } from 'react';

import { InputBool } from '@credential/react-components';

function SchemaBool({ defaultValue, disabled, name, onChange }: CTypeSchemaProps) {
  const _defaultValue = useMemo(
    () => (isBoolean(defaultValue) ? defaultValue : false),
    [defaultValue]
  );
  const [value, setValue] = useState<boolean | undefined>(_defaultValue);

  useEffect(() => {
    onChange?.(value ?? false);
  }, [onChange, value]);

  return (
    <InputBool defaultValue={_defaultValue} disabled={disabled} label={name} onChange={setValue} />
  );
}

export default React.memo(SchemaBool);
