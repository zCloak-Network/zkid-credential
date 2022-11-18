// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import {
  Autocomplete,
  Button,
  Dialog,
  DialogContent,
  FormControl,
  InputLabel,
  OutlinedInput,
  Stack
} from '@mui/material';
import React, { useCallback, useState } from 'react';

import { DialogHeader } from '@credential/react-components';
import { useToggle } from '@credential/react-hooks';

const CreateProperty: React.FC<{ onCreate: (value: Record<string, unknown>) => void }> = ({
  onCreate
}) => {
  const [open, toggleOpen] = useToggle();
  const [name, setName] = useState<string>();
  const [property, setProperty] = useState<string | null>(null);

  const _onCreate = useCallback(() => {
    if (name && property) {
      onCreate({ [name]: property });
      toggleOpen();
    }
  }, [name, onCreate, property, toggleOpen]);

  return (
    <>
      <Button onClick={toggleOpen} variant="contained">
        Create New Property
      </Button>
      <Dialog maxWidth="xs" onClose={toggleOpen} open={open}>
        <DialogHeader onClose={toggleOpen}>Create New Property</DialogHeader>
        <Stack component={DialogContent} spacing={3}>
          <FormControl fullWidth variant="outlined">
            <InputLabel shrink>Data name</InputLabel>
            <OutlinedInput
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="please enter your nation"
            />
          </FormControl>
          <Autocomplete<string>
            fullWidth
            onChange={(_, value) => setProperty(value)}
            options={['array', 'boolean', 'integer', 'null', 'number', 'object', 'string']}
            renderInput={(params) => (
              <FormControl fullWidth variant="outlined">
                <InputLabel shrink>Property</InputLabel>
                <OutlinedInput
                  {...params.InputProps}
                  inputProps={params.inputProps}
                  onChange={(e) => setProperty(e.target.value)}
                  placeholder="Please select a property"
                />
              </FormControl>
            )}
          />
          <Button
            disabled={!property || !name}
            fullWidth
            onClick={_onCreate}
            size="large"
            variant="contained"
          >
            Create
          </Button>
        </Stack>
      </Dialog>
    </>
  );
};

export default React.memo(CreateProperty);
