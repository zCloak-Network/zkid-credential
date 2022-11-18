// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import {
  Autocomplete,
  CircularProgress,
  createFilterOptions,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

import { Did, helpers } from '@zcloak/did';

import { resolver } from './instance';

const filter = createFilterOptions<{ title: string; inputValue?: string }>();

interface Props {
  defaultValue?: string;
  disabled?: boolean;
  onChange?: (value: Did | null) => void;
}

const AttesterSelect: React.FC<Props> = ({ defaultValue, disabled = false, onChange }) => {
  const [didUrl, setDidUrl] = useState(defaultValue);
  const options = useRef<{ title: string; inputValue?: string }[]>(
    defaultValue ? [{ title: defaultValue }] : []
  );
  const [did, setDid] = useState<Did | null>(null);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!error) {
      onChange?.(did);
    } else {
      onChange?.(null);
    }
  }, [did, error, onChange]);
  useEffect(() => {
    if (!didUrl) return;

    setFetching(true);
    setError(null);
    resolver
      .resolve(didUrl)
      .then((document) => setDid(helpers.fromDidDocument(document)))
      .catch(setError)
      .finally(() => setFetching(false));
  }, [didUrl]);

  return (
    <Autocomplete<{ title: string; inputValue?: string }, undefined, undefined, true>
      clearOnBlur
      defaultValue={defaultValue}
      disabled={disabled}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.title);

        if (inputValue !== '' && !isExisting) {
          filtered.push({
            inputValue,
            title: `Add attester "${inputValue}"`
          });
        }

        return filtered;
      }}
      freeSolo
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }

        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.title;
        }

        // Regular option
        return option.title;
      }}
      handleHomeEndKeys
      onChange={(_, newValue: any) => {
        if (typeof newValue === 'string') {
          setDidUrl(newValue);
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setDidUrl(newValue.inputValue);
        } else {
          setDidUrl(newValue?.title ?? null);
        }
      }}
      options={options.current}
      renderInput={(params) => (
        <FormControl
          color={error ? 'error' : undefined}
          error={!!error}
          fullWidth={params.fullWidth}
        >
          <InputLabel {...params.InputLabelProps} shrink>
            Attester
          </InputLabel>
          <OutlinedInput
            {...params.InputProps}
            disabled={params.disabled}
            endAdornment={
              fetching ? (
                <InputAdornment position="end">
                  <CircularProgress size={16} />
                </InputAdornment>
              ) : (
                params.InputProps.endAdornment
              )
            }
            inputProps={params.inputProps}
          />
          {error ? <FormHelperText>{error.message}</FormHelperText> : null}
        </FormControl>
      )}
      selectOnFocus
      value={didUrl}
    />
  );
};

export default React.memo(AttesterSelect);
