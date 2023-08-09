// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable camelcase */

import type { VerifiableCredential } from '@zcloak/vc/types';
import type { SbtResult } from './types';

import type { ZkProgramConfig } from '@credential/app-config/zk/types';

import { LoadingButton } from '@mui/lab';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';

import { generateProgramHash, initMidenWasm } from '@zcloak/miden';

import { CONTRACTS_CONFIG, zkSBTVersion } from '@credential/app-config';
import { useNetwork, useSwitchNetwork } from '@credential/react-components';
import { provider, resolver } from '@credential/react-dids/instance';

interface Props {
  vc: VerifiableCredential<boolean>;
  program?: ZkProgramConfig;
  onSuccess: (value: SbtResult) => void;
}

function Computation({ onSuccess, program, vc }: Props) {
  const [loading, setLoading] = useState(false);
  const { chain } = useNetwork();
  const { chains } = useSwitchNetwork();
  const [{ error, isDone, result }, setResults] = useState<{
    isDone: boolean;
    result?: SbtResult;
    error: Error | null;
  }>({
    isDone: false,
    error: null
  });

  const isWrongNet = useMemo(() => chains.filter((_c) => _c.id === chain?.id).length === 0, [chains, chain]);

  const handleCompute = useCallback(async () => {
    if (!program || !provider || !chain) return;

    setLoading(true);

    try {
      await initMidenWasm();

      const publicInput = program.getPublicInput?.() || '';

      const result = await provider.generateZkp({
        ctype: vc.ctype,
        attester: vc.issuer,
        digest: vc.digest,
        program: program.program,
        publicInput,
        leaves: program.leaves
      });

      const programHash = generateProgramHash(program.program);
      const { desc, sbt_link, verifier_signature } = await resolver.zkVerify(
        result,
        {
          program_hash: programHash,
          stack_inputs: publicInput,
          user_did: vc.holder,
          ctype: vc.ctype,
          vc_version: vc.version,
          issuance_date: vc.issuanceDate,
          expiration_date: vc.expirationDate || 0,
          attester_did: vc.issuer,
          attester_proof: vc.proof[0]
        },
        CONTRACTS_CONFIG[chain.id],
        chain.id,
        program.isPublicInputUsedForCheck,
        zkSBTVersion[chain.id]
      );

      setResults({
        isDone: true,
        result: {
          desc,
          signature: verifier_signature,
          image: sbt_link,
          programHash,
          programConfig: program,
          publicInput,
          output: JSON.parse(result).outputs.stack
        },
        error: null
      });
    } catch (error) {
      setResults({
        isDone: true,
        error: error as Error
      });
    }

    setLoading(false);
  }, [program, vc, chain]);

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
                <Typography>{result?.desc}</Typography>
                <Typography>Verified ✅</Typography>
              </Stack>
            </>
          )}
        </Box>
      )}
      {!isDone || error ? (
        <LoadingButton
          disabled={!program || isWrongNet}
          loading={loading}
          onClick={handleCompute}
          size='large'
          variant='contained'
        >
          ZKP Computation
        </LoadingButton>
      ) : (
        result && (
          <Button onClick={() => onSuccess(result)} size='large' variant='contained'>
            Claim zkID Card
          </Button>
        )
      )}
    </Box>
  );
}

export default Computation;
