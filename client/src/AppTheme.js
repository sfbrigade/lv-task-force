import { createTheme, Button, Card, Container, Text } from '@mantine/core';

import buttonClasses from './Button.module.css';

export const AppTheme = createTheme({
  /** Your theme override here */
  cursorType: 'pointer',
  fontFamily: 'Manrope,-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
  fontSizes: {
    xs: '0.75rem',
    sm: '1rem',
    md: '1.25rem'
  },
  headings: {
    sizes: {
      h1: {
        fontSize: '2.5rem',
      },
      h2: {
        fontSize: '2rem',
      },
      h3: {
        fontSize: '1.75rem',
      },
    }
  },
  radius: {
    md: '.75rem'
  },
  defaultRadius: 'md',
  components: {
    Button: Button.extend({
      classNames: buttonClasses,
      defaultProps: {
        color: 'dark',
        size: 'lg',
        variant: 'filled',
        fz: 'sm'
      }
    }),
    Card: Card.extend({
      defaultProps: {
        bg: '#F3F4F7',
      }
    }),
    Container: Container.extend({
      defaultProps: {
        p: '2rem 1rem 2.25.rem',
        size: '480px'
      }
    }),
    Text: Text.extend({
      defaultProps: {
        inherit: true
      }
    })
  },
  other: {
    colorTextPrimary: '#2C2D2E',
    colorTextSecondary: '#87898F',
    colorTextTertiary: '#B8BBC0',
    colorTextSuccess: '#15803D',
    colorTextDanger: '#D03C3C',
    colorLightBackground: '#F3F4F7',
  }
});

export const AppCSSVariablesResolver = (theme) => ({
  variables: {
    '--mantine-color-text-primary': theme.other.colorTextPrimary,
    '--mantine-color-text-secondary': theme.other.colorTextSecondary,
    '--mantine-color-text-tertiary': theme.other.colorTextTertiary,
    '--mantine-color-text-success': theme.other.colorTextSuccess,
    '--mantine-color-text-danger': theme.other.colorTextDanger,
    '--mantine-color-light-background': theme.other.colorLightBackground,
  },
  light: {
    '--mantine-color-text': theme.other.colorTextPrimary,
  },
});

export default AppTheme;
