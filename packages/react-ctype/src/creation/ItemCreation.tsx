// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CTypeSchema } from '@zcloak/ctype/types';

import { useEffect, useState } from 'react';

import {
  Autocomplete,
  FormControl,
  InputBool,
  InputLabel,
  InputString,
  OutlinedInput,
  Stack
} from '@credential/react-components';

import ArrayRestrictions from './ArrayRestrictions';
import EnumType from './EnumType';
import NumberRestrictions from './NumberRestrictions';
import StringRestrictions from './StringRestrictions';
import { ItemType } from './types';

interface Props {
  supported?: ItemType[];
  withName?: boolean;
  onChange(value: CTypeSchema): void;
  onNameChange?(value: string): void;
}

function ItemCreation({
  onChange,
  onNameChange,
  supported = ['array', 'boolean', 'integer', 'number', 'string'],
  withName = true
}: Props) {
  const [name, setName] = useState<string>();
  const [type, setType] = useState<ItemType | null>(null);
  const [restrictions, setRestrictions] = useState<CTypeSchema>();
  const [enums, setEnums] = useState<(string | number)[]>();
  const [required, setRequired] = useState(false);
  const [format, setFormat] = useState<string>();

  useEffect(() => {
    if (!name) return;

    onNameChange?.(name);
  }, [name, onNameChange]);

  useEffect(() => {
    if (!type) return;

    let schema: CTypeSchema = { type, required };

    if (restrictions) {
      schema = { ...schema, ...restrictions };
    }

    if (enums && enums.length > 0) {
      schema.enum = enums;
    }

    if (format) {
      schema.format = format;
    }

    onChange(schema);
  }, [enums, format, onChange, required, restrictions, type]);

  return (
    <Stack spacing={3}>
      {withName && (
        <FormControl fullWidth variant='outlined'>
          <InputLabel shrink>Data name</InputLabel>
          <OutlinedInput defaultValue={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>
      )}
      <Autocomplete<ItemType>
        fullWidth
        onChange={(_, value) => setType(value)}
        options={supported}
        renderInput={(params) => (
          <FormControl fullWidth variant='outlined'>
            <InputLabel shrink>Type</InputLabel>
            <OutlinedInput {...params.InputProps} inputProps={params.inputProps} />
          </FormControl>
        )}
      />
      <InputString onChange={setFormat} placeholder='E.g: timestamp,national-code,did' />
      {type && <InputBool label='Required' onChange={setRequired} />}
      {(type === 'number' || type === 'integer') && <NumberRestrictions onChange={setRestrictions} />}
      {type === 'string' && <StringRestrictions onChange={setRestrictions} />}
      {type === 'array' && <ArrayRestrictions onChange={setRestrictions} />}
      {(type === 'number' || type === 'integer' || type === 'string') && <EnumType onChange={setEnums} type={type} />}
    </Stack>
  );
}

export default ItemCreation;
