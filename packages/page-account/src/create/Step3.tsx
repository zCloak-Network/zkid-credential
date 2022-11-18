// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, Button, FormControl, Grid, InputLabel, OutlinedInput } from '@mui/material';
import FileSaver from 'file-saver';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { didManager } from '@credential/react-dids/initManager';

function random(min = 0, max = 11): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Step3: React.FC<{
  prevStep: () => void;
  nextStep: () => void;
  mnemonic: string;
  password?: string;
}> = ({ mnemonic, nextStep, password, prevStep }) => {
  const [keyWordsIndex, setKeyWordsIndex] = useState<number[]>([]);
  const [keyWords, setKeyWords] = useState<string[]>([]);

  useEffect(() => {
    const set = new Set<number>();

    while (true) {
      set.add(random());

      if (set.size === 4) {
        setKeyWordsIndex([...set].sort((l, r) => (l > r ? 1 : -1)));
        break;
      }
    }
  }, []);

  const checkTrue = useMemo(() => {
    const keys = mnemonic.split(' ');

    if (keyWords.length > 0 && keys.length > 0 && keyWordsIndex.length > 0) {
      return keyWordsIndex.map((index, i) => keys[index] === keyWords[i]).reduce((l, r) => l && r);
    } else {
      return false;
    }
  }, [keyWords, keyWordsIndex, mnemonic]);

  const toggleContinue = useCallback(() => {
    if (!password) return;

    const didDetails = didManager.addDidFromMnemonic(mnemonic);
    const json = didManager.backupDid(didDetails, password);
    const blobSiningJson = new Blob([JSON.stringify(json)], {
      type: 'text/plain;charset=utf-8'
    });

    FileSaver.saveAs(blobSiningJson, `${json.didUri}.json`);

    nextStep();
  }, [mnemonic, nextStep, password]);

  return (
    <>
      <Grid columnSpacing={4} container rowSpacing={3}>
        {keyWordsIndex.map((keyWordsIndex, index) => (
          <Grid item key={keyWordsIndex} xs={6}>
            <FormControl variant="outlined">
              <InputLabel shrink>#{keyWordsIndex + 1}</InputLabel>
              <OutlinedInput
                onChange={(e) =>
                  setKeyWords((keyWords) => {
                    keyWords[index] = e.target.value;

                    return [...keyWords];
                  })
                }
              />
            </FormControl>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ textAlign: 'right', width: '100%' }}>
        <Button onClick={prevStep} startIcon={<ArrowBackIosIcon />}>
          Go back
        </Button>
        <Button disabled={!checkTrue} onClick={toggleContinue} variant="contained">
          Continue
        </Button>
      </Box>
    </>
  );
};

export default React.memo(Step3);
