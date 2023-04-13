// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useEffect } from 'react';
import GA from 'react-ga4';

export function useGaInitial() {
  useEffect(() => {
    GA.initialize('G-KZ0ZCKZSYY');
  }, []);
}
