// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { VerifiableCredential, VerifiablePresentation } from '@zcloak/vc/types';

import { Box, Button, Checkbox, FormControlLabel, lighten, Paper, Stack } from '@mui/material';
import React, { useContext, useMemo, useState } from 'react';

import { Did } from '@zcloak/did';
import { Message } from '@zcloak/message/types';
import { VerifiablePresentationBuilder } from '@zcloak/vc';

import { Recaptcha } from '@credential/react-components';
import { DidsContext, DidsModal, InputDid } from '@credential/react-dids';
import { encryptMessageStep, sendMessage, Steps } from '@credential/react-dids/steps';

const ShareModal: React.FC<{
  credential: VerifiableCredential;
  open: boolean;
  onClose?: () => void;
}> = ({ credential, onClose, open }) => {
  const { did: sender } = useContext(DidsContext);
  const [receiver, setReceiver] = useState<Did | null>(null);
  const [encryptedMessage, setEncryptedMessage] = useState<Message<'Send_VP'>>();
  const [recaptchaToken, setRecaptchaToken] = useState<string>();

  const attributes = useMemo(() => Object.keys(credential.credentialSubject), [credential]);
  const [selectedAttributes, setSelectAttributes] = useState<string[]>(attributes);
  const [presentation, setPresentation] = useState<VerifiablePresentation | null>(null);

  return (
    <DidsModal
      onClose={onClose}
      open={open}
      steps={
        sender && receiver && presentation ? (
          <Steps
            onDone={onClose}
            steps={[
              {
                label: 'Encrypt message',
                exec: () =>
                  encryptMessageStep<'Send_VP'>('Send_VP', presentation, sender, receiver).then(
                    setEncryptedMessage
                  )
              },
              {
                label: 'Send message',
                paused: true,
                content: <Recaptcha onCallback={setRecaptchaToken} />,
                exec: () => sendMessage<'Send_VP'>(encryptedMessage, recaptchaToken)
              }
            ]}
            submitText="Share"
          />
        ) : null
      }
      title="Share this with others"
    >
      <Stack spacing={3}>
        <InputDid
          inputProps={{
            sx: ({ palette }) => ({
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: 'transparent'
              },
              border: 'none',
              background: lighten(palette.primary.main, 0.94)
            })
          }}
          onChange={setReceiver}
        />
        <Paper sx={{ height: 225, overflowY: 'scroll' }} variant="outlined">
          {attributes.map((key) => (
            <Box
              key={key}
              sx={({ palette }) => ({
                borderBottom: '1px solid',
                borderColor: palette.divider,
                height: 75,
                display: 'flex',
                alignItems: 'center',
                paddingX: 3
              })}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedAttributes.includes(key)}
                    onChange={() =>
                      selectedAttributes.includes(key)
                        ? setSelectAttributes((attributes) =>
                            attributes.filter((attribute) => attribute !== key)
                          )
                        : setSelectAttributes((attributes) => [...attributes, key])
                    }
                  />
                }
                label={key}
              />
            </Box>
          ))}
        </Paper>
        <Button
          disabled={!sender || !receiver}
          fullWidth
          onClick={() => {
            if (sender) {
              const builder = new VerifiablePresentationBuilder(sender);

              setPresentation(
                builder.addVC(credential, 'VP_SelectiveDisclosure', selectedAttributes).build()
              );
            }
          }}
          variant="contained"
        >
          Share
        </Button>
      </Stack>
    </DidsModal>
  );
};

export default React.memo(ShareModal);
