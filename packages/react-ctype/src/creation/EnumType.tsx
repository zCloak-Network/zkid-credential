// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useEffect, useState } from 'react';

import { InputString } from '@credential/react-components';

type Types = 'number' | 'integer' | 'string';

interface Props<T extends Types, ChangeData> {
  type: T;
  onChange: (values?: ChangeData) => void;
}

function EnumType<T extends Types, ChangeData = T extends 'string' ? string[] : number[]>({
  onChange,
  type
}: Props<T, ChangeData>): JSX.Element {
  const [value, setValue] = useState<string>();

  useEffect(() => {
    if (!value) {
      onChange(undefined);

      return;
    }

    if (type === 'number') {
      const values = value
        .split(',')
        .map(Number)
        .filter((value) => !Number.isNaN(value));

      if (values.length > 0) onChange(values as ChangeData);
    } else if (type === 'integer') {
      const values = value.split(',').map(Number).filter(Number.isInteger);

      if (values.length > 0) onChange(values as ChangeData);
    } else if (type === 'string') {
      const values = value.split(',');

      if (values.length > 0) onChange(values as ChangeData);
    }
  }, [onChange, type, value]);

  return (
    <InputString
      label='Enums'
      multiline
      onChange={setValue}
      placeholder='Enter multiple values ​​separated by ","'
      rows={4}
    />
  );
}

export default EnumType;
