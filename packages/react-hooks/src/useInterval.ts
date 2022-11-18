// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useEffect } from 'react';

export function useInterval(callback: () => void, delay: null | number, leading = true) {
  // Set up the interval.
  useEffect(() => {
    function tick() {
      callback();
    }

    if (delay !== null) {
      if (leading) tick();
      const id = setInterval(tick, delay);

      return () => clearInterval(id);
    }

    return undefined;
  }, [callback, delay, leading]);
}
