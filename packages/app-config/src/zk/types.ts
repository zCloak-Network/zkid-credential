// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

export interface ZkProgramConfig {
  name: string;
  description: string;
  author: string;
  program: string;
  leaves: number[];
  isPublicInputUsedForCheck: boolean;
  outputs: [string, string][];
  getPublicInput?: () => string;
}

export type ZkProgramOption = [ctyp_hash_list: string[], config: ZkProgramConfig[]];
