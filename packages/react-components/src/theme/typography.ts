// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { type ThemeOptions } from '@mui/material/styles';

type Func = () => NonNullable<ThemeOptions['typography']>;

/**
 * Customized Material UI typography.
 *
 * @see https://mui.com/customization/typography/
 * @see https://mui.com/customization/default-theme/?expand-path=$.typography
 */
const createTypography: Func = () => ({
  fontFamily: [
    'Kanit',
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    "'Segoe UI'",
    'Helvetica',
    'Arial',
    'sans-serif',
    "'Apple Color Emoji'",
    "'Segoe UI Emoji'",
    "'Segoe UI Symbol'"
  ].join(','),
  htmlFontSize: 16,
  h1: {
    fontSize: '2rem',
    fontWeight: 600,
    lineHeight: 1.5,
    '@media (max-width:600px)': {
      fontSize: '1.75rem'
    }
  },
  h2: {
    fontSize: '1.75rem',
    fontWeight: 600,
    lineHeight: 1.5,
    '@media (max-width:600px)': {
      fontSize: '1.5rem'
    }
  },
  h3: {
    fontSize: '1.5rem',
    fontWeight: 500,
    lineHeight: 1.5,
    '@media (max-width:600px)': {
      fontSize: '1.25rem'
    }
  },
  h4: {
    fontSize: '1.25rem',
    fontWeight: 500,
    lineHeight: 1.5,
    '@media (max-width:600px)': {
      fontSize: '1.25rem'
    }
  },
  h5: {
    fontSize: '1.125rem',
    fontWeight: 500,
    lineHeight: 1.5,
    '@media (max-width:600px)': {
      fontSize: '1.125em'
    }
  },
  h6: {
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1.5,
    '@media (max-width:600px)': {
      fontSize: '1rem'
    }
  },
  inherit: {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.5
  }
});

export { createTypography };
