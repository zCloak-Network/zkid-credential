// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { type PaletteMode, type Theme } from '@mui/material';
import { createTheme as createMuiTheme, PaletteOptions, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import * as React from 'react';

import { createComponents } from './components';
import { createPalette } from './palette';
import { createTypography } from './typography';

type Custom = { palette?: Partial<PaletteOptions> };

type ThemeProviderProps = {
  custom?: Custom;
  children: React.ReactNode;
};

/**
 * Creates a customized version of Material UI theme.
 *
 * @see https://mui.com/customization/theming/
 * @see https://mui.com/customization/default-theme/
 */
function createTheme(mode: PaletteMode, custom?: Custom): Theme {
  return createMuiTheme({
    palette: { ...createPalette(mode), ...custom?.palette },
    components: createComponents(mode),
    typography: createTypography(),
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1280,
        xl: 1536
      }
    }
  });
}

interface State {
  toggleTheme: () => void;
}

const ThemeContext = React.createContext<State>({} as State);

function ThemeProvider(props: ThemeProviderProps): JSX.Element {
  const [theme, setTheme] = React.useState(() => createTheme('light', props.custom));

  const toggleTheme = React.useCallback(() => {
    setTheme((theme) => createTheme(theme.palette.mode === 'light' ? 'dark' : 'light', props.custom));
  }, [props]);

  return (
    <MuiThemeProvider theme={theme}>
      <ThemeContext.Provider value={{ toggleTheme }}>{props.children}</ThemeContext.Provider>
    </MuiThemeProvider>
  );
}

export { ThemeProvider, ThemeContext };
