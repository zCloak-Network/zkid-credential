// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CTypeSchema } from '@zcloak/ctype/types';

import React, { useCallback, useState } from 'react';

import { Button, Dialog, DialogContent, DialogHeader, Stack } from '@credential/react-components';
import { ItemCreation } from '@credential/react-ctype';
import { useToggle } from '@credential/react-hooks';

const CreateProperty: React.FC<{ onCreate: (value: Record<string, CTypeSchema>) => void }> = ({ onCreate }) => {
  const [open, toggleOpen] = useToggle();
  const [name, setName] = useState<string>();
  const [schema, setSchema] = useState<CTypeSchema>();

  const _onCreate = useCallback(() => {
    if (!name || !schema) return;

    onCreate({
      [name]: schema
    });
    toggleOpen();
  }, [name, onCreate, schema, toggleOpen]);

  return (
    <>
      <Button onClick={toggleOpen} variant='contained'>
        Create New Property
      </Button>
      <Dialog maxWidth='sm' onClose={toggleOpen} open={open}>
        <DialogHeader onClose={toggleOpen}>Create New Property</DialogHeader>
        <DialogContent>
          <Stack spacing={4}>
            <ItemCreation onChange={setSchema} onNameChange={setName} />
            <Button disabled={!name || !schema} fullWidth onClick={_onCreate} size='large' variant='contained'>
              Create
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default React.memo(CreateProperty);
