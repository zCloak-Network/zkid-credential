// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CType } from '@zcloak/ctype/types';
import type { AnyJson } from '@zcloak/vc/types';

import { Box, Button, Typography } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Did } from '@zcloak/did';

import { IconLogoCircle } from '@credential/app-config/icons';
import {
  FullScreenDialog,
  FullScreenDialogContent,
  FullScreenDialogHeader
} from '@credential/react-components';
import { CreateSubject } from '@credential/react-ctype';
import { InputDid } from '@credential/react-dids';
import { resolver } from '@credential/react-dids/instance';
import { useToggle } from '@credential/react-hooks';

import SubmitClaim from './SubmitClaim';

function CreateClaim({ ctype }: { ctype: CType }) {
  const [open, toggleOpen] = useToggle();
  const [attester, setAttester] = useState<Did | null>(null);
  const [contents, setContents] = useState<AnyJson>({});
  const navigate = useNavigate();

  const defaultAttester = useMemo(() => {
    try {
      return resolver.parseDid(ctype.publisher).did;
    } catch {}

    return ctype.publisher;
  }, [ctype.publisher]);

  const onDone = useCallback(() => {
    toggleOpen();
    navigate('/claimer/claims');
  }, [navigate, toggleOpen]);

  return (
    <>
      <Button onClick={toggleOpen} variant="contained">
        Create Claim
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
            <InputDid defaultValue={defaultAttester} label="Attester" onChange={setAttester} />
            <Box mt={2}>
              <CreateSubject onChange={setContents as any} schema={ctype} />
            </Box>
            <Box mt={4} textAlign="center">
              <SubmitClaim attester={attester} contents={contents} ctype={ctype} onDone={onDone} />
            </Box>
          </FullScreenDialogContent>
        </FullScreenDialog>
      )}
    </>
  );
}

export default React.memo(CreateClaim);
