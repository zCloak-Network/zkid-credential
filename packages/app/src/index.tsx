// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { createRoot } from 'react-dom/client';

import { initCrypto } from '@zcloak/crypto';

import { initInstance } from '@credential/react-dids/instance';

import Root from './Root';

const rootId = 'root';
const rootElement = document.getElementById(rootId);

if (!rootElement) {
  throw new Error(`Unable to find element with id '${rootId}'`);
}

const root = createRoot(rootElement);

initCrypto()
  .then(() => initInstance())
  .then(() => root.render(<Root />))
  .catch((error) => {
    root.render(
      <>
        <p>{error?.message}</p>
        <p>{error?.toString()}</p>
        <p>{JSON.stringify(error)}</p>
      </>
    );
  });
