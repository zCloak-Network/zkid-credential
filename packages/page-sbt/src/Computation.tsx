// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { VerifiableCredential } from '@zcloak/vc/types';

import type { ZkProgramConfig } from '@credential/app-config/zk/types';

import { LoadingButton } from '@mui/lab';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useCallback, useState } from 'react';

import { generateProgramHash, initMidenWasm } from '@zcloak/miden';

import { provider, resolver } from '@credential/react-dids/instance';

interface Props {
  vc: VerifiableCredential<boolean>;
  program?: ZkProgramConfig;
}

function Computation({ program, vc }: Props) {
  const [loading, setLoading] = useState(false);
  const [{ error, isDone }, setResults] = useState<{ isDone: boolean; result: string; error: Error | null }>({
    isDone: false,
    result: '',
    error: null
  });

  const handleCompute = useCallback(async () => {
    if (!program || !provider) return;

    setLoading(true);

    try {
      await initMidenWasm();

      const result = await provider.generateZkp({
        ctype: vc.ctype,
        attester: vc.issuer,
        program: program.program,
        publicInput: program.getPublicInput?.() || '',
        leaves: program.leaves
      });

      await resolver.zkVerify(result, {
        program_hash: generateProgramHash(program.program),
        stack_inputs: program.getPublicInput?.() || '',
        user_did: vc.holder,
        ctype: vc.ctype,
        vc_version: vc.version,
        issuance_date: vc.issuanceDate,
        expiration_date: vc.expirationDate || 0,
        attester_did: vc.issuer,
        attester_proof: vc.proof[0]
      });

      setResults({
        isDone: true,
        result,
        error: null
      });
    } catch (error) {
      setResults({
        isDone: true,
        result: '',
        error: error as Error
      });
    }

    setLoading(false);
  }, [program, vc]);

  return (
    <Box alignItems='center' display='flex' flexDirection='column' marginTop={6}>
      {isDone && (
        <Box
          sx={{
            alignSelf: 'stretch',
            height: 125,
            mb: 7,
            padding: 2.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'url(images/zk_bag.webp) no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {error ? (
            <>
              <Stack spacing={2}>
                <Typography>Failed to run zk Program…</Typography>
                <Typography color='error.main'>{error.message}</Typography>
              </Stack>
              <LoadingButton color='secondary' loading={loading} onClick={handleCompute} variant='contained'>
                Compute Again
              </LoadingButton>
            </>
          ) : (
            <>
              <Stack spacing={2}>
                <Typography></Typography>
                <Typography>Verified ✅</Typography>
              </Stack>
            </>
          )}
        </Box>
      )}
      {!isDone || error ? (
        <LoadingButton disabled={!program} loading={loading} onClick={handleCompute} size='large' variant='contained'>
          ZKP Computation
        </LoadingButton>
      ) : (
        <Button>Claim zkID Card</Button>
      )}
    </Box>
  );
}

export default Computation;
