// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

const base = require('@zcloak/dev/config/eslint.cjs');

module.exports = {
  ...base,
  ignorePatterns: [
    ...base.ignorePatterns,
    'scripts/**/*'
  ],
  parserOptions: {
    ...base.parserOptions,
    project: [
      './tsconfig.eslint.json'
    ]
  },
  rules: {
    ...base.rules,
    'simple-import-sort/imports': [
      2,
      {
        groups: [
          ['^\u0000'], // all side-effects (0 at start)
          ['\u0000$', '^@zcloak.*\u0000$', '^\\..*\u0000$'], // types (0 at end)
          ['\u0000$', '^@credential.*\u0000$', '^\\..*\u0000$'], // types (0 at end)
          ['^[^/\\.]'],
          ['^@zcloak'],
          ['^@credential'],
          ['^\\.\\.(?!/?$)', '^\\.\\./?$', '^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'] // local (. last)
        ]
      }
    ],
  }
};
