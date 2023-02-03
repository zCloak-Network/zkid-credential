// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CType } from '@zcloak/ctype/types';
import type { AnyJson } from '@zcloak/vc/types';

import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Did } from '@zcloak/did';

import { IconLogoCircle } from '@credential/app-config/icons';
import {
  Box,
  Button,
  FullScreenDialog,
  FullScreenDialogContent,
  FullScreenDialogHeader,
  Typography
} from '@credential/react-components';
import { CreateSubject } from '@credential/react-ctype';
import { InputDid } from '@credential/react-dids';
import { useCTypeMetaForAttest, useToggle } from '@credential/react-hooks';

import SubmitClaim from './SubmitClaim';

function CreateClaim({ ctype, isAuto }: { ctype: CType; isAuto: boolean }) {
  const [open, toggleOpen] = useToggle(isAuto);
  const [attester, setAttester] = useState<Did | null>(null);
  const [contents, setContents] = useState<AnyJson>({});
  const navigate = useNavigate();
  const { holder, id } = useParams();

  const defaultAttester = useMemo(() => {
    if (ctype.$id === id) {
      return holder;
    }

    return undefined;
  }, [ctype, id, holder]);

  const ctypeMeta = useCTypeMetaForAttest(ctype.$id);

  const onDone = useCallback(() => {
    toggleOpen();
    navigate('/claimer/claims');
  }, [navigate, toggleOpen]);

  return (
    <>
      {!isAuto ? (
        <Button onClick={toggleOpen} variant="contained">
          Create Claim
        </Button>
      ) : (
        <></>
      )}
      {open && (
        <FullScreenDialog open={open}>
          <FullScreenDialogHeader
            desc={ctype.$id}
            icon={<IconLogoCircle sx={{ width: 50, height: 50 }} />}
            onClose={toggleOpen}
            title={ctype.title}
          />
          <FullScreenDialogContent bg={ctypeMeta?.bg}>
            <Typography mb={4} textAlign="center" variant="h2">
              Create Claim
            </Typography>
            <InputDid
              defaultValue={defaultAttester}
              disabled={!!defaultAttester}
              label="Attester"
              onChange={setAttester}
            />
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
