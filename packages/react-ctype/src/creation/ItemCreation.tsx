// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CTypeSchema } from '@zcloak/ctype/types';

import { useEffect, useState } from 'react';

import {
  Autocomplete,
  FormControl,
  InputLabel,
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
  withName = true,
  supported = ['array', 'boolean', 'integer', 'number', 'string']
}: Props) {
  const [name, setName] = useState<string>();
  const [type, setType] = useState<ItemType | null>(null);
  const [restrictions, setRestrictions] = useState<CTypeSchema>();
  const [enums, setEnums] = useState<(string | number)[]>();

  useEffect(() => {
    if (!name) return;

    onNameChange?.(name);
  }, [name, onNameChange]);

  useEffect(() => {
    if (!type) return;

    let schema: CTypeSchema = { type };

    if (restrictions) {
      schema = { ...schema, ...restrictions };
    }

    if (enums && enums.length > 0) {
      schema.enum = enums;
    }

    onChange(schema);
  }, [enums, onChange, restrictions, type]);

  return (
    <Stack spacing={3}>
      {withName && (
        <FormControl fullWidth variant="outlined">
          <InputLabel shrink>Data name</InputLabel>
          <OutlinedInput defaultValue={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>
      )}
      <Autocomplete<ItemType>
        fullWidth
        onChange={(_, value) => setType(value)}
        options={supported}
        renderInput={(params) => (
          <FormControl fullWidth variant="outlined">
            <InputLabel shrink>Type</InputLabel>
            <OutlinedInput {...params.InputProps} inputProps={params.inputProps} />
          </FormControl>
        )}
      />
      {(type === 'number' || type === 'integer') && (
        <NumberRestrictions onChange={setRestrictions} />
      )}
      {type === 'string' && <StringRestrictions onChange={setRestrictions} />}
      {type === 'array' && <ArrayRestrictions onChange={setRestrictions} />}
      {(type === 'number' || type === 'integer' || type === 'string') && (
        <EnumType onChange={setEnums} type={type} />
      )}
    </Stack>
  );
}

export default ItemCreation;
