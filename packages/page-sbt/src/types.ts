// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ZkProgramConfig } from '@credential/app-config/zk/types';

export type SbtResult = {
  desc: string;
  image: string;
  signature: string;
  programHash: string;
  programConfig: ZkProgramConfig;
  output: number[];
  publicInput: string;
};
