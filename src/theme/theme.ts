import { createTheme } from '@mui/material/styles';

export const Colors = {
  black: '#000000',
  blue1: '#1a75ff',
  blue2: '#1a75ff80',
  gray1: '#c2c2c2',
  green1: '#32b94d',
  green2: '#ecfbe6',
  red1: '#ff1a43',
  red2: '#ffe8ec',
  yellow1: '#ffa31a',
  yellow2: '#ffa31a80',
  white: '#ffffff',
};

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    underlined: true;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: Colors.green1,
      light: Colors.green2,
    },
    secondary: {
      main: Colors.blue1,
      light: Colors.blue2,
    },
    error: {
      main: Colors.red1,
      light: Colors.red2,
    },
    warning: {
      main: Colors.yellow1,
      light: Colors.yellow2,
    },
  },
  typography: {
    h1: {
      fontFamily: 'Atma',
      fontWeight: 500,
    },
    h4: {
      fontFamily: 'Atma',
      fontWeight: 500,
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: 'underlined' },
          style: {
            borderBottom: `2px solid ${Colors.blue2}`,
            color: Colors.black,
            borderRadius: 0,
            padding: 0,
            minWidth: 'unset',
            fontWeight: 400,
            '&:hover': {
              backgroundColor: 'inherit',
              borderBottom: `2px solid ${Colors.blue1}`,
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 700,
          textTransform: 'none',
          minHeight: 43.5,
          minWidth: 145,
        },
        contained: {
          color: Colors.white,
          '&:disabled': {
            backgroundColor: Colors.gray1,
            color: `${Colors.white}!important`,
            borderColor: `${Colors.gray1}!important`,
          },
        },
        text: {
          borderRadius: 0,
          fontFamily: 'Atma',
          fontWeight: 600,

          '&:hover': {
            border: 'none',
            backgroundColor: 'inherit',
          },
        },
        startIcon: {
          '&>*:nth-of-type(1)': {
            width: 25,
            height: 21,
          },
        },
      },
    },
  },
});

export default theme;
