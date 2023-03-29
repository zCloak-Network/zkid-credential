// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { alpha, type PaletteMode } from '@mui/material';
import { lighten, type ThemeOptions } from '@mui/material/styles';

type Func = (mode: PaletteMode) => NonNullable<ThemeOptions['components']>;

/**
 * Style overrides for Material UI components.
 *
 * @see https://github.com/mui-org/material-ui/tree/master/packages/mui-material/src
 */
const createComponents: Func = () => ({
  MuiCssBaseline: {
    styleOverrides: `
    * {
      box-sizing: border-box;
    }
    ::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
      border-radius: 2px;
    }
    ::-webkit-scrollbar-thumb {
      background: #bfbfbf;
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #333;
    }
    ::-webkit-scrollbar-corner {
      background: #179a16;
    }
    @font-face {
      font-family: "Kanit";
      font-style: normal;
      font-display: swap;
      font-weight: 100;
      src: url("/fonts/Kanit-Thin.ttf");
    }
    @font-face {
      font-family: "Kanit";
      font-style: italic;
      font-display: swap;
      font-weight: 100;
      src: url("/fonts/Kanit-ThinItalic.ttf");
    }
    @font-face {
      font-family: "Kanit";
      font-style: normal;
      font-display: swap;
      font-weight: 200;
      src: url("/fonts/Kanit-ExtraLight.ttf");
    }
    @font-face {
      font-family: "Kanit";
      font-style: italic;
      font-display: swap;
      font-weight: 200;
      src: url("/fonts/Kanit-ExtraLightItalic.ttf");
    }
    @font-face {
      font-family: "Kanit";
      font-style: normal;
      font-display: swap;
      font-weight: 300;
      src: url("/fonts/Kanit-Light.ttf");
    }
    @font-face {
      font-family: "Kanit";
      font-style: italic;
      font-display: swap;
      font-weight: 300;
      src: url("/fonts/Kanit-LightItalic.ttf");
    }
    @font-face {
      font-family: "Kanit";
      font-style: normal;
      font-display: swap;
      font-weight: 400;
      src: url("/fonts/Kanit-Regular.ttf");
    }
    @font-face {
      font-family: "Kanit";
      font-style: italic;
      font-display: swap;
      font-weight: 400;
      src: url("/fonts/Kanit-Italic.ttf");
    }
    @font-face {
      font-family: "Kanit";
      font-style: normal;
      font-display: swap;
      font-weight: 500;
      src: url("/fonts/Kanit-Medium.ttf");
    }
    @font-face {
      font-family: "Kanit";
      font-style: italic;
      font-display: swap;
      font-weight: 500;
      src: url("/fonts/Kanit-MediumItalic.ttf");
    }
    @font-face {
      font-family: "Kanit";
      font-style: normal;
      font-display: swap;
      font-weight: 600;
      src: url("/fonts/Kanit-SemiBold.ttf");
    }
    @font-face {
      font-family: "Kanit";
      font-style: italic;
      font-display: swap;
      font-weight: 600;
      src: url("/fonts/Kanit-SemiBoldItalic.ttf");
    }
    @font-face {
      font-family: "Kanit";
      font-style: normal;
      font-display: swap;
      font-weight: 700;
      src: url("/fonts/Kanit-Bold.ttf");
    }
    @font-face {
      font-family: "Kanit";
      font-style: italic;
      font-display: swap;
      font-weight: 700;
      src: url("/fonts/Kanit-BoldItalic.ttf");
    }
    @font-face {
      font-family: "Kanit";
      font-style: normal;
      font-display: swap;
      font-weight: 800;
      src: url("/fonts/Kanit-ExtraBold.ttf");
    }
    @font-face {
      font-family: "Kanit";
      font-style: italic;
      font-display: swap;
      font-weight: 800;
      src: url("/fonts/Kanit-ExtraBoldItalic.ttf");
    }
    @font-face {
      font-family: "Kanit";
      font-style: normal;
      font-display: swap;
      font-weight: 900;
      src: url("/fonts/Kanit-Black.ttf");
    }
    @font-face {
      font-family: "Kanit";
      font-style: italic;
      font-display: swap;
      font-weight: 900;
      src: url("/fonts/Kanit-BlackItalic.ttf");
    }
    @font-face {
      font-family: "RobotoSlab";
      font-style: normal;
      font-display: swap;
      font-weight: 700;
      src: url("/fonts/RobotoSlab-Bold.ttf");
    }
    @font-face {
      font-family: "Roboto";
      font-style: normal;
      font-display: swap;
      font-weight: 400;
      src: url("/fonts/Roboto-Regular.ttf");
    }
    @font-face {
      font-family: "Papyrus";
      font-style: normal;
      font-display: swap;
      font-weight: 400;
      src: url("/fonts/PapyrusStd.OTF");
    }
    @font-face {
      font-family: "BebasNeue";
      font-style: normal;
      font-display: swap;
      font-weight: 400;
      src: url("/fonts/BebasNeue-Regular.ttf");
    }
  `
  },

  MuiLink: {
    defaultProps: {
      underline: 'none'
    }
  },

  MuiInputLabel: {
    styleOverrides: {
      outlined: ({ theme }) => ({
        position: 'relative',
        transform: 'none',
        marginBottom: theme.spacing(0.75)
      })
    }
  },

  MuiOutlinedInput: {
    styleOverrides: {
      sizeSmall: {
        borderRadius: '5px'
      },
      root: ({ theme: { palette } }) => ({
        borderRadius: '10px',
        '.MuiOutlinedInput-notchedOutline': {
          borderColor: palette.divider
        },
        '&.Mui-disabled': {
          backgroundColor: lighten(palette.primary.main, 0.92),
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: palette.grey[300]
          }
        }
      })
    }
  },

  MuiMenu: {
    styleOverrides: {
      paper: {
        borderRadius: '10px !important'
      },
      list: ({ theme: { spacing } }) => ({
        padding: spacing(3),
        border: '1px solid rgba(255, 255, 255, 0.6)',
        borderRadius: '10px'
      })
    }
  },

  MuiMenuItem: {
    styleOverrides: {
      root: {
        borderRadius: '6px',
        ':hover, &.Mui-selected,&.Mui-focusVisible': {
          backgroundColor: '#EAECF2',
          ':hover': {
            backgroundColor: '#EAECF2'
          }
        }
      }
    }
  },

  MuiButtonBase: {
    styleOverrides: {
      root: {
        borderRadius: 10
      }
    }
  },

  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 5,
        textTransform: 'initial'
      },
      outlined: ({ theme }) => ({
        borderColor: theme.palette.primary.main,
        minWidth: '140px'
      }),
      contained: {
        minWidth: '140px'
      },
      sizeSmall: {
        padding: '4px 8px',
        fontSize: '0.875rem'
      },
      sizeMedium: {
        padding: '8px 12px',
        fontSize: 'inherit'
      },
      sizeLarge: {
        padding: '12px 16px',
        fontSize: '1rem'
      }
    }
  },

  MuiIconButton: {
    styleOverrides: {
      colorPrimary: ({ theme }) => ({
        background: lighten(theme.palette.primary.main, 0.9),
        ':hover': {
          background: lighten(theme.palette.primary.main, 0.8)
        }
      }),
      sizeSmall: {
        padding: 0,
        width: 28,
        height: 28,
        fontSize: '0.875rem'
      },
      sizeMedium: {
        padding: 0,
        width: 36,
        height: 36,
        fontSize: '1.25rem'
      },
      sizeLarge: {
        padding: 0,
        width: 44,
        height: 44,
        fontSize: '1.75rem'
      }
    }
  },

  MuiButtonGroup: {
    styleOverrides: {
      root: {
        boxShadow: 'none'
      }
    }
  },

  MuiDialog: {
    styleOverrides: {
      paper: ({ theme: { spacing } }) => ({
        margin: spacing(2),
        borderRadius: spacing(1)
      }),
      paperFullScreen: ({ theme: { breakpoints, palette, spacing } }) => ({
        margin: 0,
        background: palette.grey[100],
        borderRadius: 0,
        '& .MuiDialogTitle-root': {
          paddingTop: spacing(3),
          background: palette.common.white
        },
        '& .MuiDialogContent-root': {
          margin: spacing(3),
          marginLeft: 'auto',
          marginRight: 'auto',
          background: palette.common.white,
          [breakpoints.down('sm')]: {
            padding: 0
          }
        },
        '& .MuiDialogActions-root': {
          background: palette.common.white,
          justifyContent: 'center',
          padding: spacing(3)
        }
      })
    }
  },

  MuiDialogTitle: {
    styleOverrides: {
      root: ({ theme: { breakpoints, spacing } }) => ({
        fontSize: '1.25rem',
        textAlign: 'center',
        fontWeight: 600,
        padding: spacing(3),
        paddingTop: spacing(7.5),
        paddingBottom: spacing(4),
        [breakpoints.down('md')]: {
          padding: spacing(2)
        }
      })
    }
  },
  MuiDialogContent: {
    styleOverrides: {
      root: ({ theme: { breakpoints, spacing } }) => ({
        minWidth: 280,
        width: '100vw',
        maxWidth: '100%',
        padding: spacing(7.5),
        [breakpoints.down('md')]: {
          padding: spacing(3)
        }
      })
    }
  },
  MuiDialogActions: {
    styleOverrides: {
      root: ({ theme: { breakpoints, spacing } }) => ({
        padding: spacing(3),
        paddingTop: 0,
        [breakpoints.down('md')]: {
          padding: spacing(2)
        }
      })
    }
  },

  MuiTableRow: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderBottom: '1px solid',
        borderBottomColor: theme.palette.grey[300],
        '&:nth-last-of-type(1)': {
          borderBottom: 'none'
        },
        '&.MuiTableRow-hover:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.1)
        }
      }),
      head: ({ theme }) => ({
        backgroundColor: alpha(theme.palette.primary.main, 0.1)
      })
    }
  },
  MuiTableCell: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.palette.grey[900],
        padding: '8px 16px',
        height: 45,
        borderBottom: 'none'
      }),
      head: ({ theme }) => ({
        color: theme.palette.grey[500],
        borderBottom: 'none'
      })
    }
  },

  MuiTab: {
    styleOverrides: {
      root: {
        textTransform: 'initial'
      }
    }
  },

  MuiSvgIcon: {
    defaultProps: {
      fontSize: 'inherit'
    }
  }
});

export { createComponents };
