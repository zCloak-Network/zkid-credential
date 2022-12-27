// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CType } from '@zcloak/ctype/types';
import type { AnyJson } from '@zcloak/vc/types';

import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Did } from '@zcloak/did';

import { IconLogoCircle } from '@credential/app-config/icons';
import {
  Box,
  CTypeContext,
  FullScreenDialog,
  FullScreenDialogContent,
  FullScreenDialogHeader,
  Typography
} from '@credential/react-components';
import { CreateSubject } from '@credential/react-ctype';
import { InputDid } from '@credential/react-dids';
import { useCTypeMetaForAttest, useToggle } from '@credential/react-hooks';

import SubmitClaim from './create/SubmitClaim';

const AutoImport = () => {
  const { id } = useParams();
  const { ctypes, importCType } = useContext(CTypeContext);

  useEffect(() => {
    if (id) {
      importCType(id as any);
    }
  }, [importCType, id]);

  const ctype = useMemo(() => {
    return ctypes.filter((_c) => _c.$id === id)[0];
  }, [ctypes, id]);

  return <>{ctype ? <CreateClaim ctype={ctype} /> : ''}</>;
};

export default AutoImport;

function CreateClaim({ ctype }: { ctype: CType }) {
  const [open, toggleOpen] = useToggle(true);
  const [attester, setAttester] = useState<Did | null>(null);
  const [contents, setContents] = useState<AnyJson>({});
  const navigate = useNavigate();

  const ctypeMeta = useCTypeMetaForAttest(ctype.$id);

  const onDone = useCallback(() => {
    toggleOpen();
    navigate('/claimer/claims');
  }, [navigate, toggleOpen]);

  const onClose = useCallback(() => {
    navigate('/claimer/ctype');
    toggleOpen();
  }, [navigate, toggleOpen]);

  return (
    <>
      {open && (
        <FullScreenDialog open={open}>
          <FullScreenDialogHeader
            desc={ctype.$id}
            icon={<IconLogoCircle sx={{ width: 50, height: 50 }} />}
            onClose={onClose}
            title={ctype.title}
          />
          <FullScreenDialogContent bg={ctypeMeta?.bg}>
            <Typography mb={4} textAlign="center" variant="h2">
              Create Claim
            </Typography>
            <InputDid label="Attester" onChange={setAttester} />
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
