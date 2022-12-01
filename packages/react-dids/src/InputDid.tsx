// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useContext, useEffect, useMemo, useState } from 'react';

import { Did, helpers } from '@zcloak/did';

import {
  Autocomplete,
  Button,
  CircularProgress,
  createFilterOptions,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from '@credential/react-components';

import { DidsContext } from './DidsProvider';
import { resolver } from './instance';
import { useKnownDids } from './useKnownDids';

const filter = createFilterOptions<DidValue>();

interface Props {
  defaultValue?: string;
  withSelftButton?: string;
  label?: React.ReactNode;
  disabled?: boolean;
  onChange?: (value: Did | null) => void;
}

type DidValue = {
  title: string;
  inputValue?: string;
};

function InputDid({ defaultValue, disabled = false, label, onChange, withSelftButton }: Props) {
  const { did: self } = useContext(DidsContext);
  const [value, setValue] = useState<DidValue | null>(
    defaultValue ? { title: defaultValue } : null
  );
  const knownDids = useKnownDids();
  const options = useMemo(() => {
    const _options = knownDids.map((did) => ({ title: did }));

    return _options;
  }, [knownDids]);
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
    if (!value) return;

    setFetching(true);
    setError(null);
    resolver
      .resolve(value.title)
      .then((document) => setDid(helpers.fromDidDocument(document)))
      .catch(setError)
      .finally(() => setFetching(false));
  }, [value]);

  return (
    <Autocomplete<DidValue, undefined, undefined, true>
      clearOnBlur
      disabled={disabled}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.title);

        if (inputValue !== '' && !isExisting) {
          filtered.push({
            inputValue,
            title: `Search did "${inputValue}"`
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
          setValue({ title: newValue });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({ title: newValue.inputValue });
        } else {
          setValue(newValue);
        }
      }}
      options={options}
      renderInput={(params) => {
        return (
          <FormControl
            color={error ? 'error' : undefined}
            error={!!error}
            fullWidth={params.fullWidth}
          >
            {label && (
              <InputLabel {...params.InputLabelProps} shrink>
                {label}
              </InputLabel>
            )}
            <OutlinedInput
              {...params.InputProps}
              disabled={params.disabled}
              endAdornment={
                <>
                  {fetching && (
                    <InputAdornment position="end">
                      <CircularProgress size={16} />
                    </InputAdornment>
                  )}
                  {withSelftButton && (
                    <Button onClick={() => setValue({ title: self.id })}>{withSelftButton}</Button>
                  )}
                  {params.InputProps.endAdornment}
                </>
              }
              inputProps={params.inputProps}
            />
            {error ? <FormHelperText>{error.message}</FormHelperText> : null}
          </FormControl>
        );
      }}
      selectOnFocus
      value={value}
    />
  );
}

export default React.memo(InputDid);
