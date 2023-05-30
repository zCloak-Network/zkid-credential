// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useCallback, useContext, useState } from 'react';

import { HexString } from '@zcloak/crypto/types';

import { zCloakSBTAbi, ZKSBT_ADDRESS, ZKSBT_CHAIN_ID } from '@credential/app-config';
import { ButtonEnableMetamask, useAccount, useContractWrite } from '@credential/react-components';
import { DidsContext } from '@credential/react-dids';

import SigItem from './SigItem';

const Step4: React.FC<{
  zkSig?: string;
  metaSig?: string;
  onError?: (error: Error) => void;
  onPublish?: (hash: HexString) => void;
}> = ({ metaSig, onError, onPublish, zkSig }) => {
  const { did } = useContext(DidsContext);
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);

  const { writeAsync } = useContractWrite({
    abi: zCloakSBTAbi,
    address: ZKSBT_ADDRESS,
    functionName: 'setBinding',
    chainId: ZKSBT_CHAIN_ID,
    onError
  });

  const bind = useCallback(async () => {
    if (!address || !zkSig || !metaSig) return;

    setLoading(true);

    try {
      const data = await writeAsync({ args: [did.identifier, address, zkSig, metaSig] });

      onPublish?.(data.hash);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [did, address, writeAsync, zkSig, metaSig, onPublish]);

  return (
    <>
      <SigItem label='zkID Sig:' mb={2} mt={4} value={zkSig} />
      <SigItem label='Ethereum Address Sig:' mb={4} value={metaSig} />
      <ButtonEnableMetamask fullWidth loading={loading} onClick={bind} size='large' variant='contained'>
        Publish
      </ButtonEnableMetamask>
    </>
  );
};

export default Step4;
