// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DidUrl } from '@zcloak/did-resolver/types';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import FileSaver from 'file-saver';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Box, Button, FormControl, Grid, InputLabel, OutlinedInput } from '@credential/react-components';
import { didManager } from '@credential/react-dids/instance';

function random(min = 0, max = 11): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Step3: React.FC<{
  prevStep: () => void;
  nextStep: () => void;
  mnemonic: string;
  password?: string;
  setDidUrl: (didUrl: DidUrl) => void;
}> = ({ mnemonic, nextStep, password, prevStep, setDidUrl }) => {
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

    const didUrl = didManager.addDidFromMnemonic(mnemonic, password);
    const json = didManager.backupDid(didUrl, password);
    const blobSiningJson = new Blob([JSON.stringify(json)], {
      type: 'text/plain;charset=utf-8'
    });

    FileSaver.saveAs(blobSiningJson, `${json.didUrl}.json`);

    setDidUrl(didUrl);
    nextStep();
  }, [mnemonic, nextStep, password, setDidUrl]);

  return (
    <>
      <Grid columnSpacing={4} container rowSpacing={3}>
        {keyWordsIndex.map((keyWordsIndex, index) => (
          <Grid item key={keyWordsIndex} xs={6}>
            <FormControl variant='outlined'>
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
        <Button disabled={!checkTrue} onClick={toggleContinue} variant='contained'>
          Continue
        </Button>
      </Box>
    </>
  );
};

export default React.memo(Step3);
