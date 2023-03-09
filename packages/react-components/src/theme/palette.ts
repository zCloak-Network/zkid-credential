// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { type PaletteMode } from '@mui/material';
import { alpha, type PaletteOptions } from '@mui/material/styles';

/**
 * Customized Material UI color palette.
 *
 * @see https://mui.com/customization/palette/
 * @see https://mui.com/customization/default-theme/?expand-path=$.palette
 */
const createPalette = (mode: PaletteMode): PaletteOptions => ({
  mode,
  primary: {
    main: '#6768ac',
    light: '#6768ac',
    dark: '#6768ac',
    contrastText: '#fff'
  },
  success: {
    main: '#00B69B',
    light: '#00B69B',
    dark: '#00B69B',
    contrastText: '#1C1D21'
  },
  error: {
    main: '#EF3826',
    light: '#EF3826',
    dark: '#EF3826',
    contrastText: '#fff'
  },
  warning: {
    main: '#FFA756',
    light: '#FFA756',
    dark: '#FFA756',
    contrastText: '#1C1D21'
  },
  background: { default: '#F5F6FA', paper: '#fff' },
  grey: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e6e6e6',
    300: '#d5d5d5',
    400: '#bdbdbd',
    500: '#999999',
    600: '#777777',
    700: '#666666',
    800: '#424242',
    900: '#3a3a3a',
    A100: '#f5f5f5',
    A200: '#eeeeee',
    A400: '#bdbdbd',
    A700: '#666666'
  },
  common: { black: '#1C1D21', white: '#fff' },
  secondary: { main: '#9c27b0', light: '#ba68c8', dark: '#7b1fa2', contrastText: '#fff' },
  info: { main: '#0288d1', light: '#03a9f4', dark: '#01579b', contrastText: '#fff' },
  text: {
    primary: '#1C1D21',
    secondary: alpha('#1C1D21', 0.6),
    disabled: alpha('#1C1D21', 0.38)
  },
  divider: '#C5C5DE',
  action: {
    active: alpha('#1C1D21', 0.54),
    hover: alpha('#1C1D21', 0.04),
    hoverOpacity: 0.04,
    selected: alpha('#1C1D21', 0.08),
    selectedOpacity: 0.08,
    disabled: alpha('#1C1D21', 0.26),
    disabledBackground: alpha('#1C1D21', 0.12),
    disabledOpacity: 0.38,
    focus: '#C5C5DE',
    focusOpacity: 0.12,
    activatedOpacity: 0.12
  }
});

export { createPalette };
