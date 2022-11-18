// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import {
  CircularProgress,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import { Did, helpers } from '@zcloak/did';

import { resolver } from './instance';

interface Props {
  defaultValue?: string;
  inputProps?: OutlinedInputProps;
  onChange?: (value: Did | null) => void;
}

const InputDid: React.FC<Props> = ({ defaultValue, inputProps, onChange }) => {
  const [didUrl, setDidUrl] = useState(defaultValue);
  const [fetching, setFetching] = useState(false);
  const [did, setDid] = useState<Did | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    onChange?.(did);
  }, [did, onChange]);

  useEffect(() => {
    if (didUrl) {
      setFetching(true);
      setError(null);
      resolver
        .resolve(didUrl)
        .then((document) => setDid(helpers.fromDidDocument(document)))
        .catch(setError)
        .finally(() => setFetching(false));
    }
  }, [didUrl]);

  return (
    <FormControl color={error ? 'error' : undefined} error={!!error} fullWidth variant="outlined">
      <InputLabel shrink>Receiver</InputLabel>
      <OutlinedInput
        {...inputProps}
        defaultValue={defaultValue}
        endAdornment={
          fetching ? (
            <InputAdornment position="end">
              <CircularProgress size={16} />
            </InputAdornment>
          ) : null
        }
        onChange={(e) => setDidUrl(e.target.value)}
        placeholder="Did or address or web3Name"
      />
      {error ? <FormHelperText>{error.message}</FormHelperText> : null}
    </FormControl>
  );
};

export default React.memo(InputDid);
