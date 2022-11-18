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
import { CTypeForm } from '@credential/react-ctype';
import { useToggle } from '@credential/react-hooks';

import SubmitClaim from './SubmitClaim';

function CreateClaim({ ctype }: { ctype: CType }) {
  const [open, toggleOpen] = useToggle();
  const [attester, setAttester] = useState<Did | null>(null);
  const [contents, setContents] = useState<AnyJson>({});
  const [contentsError, setContentsError] = useState<Record<string, Error | null | undefined>>({});
  const navigate = useNavigate();

  const onDone = useCallback(() => {
    toggleOpen();
    navigate('/claimer/claims');
  }, [navigate, toggleOpen]);

  const hasError = useMemo(() => {
    const values = Object.values(contentsError);

    if (values.length === 0) return false;

    return values.reduce((l, r) => l || r);
  }, [contentsError]);

  return (
    <>
      <Button onClick={toggleOpen} variant="contained">
        Create Claim
      </Button>
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
          <CTypeForm
            cType={ctype}
            defaultAttester={ctype.publisher}
            handleAttester={setAttester}
            onChange={setContents}
            onError={setContentsError}
          />
          <Box mt={4} textAlign="center">
            <SubmitClaim
              attester={attester}
              contents={contents}
              ctype={ctype}
              hasError={!!hasError}
              onDone={onDone}
            />
          </Box>
        </FullScreenDialogContent>
      </FullScreenDialog>
    </>
  );
}

export default React.memo(CreateClaim);
