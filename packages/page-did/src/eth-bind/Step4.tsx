// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useCallback, useContext } from 'react';

import { zCloakSBTAbi, ZKSBT_ADDRESS, ZKSBT_CHAIN_ID } from '@credential/app-config';
import { Button, useAccount, useContractWrite } from '@credential/react-components';
import { DidsContext } from '@credential/react-dids';

import TextWithBg from './TextWithBg';

const Step4: React.FC<{
  zkSig?: string;
  metaSig?: string;
  onError?: (error: Error) => void;
  onPublish?: () => void;
}> = ({ metaSig, onError, onPublish, zkSig }) => {
  const { did } = useContext(DidsContext);
  const { address } = useAccount();
  const { writeAsync } = useContractWrite({
    abi: zCloakSBTAbi,
    address: ZKSBT_ADDRESS,
    functionName: 'setBinding',
    chainId: ZKSBT_CHAIN_ID,
    onError
  });

  const bind = useCallback(async () => {
    if (!address || !zkSig || !metaSig) return;

    try {
      await writeAsync({ args: [did.identifier, address, zkSig, metaSig] });

      onPublish?.();
    } catch (error) {}
  }, [did, address, writeAsync, zkSig, metaSig, onPublish]);

  return (
    <>
      <TextWithBg bgcolor='#F7F8FA' label='zkID Sig:' mb={2} mt={4} value={zkSig} />
      <TextWithBg bgcolor='#F7F8FA' label='Ethereum Address Sig:' mb={4} value={metaSig} />
      <Button fullWidth onClick={bind} size='large' variant='contained'>
        Publish
      </Button>
    </>
  );
};

export default Step4;
