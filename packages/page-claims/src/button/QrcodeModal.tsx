// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { VerifiableCredential, VerifiablePresentation } from '@zcloak/vc/types';

import React, { useContext, useMemo, useState } from 'react';

import { VerifiablePresentationBuilder } from '@zcloak/vc';

import {
  Box,
  Button,
  Checkbox,
  CredentialQrcode,
  FormControlLabel,
  Paper,
  Stack,
  Typography
} from '@credential/react-components';
import { DidsContext, DidsModal } from '@credential/react-dids';

const QrcodeModal: React.FC<{
  credential: VerifiableCredential;
  open: boolean;
  onClose?: () => void;
}> = ({ credential, onClose, open }) => {
  const { did } = useContext(DidsContext);
  const attributes = useMemo(() => Object.keys(credential.credentialSubject), [credential]);
  const [selectedAttributes, setSelectAttributes] = useState<string[]>(attributes);
  const [presentation, setPresentation] = useState<VerifiablePresentation | null>(null);

  return (
    <DidsModal
      onClose={onClose}
      open={open}
      title={presentation ? 'Your credential' : 'Selective disclosure'}
    >
      {presentation ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '.CredentialQrcode > img': {
              width: { xs: 240, sm: 300, md: 360 },
              height: { xs: 240, sm: 300, md: 360 }
            }
          }}
        >
          <Typography
            sx={({ palette }) => ({
              color: palette.grey[700],
              marginBottom: 5,
              textAlign: 'center'
            })}
            variant="inherit"
          >
            This QR code contains the credential info you are about to share, please use it with
            care.
          </Typography>
          <CredentialQrcode presentation={presentation} />
        </Box>
      ) : (
        <Stack spacing={3}>
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
            fullWidth
            onClick={() => {
              const builder = new VerifiablePresentationBuilder(did);

              builder
                .addVC(credential, 'VP_SelectiveDisclosure', selectedAttributes)
                .build()
                .then(setPresentation);
            }}
            variant="contained"
          >
            Generate QR code
          </Button>
        </Stack>
      )}
    </DidsModal>
  );
};

export default React.memo(QrcodeModal);
