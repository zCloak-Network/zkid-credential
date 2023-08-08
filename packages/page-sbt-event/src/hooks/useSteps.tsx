// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { stringToHex } from '@polkadot/util';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Did } from '@zcloak/did';
import { Message, MessageData } from '@zcloak/message/types';

import { IconCard, IconChaintool, IconLogoZkid, ZKSBT_CTYPE } from '@credential/app-config';
import { getCredentials } from '@credential/app-store';
import {
  AppContext,
  arbitrum,
  baseGoerli,
  NotificationContext,
  useNetwork,
  useSwitchNetwork
} from '@credential/react-components';
import { DidsContext } from '@credential/react-dids';
import { provider } from '@credential/react-dids/instance';
import { useLiveQuery, useMessages } from '@credential/react-hooks';

import { StepCardProps } from '../StepCard';

const ImportedKey = 'import_to_zkID_wallet';

const stepsConfig: StepCardProps[] = [
  {
    label: 'Step1',
    content: 'Finish Chaintool KYC',
    Icon: <IconChaintool />,
    title: 'Finish Chaintool KYC',
    onClick: () =>
      window.open(
        !location.href.includes('zk-kyc-demo2023')
          ? 'https://passport.chaintool.ai/'
          : 'https://passport.chaintool.ai/',
        '_blank'
      ),
    isLocked: false
  },
  {
    label: 'Step2',
    content: 'Only after importing the zkID Wallet, you can perform zk operations.',
    Icon: <IconLogoZkid />,
    title: 'Add KYC Card to zkID Wallet',
    isLocked: true
  },
  {
    label: 'Step3',
    content: 'Mint zkID Card to use your KYC information without leaking any personal information.',
    Icon: <IconCard />,
    title: 'Mint zkID Card',
    isLocked: true
  }
];

function getMessage(messages: Message<keyof MessageData>[], did: Did): Message<keyof MessageData> | undefined {
  return messages.filter(
    (message) =>
      message.msgType === 'Send_issuedVC' &&
      message.receiver === did.getKeyUrl('keyAgreement') &&
      message?.ctype === ZKSBT_CTYPE
  )[0];
}

export function useSteps() {
  const { did } = useContext(DidsContext);
  const [steps, setSteps] = useState<StepCardProps[]>(stepsConfig);

  const messages = useMessages('all');
  const message = getMessage(messages, did);

  const credentials = useLiveQuery(getCredentials, [])?.filter((credential) => credential.ctype === ZKSBT_CTYPE);
  const _credential = useMemo(() => credentials?.[credentials?.length - 1], [credentials]);

  const importedKey = `${ImportedKey}:${did.id}`;
  const [isImported, setIsImported] = useState<boolean>(window.localStorage.getItem(importedKey) === importedKey);
  const { chain } = useNetwork();
  const { switchNetworkAsync } = useSwitchNetwork();

  const { decrypt } = useContext(AppContext);
  const { notifyError } = useContext(NotificationContext);

  const navigate = useNavigate();

  const changeNetwork = useCallback(async () => {
    if (location.href.includes('sbtdemo') && chain?.id === arbitrum.id) {
      try {
        
        switchNetworkAsync && (await switchNetworkAsync(baseGoerli.id));
      } catch (error) {}
    } else if (!location.href.includes('sbtdemo') && chain?.id !== arbitrum.id) {
      try {
        
        switchNetworkAsync && (await switchNetworkAsync(arbitrum.id));
      } catch (error) {}
    }
  }, [chain?.id, switchNetworkAsync]);

  const importVc = useCallback(async () => {
    if (!message) return;

    try {
      const decrypted = await decrypt(message);

      const credential = decrypted.data;

      await provider?.importCredential(stringToHex(JSON.stringify(credential)));

      const newSteps = [...stepsConfig];

      newSteps[2].isLocked = false;
      newSteps[2].onClick = () => {
        navigate(
          !location.href.includes('zk-kyc-demo2023') ? `/sbt/${credential.digest}` : `/sbtdemo/${credential.digest}`
        );
        window.location.reload();
        changeNetwork();
      };

      setSteps(newSteps);

      setIsImported(true);

      window.localStorage.setItem(importedKey, importedKey);
    } catch (error) {
      notifyError(error);
    }
  }, [decrypt, message, importedKey, navigate, notifyError]);

  useEffect(() => {
    const credential = _credential?.vc;

    const newSteps = [...stepsConfig];

    if (isImported && credential) {
      newSteps[1].isLocked = false;
      newSteps[1].onClick = importVc;

      newSteps[2].isLocked = false;

      newSteps[2].onClick = () => {
        navigate(
          !location.href.includes('zk-kyc-demo2023') ? `/sbt/${credential.digest}` : `/sbtdemo/${credential.digest}`
        );
        window.location.reload();
        changeNetwork();
      };

      setSteps(newSteps);
    }

    if (credential) {
      newSteps[1].isLocked = false;
      newSteps[1].onClick = importVc;

      setSteps(newSteps);
    }
  }, [decrypt, isImported, importVc, _credential, navigate, changeNetwork]);

  useEffect(() => {
    const newSteps = [...stepsConfig];

    if (message) {
      newSteps[1].isLocked = false;
      newSteps[1].onClick = importVc;

      setSteps(newSteps);
    }
  }, [message, importVc, did]);

  return { steps };
}
