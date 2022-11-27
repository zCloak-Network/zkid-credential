// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CType } from '@zcloak/ctype/types';
import type { AnyJson } from '@zcloak/vc/types';

import { Box, Button, Typography } from '@mui/material';
import React, { useCallback, useState } from 'react';

import { Did } from '@zcloak/did';

import { IconLogoCircle } from '@credential/app-config/icons';
import {
  FullScreenDialog,
  FullScreenDialogContent,
  FullScreenDialogHeader
} from '@credential/react-components';
import { CreateSubject } from '@credential/react-ctype';
import { InputDid } from '@credential/react-dids';
import { useToggle } from '@credential/react-hooks';

import SubmitVC from './SubmitVC';

function IssueVC({ ctype }: { ctype: CType }) {
  const [open, toggleOpen] = useToggle();
  const [holder, setHolder] = useState<Did | null>(null);
  const [contents, setContents] = useState<AnyJson>({});

  const onDone = useCallback(() => {
    toggleOpen();
  }, [toggleOpen]);

  return (
    <>
      <Button onClick={toggleOpen} variant="contained">
        Issue VC
      </Button>
      {open && (
        <FullScreenDialog open={open}>
          <FullScreenDialogHeader
            desc={ctype.$id}
            icon={<IconLogoCircle sx={{ width: 50, height: 50 }} />}
            onClose={toggleOpen}
            title={ctype.title}
          />
          <FullScreenDialogContent>
            <Typography mb={4} textAlign="center" variant="h2">
              Create Claim
            </Typography>
            <InputDid label="Holder" onChange={setHolder} />
            <Box mt={2}>
              <CreateSubject onChange={setContents as any} schema={ctype} />
            </Box>
            <Box mt={4} textAlign="center">
              <SubmitVC contents={contents} ctype={ctype} holder={holder} onDone={onDone} />
            </Box>
          </FullScreenDialogContent>
        </FullScreenDialog>
      )}
    </>
  );
}

export default React.memo(IssueVC);
