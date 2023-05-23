// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import MailLockIcon from '@mui/icons-material/MailLock';
import { stringToHex } from '@polkadot/util';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IconCard, IconChaintool, IconLogoZkid, ZKSBT_CTYPE } from '@credential/app-config';
import { getCredentials } from '@credential/app-store';
import { NotificationContext } from '@credential/react-components';
import { DidsContext } from '@credential/react-dids';
import { provider } from '@credential/react-dids/instance';
import { useDecryptedMessage, useLiveQuery, useMessages } from '@credential/react-hooks';

import { StepCardProps } from '../StepCard';

const ImportedKey = 'import_to_zkID_wallet';

const stepsConfig: StepCardProps[] = [
  {
    label: 'Step1',
    content: 'Finish Chaintool KYC',
    Icon: <IconChaintool />,
    title: 'Finish Chaintool KYC',
    onClick: () => window.open('https://passport.chaintool.ai/', '_blank'),
    isLocked: false
  },
  {
    label: 'Step2',
    content: 'Decrypt from Message',
    Icon: <MailLockIcon />,
    title: 'Decrypt from Message',
    isLocked: true
  },
  {
    label: 'Step3',
    content: 'Only after importing the zkID Wallet, you can perform zk operations.',
    Icon: <IconLogoZkid />,
    title: 'Add KYC Credential to zkID Wallet',
    isLocked: true
  },
  {
    label: 'Step4',
    content: 'Mint zkID Card to use your KYC information without leaking any personal information.',
    Icon: <IconCard />,
    title: 'Mint zkID Card',
    isLocked: true
  }
];

export function useSteps() {
  const { did } = useContext(DidsContext);
  const { notifyError } = useContext(NotificationContext);
  const messages = useMessages('all');

  const message = useMemo(() => messages.filter((message) => message.ctype === ZKSBT_CTYPE)[0], [messages]);

  const credentials = useLiveQuery(getCredentials, [])?.filter((credential) => credential.ctype === ZKSBT_CTYPE);
  const _credential = useMemo(() => credentials?.[credentials?.length - 1], [credentials]);

  const [steps, setSteps] = useState<StepCardProps[]>(stepsConfig);

  const importedKey = `${ImportedKey}:${did.id}`;
  const [isImported, setIsImported] = useState<boolean>(window.localStorage.getItem(importedKey) === importedKey);

  const [decrypted, decrypt] = useDecryptedMessage(message);
  const navigate = useNavigate();

  useEffect(() => {
    const credential = decrypted ? decrypted.data : _credential?.vc;

    if (isImported && credential) {
      stepsConfig[1].isLocked = false;
      stepsConfig[2].isLocked = false;
      stepsConfig[3].isLocked = false;
      stepsConfig[3].onClick = () => navigate(`/sbt/${credential.digest}`);

      setSteps(stepsConfig);

      return;
    } else if (credential) {
      stepsConfig[1].isLocked = false;
      stepsConfig[2].isLocked = false;

      setSteps(stepsConfig);

      return;
    }

    if (message) {
      stepsConfig[1].isLocked = false;
      stepsConfig[1].onClick = decrypt;

      setSteps(stepsConfig);
    }
  }, [message, decrypted, decrypt, isImported, _credential, navigate]);

  useEffect(() => {
    const credential = decrypted ? decrypted.data : _credential?.vc;

    if (credential) {
      const importVc = async () => {
        try {
          await provider?.importCredential(stringToHex(JSON.stringify(credential)));

          stepsConfig[3].isLocked = false;
          stepsConfig[3].onClick = () => navigate(`/sbt/${credential.digest}`);

          setSteps(stepsConfig);

          setIsImported(true);

          window.localStorage.setItem(importedKey, importedKey);
        } catch (error) {
          notifyError(error);
        }
      };

      stepsConfig[2].isLocked = false;
      stepsConfig[2].onClick = importVc;

      setSteps(stepsConfig);
    }
  }, [_credential, navigate, notifyError, decrypted, importedKey]);

  return { steps };
}
