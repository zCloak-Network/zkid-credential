// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import React from 'react';

import { Box, Button, MnemonicCell } from '@credential/react-components';

const Step2: React.FC<{
  prevStep: () => void;
  nextStep: () => void;
  mnemonic: string;
}> = ({ mnemonic, nextStep, prevStep }) => {
  return (
    <>
      <MnemonicCell mnemonic={mnemonic} />
      <Box sx={{ textAlign: 'right', width: '100%' }}>
        <Button onClick={prevStep} startIcon={<ArrowBackIosIcon />}>
          Go back
        </Button>
        <Button onClick={nextStep} variant="contained">
          Confirm Seed Phrase
        </Button>
      </Box>
    </>
  );
};

export default React.memo(Step2);
