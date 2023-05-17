// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useCallback, useContext } from 'react';

import { zCloakSBTAbi } from '@credential/app-config';
import { Button, useAccount, useContractWrite } from '@credential/react-components';
import { DidsContext } from '@credential/react-dids';

import TextWithBg from './TextWithBg';

const Step4: React.FC<{ zkSig?: string; metaSig?: string }> = ({ metaSig, zkSig }) => {
  const { did } = useContext(DidsContext);
  const { address } = useAccount();
  const { writeAsync } = useContractWrite({
    abi: zCloakSBTAbi,
    address: '0xA0c532091CbcBa56a5EAf657aEf7Db77e1C50D68',
    functionName: 'setBinding',
    args: [did.identifier, address, zkSig, metaSig]
  });

  const bind = useCallback(async () => {
    if (!address || !zkSig || !metaSig) return;
    await writeAsync({ args: [did.identifier, address, zkSig, metaSig] });
  }, [did, address, writeAsync, zkSig, metaSig]);

  return (
    <>
      <TextWithBg bgcolor='#F7F8FA' label='zkID Sig:' mb={2} mt={4} value={zkSig} />
      <TextWithBg bgcolor='#F7F8FA' label='Ethereum Address Sig:' mb={4} value={metaSig} />
      <Button fullWidth onClick={bind} variant='contained'>
        Publish
      </Button>
    </>
  );
};

export default Step4;
