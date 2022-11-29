// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DecryptedTask } from '@credential/react-hooks/types';

import { alpha, Button, ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import React, { useCallback, useContext, useState } from 'react';

import { Message } from '@zcloak/message/types';

import { IconReject } from '@credential/app-config/icons';
import { Recaptcha } from '@credential/react-components';
import { DidsContext, DidsModal, useDid } from '@credential/react-dids';
import { encryptMessageStep, sendMessage, Steps } from '@credential/react-dids/steps';
import { useStopPropagation, useToggle } from '@credential/react-hooks';

const Reject: React.FC<{
  type?: 'button' | 'menu';
  task: DecryptedTask;
}> = ({ task, type = 'button' }) => {
  const { did: attester } = useContext(DidsContext);
  const [open, toggleOpen] = useToggle();
  const [encryptedMessage, setEncryptedMessage] =
    useState<Message<'Response_Reject_Attestation'>>();
  const [recaptchaToken, setRecaptchaToken] = useState<string>();

  const claimer = useDid(task.data.holder);

  const _toggleOpen = useStopPropagation(
    useCallback(() => {
      toggleOpen();
    }, [toggleOpen])
  );

  return (
    <>
      {type === 'button' ? (
        <Button
          onClick={_toggleOpen}
          startIcon={<IconReject />}
          sx={({ palette }) => ({
            background: alpha(palette.error.main, 0),
            borderColor: palette.error.main,
            color: palette.error.main,
            ':hover': {
              borderColor: palette.error.main
            }
          })}
          variant="outlined"
        >
          Reject
        </Button>
      ) : (
        <MenuItem onClick={_toggleOpen} sx={({ palette }) => ({ color: palette.error.main })}>
          <ListItemIcon sx={{ minWidth: '0px !important', marginRight: 1 }}>
            <IconReject color="error" />
          </ListItemIcon>
          <ListItemText>Reject</ListItemText>
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
                  label: 'Encrypt message',
                  exec: () =>
                    encryptMessageStep(
                      'Response_Reject_Attestation',
                      {
                        ctype: task.data.ctype,
                        holder: task.data.holder,
                        reason: 'No reason'
                      },
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
              submitText="Reject"
            />
          }
          title="Reject the request"
        />
      )}
    </>
  );
};

export default React.memo(Reject);
