// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import data from './national.json';

type NationalType = {
  name: string;
  'alpha-2': string;
  'alpha-3': string;
  'country-code': string;
  'iso_3166-2': string;
  region: string;
  'intermediate-region': string;
  'region-code': string;
  'sub-region-code': string;
  'intermediate-region-code': string;
};

export const national = (data as Array<NationalType>).reduce<Record<string, NationalType>>((national, item) => {
  national[item['country-code']] = item;

  return national;
}, {});
