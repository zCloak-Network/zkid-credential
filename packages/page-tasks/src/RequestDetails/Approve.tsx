// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Message } from '@zcloak/message/types';
import type { VerifiableCredential } from '@zcloak/vc/types';

import type { DecryptedTask } from '@credential/react-hooks/types';

import { alpha, Button, ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import React, { useCallback, useContext, useState } from 'react';

import { IconApprove } from '@credential/app-config/icons';
import { Recaptcha } from '@credential/react-components';
import { DidsContext, DidsModal, useDid } from '@credential/react-dids';
import {
  encryptMessageStep,
  sendMessage,
  signAndBuildVC,
  Steps
} from '@credential/react-dids/steps';
import { useStopPropagation, useToggle } from '@credential/react-hooks';

const Approve: React.FC<{
  type?: 'button' | 'menu';
  task: DecryptedTask;
}> = ({ task, type = 'button' }) => {
  const { did: attester, unlock } = useContext(DidsContext);
  const [open, toggleOpen] = useToggle();
  const [encryptedMessage, setEncryptedMessage] =
    useState<Message<'Response_Approve_Attestation'>>();
  const [recaptchaToken, setRecaptchaToken] = useState<string>();
  const [vc, setVC] = useState<VerifiableCredential>();

  const claimer = useDid(task.data.holder);

  const _toggleOpen = useStopPropagation(
    useCallback(() => {
      unlock().then(toggleOpen);
    }, [toggleOpen, unlock])
  );

  return (
    <>
      {type === 'button' ? (
        <Button
          onClick={_toggleOpen}
          startIcon={<IconApprove />}
          sx={({ palette }) => ({
            background: alpha(palette.success.main, 0.1),
            borderColor: palette.success.main,
            color: palette.success.main,
            ':hover': {
              borderColor: palette.success.main
            }
          })}
          variant="outlined"
        >
          Approve
        </Button>
      ) : (
        <MenuItem onClick={_toggleOpen} sx={({ palette }) => ({ color: palette.success.main })}>
          <ListItemIcon sx={{ minWidth: '0px !important', marginRight: 1 }}>
            <IconApprove color="success" />
          </ListItemIcon>
          <ListItemText>Approve</ListItemText>
        </MenuItem>
      )}
      {open && (
        <DidsModal
          onClose={_toggleOpen}
          open={open}
          steps={
            <Steps
              onDone={_toggleOpen}
              steps={[
                {
                  label: 'Sign proof and build VC',
                  paused: true,
                  exec: () => signAndBuildVC(task.data, attester).then(setVC)
                },
                {
                  label: 'Encrypt message',
                  exec: () =>
                    encryptMessageStep(
                      'Response_Approve_Attestation',
                      vc,
                      attester,
                      claimer,
                      task.id
                    ).then(setEncryptedMessage)
                },
                {
                  label: 'Send message',
                  paused: true,
                  content: <Recaptcha onCallback={setRecaptchaToken} />,
                  exec: () => sendMessage(encryptedMessage, recaptchaToken)
                }
              ]}
            />
          }
          title="Approve the request"
        />
      )}
    </>
  );
};

export default React.memo(Approve);
