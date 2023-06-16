// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useCallback, useContext, useState } from 'react';

import { HexString } from '@zcloak/crypto/types';

import { ConnectWallet, useAccount, useContractWrite, useNetwork } from '@credential/react-components';
import { DidsContext } from '@credential/react-dids';
import { useContractConfig } from '@credential/react-hooks';

import SigItem from './SigItem';

const Step4: React.FC<{
  zkSig?: string;
  metaSig?: string;
  onError?: (error: Error) => void;
  onPublish?: (hash: HexString) => void;
}> = ({ metaSig, onError, onPublish, zkSig }) => {
  const { did } = useContext(DidsContext);
  const { address } = useAccount();
  const { chain } = useNetwork();
  const [loading, setLoading] = useState(false);

  const { abi, toAddress } = useContractConfig(chain?.id);

  const { writeAsync } = useContractWrite({
    abi,
    address: toAddress,
    functionName: 'setBinding',
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
      <ConnectWallet fullWidth loading={loading} onClick={bind} size='large' variant='contained'>
        Publish
      </ConnectWallet>
    </>
  );
};

export default Step4;
