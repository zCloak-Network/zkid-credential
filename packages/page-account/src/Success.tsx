// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DidDocument, DidUrl } from '@zcloak/did-resolver/types';

import { LoadingButton } from '@mui/lab';
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import React, { useCallback, useContext, useEffect, useState } from 'react';

import { NotificationContext } from '@credential/react-components';
import { didManager, resolver } from '@credential/react-dids/instance';

const Success: React.FC<{
  didUrl: DidUrl;
  title: string;
  desc: string;
  toggleStart: () => void;
}> = ({ desc, didUrl, title, toggleStart }) => {
  const [fetching, setFetching] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [document, setDocument] = useState<DidDocument>();
  const { notifyError } = useContext(NotificationContext);

  useEffect(() => {
    setFetching(true);
    resolver
      .resolve(didUrl)
      .then(setDocument)
      .finally(() => setFetching(false));
  }, [didUrl]);

  const publish = useCallback(async () => {
    setPublishing(true);

    try {
      const did = didManager.getDid(didUrl);

      const publishDocument = did.getPublish();

      await resolver.submitDid(publishDocument);

      setDocument(publishDocument);
    } catch (error) {
      notifyError(error);
    } finally {
      setPublishing(false);
    }
  }, [didUrl, notifyError]);

  return (
    <>
      <Stack spacing={3} textAlign="center">
        <Box component="img" src="/images/home-pic.webp" />
        <Typography variant="h5">{title}</Typography>
        <Typography>{desc}</Typography>
      </Stack>
      {fetching ? (
        <CircularProgress style={{ margin: '0 auto' }} />
      ) : (
        <Stack alignItems="center" direction="column" mt={5.5} spacing={3}>
          {!document && (
            <LoadingButton
              color="warning"
              loading={publishing}
              onClick={publish}
              size="large"
              variant="contained"
            >
              Your did is not on-chain, click to publish
            </LoadingButton>
          )}

          <Button onClick={toggleStart} size="large" variant="contained">
            Get Start
          </Button>
        </Stack>
      )}
    </>
  );
};

export default React.memo(Success);
