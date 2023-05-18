// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ZkProgramConfig } from './types';

import chaintool from './chaintool';

const zkConfig: Record<string, ZkProgramConfig[]> = [chaintool].reduce<Record<string, ZkProgramConfig[]>>(
  (config, item) => {
    item[0].forEach((_it) => {
      config[_it] = item[1];
    });

    return config;
  },
  {}
);

export { zkConfig };
