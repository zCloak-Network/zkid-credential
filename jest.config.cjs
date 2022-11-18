// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

const config = require('@zcloak/dev/config/jest.cjs');

module.exports = {
  ...config,
  moduleNameMapper: {},
  testTimeout: 30000
};
