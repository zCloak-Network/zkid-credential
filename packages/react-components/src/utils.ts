// Copyright 2021-2022 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CSSObject, Theme } from '@mui/material';

import { lighten } from '@mui/material';

export const ellipsisMixin = (): CSSObject => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
});

export const withBorderInput = ({ palette }: Theme, withBorder?: boolean) =>
  withBorder
    ? {}
    : {
        '.MuiOutlinedInput-notchedOutline': {
          borderColor: 'transparent'
        },
        border: 'none',
        background: lighten(palette.primary.main, 0.94)
      };

export {
  alpha,
  lighten,
  darken,
  hexToRgb,
  rgbToHex,
  hslToRgb,
  decomposeColor,
  colorChannel,
  recomposeColor,
  getContrastRatio,
  getLuminance,
  emphasize
} from '@mui/system';
