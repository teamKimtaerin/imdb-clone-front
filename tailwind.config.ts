import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ff0558',
          dark: '#e6004f',
        },
        surface: {
          DEFAULT: '#f8f9fa',
          hover: '#e9ecef',
        },
        danger: {
          DEFAULT: '#ef4444',
          dark: '#dc2626',
          hover: '#dc2626',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        sm: '8px',
      },
      borderRadius: {
        pill: '9999px',
      },
      fontSize: {
        xs: '12px',
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '20px',
      },
      boxShadow: {
        primary: '0 4px 12px rgba(255, 5, 88, 0.3)',
        danger: '0 4px 12px rgba(239, 68, 68, 0.3)',
      },
      animation: {
        'spin-smooth': 'spin 1s linear infinite',
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        // Button Base Styles
        '.btn': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: theme('fontFamily.sans'),
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          userSelect: 'none',
          position: 'relative',
          overflow: 'hidden',
          gap: theme('spacing.sm'),

          '&:disabled': {
            cursor: 'not-allowed',
            opacity: '0.5',
          },

          '&:not(:disabled):hover': {
            transform: 'translateY(-1px)',
          },

          '&:not(:disabled):active': {
            transform: 'scale(0.98)',
          },
        },

        // Button Variants
        '.btn-primary': {
          backgroundColor: theme('colors.primary.DEFAULT'),
          color: 'white',
          border: 'none',

          '&:not(:disabled):hover': {
            backgroundColor: theme('colors.primary.dark'),
            boxShadow: theme('boxShadow.primary'),
          },

          '&:not(:disabled):active': {
            backgroundColor: theme('colors.primary.dark'),
          },
        },

        '.btn-secondary': {
          backgroundColor: 'transparent',
          color: theme('colors.primary.DEFAULT'),
          border: `2px solid ${theme('colors.primary.DEFAULT')}`,

          '&:not(:disabled):hover': {
            backgroundColor: theme('colors.surface.hover'),
          },

          '&:not(:disabled):active': {
            backgroundColor: theme('colors.surface.DEFAULT'),
          },
        },

        '.btn-ghost': {
          backgroundColor: 'transparent',
          color: theme('colors.gray.900'),
          border: `1px solid ${theme('colors.gray.300')}`,

          '&:not(:disabled):hover': {
            backgroundColor: theme('colors.surface.hover'),
          },

          '&:not(:disabled):active': {
            backgroundColor: theme('colors.surface.DEFAULT'),
          },
        },

        '.btn-text': {
          backgroundColor: 'transparent',
          color: theme('colors.gray.600'),
          border: 'none',

          '&:not(:disabled):hover': {
            backgroundColor: theme('colors.surface.hover'),
            color: theme('colors.gray.900'),
          },

          '&:not(:disabled):active': {
            backgroundColor: theme('colors.surface.DEFAULT'),
          },
        },

        '.btn-danger': {
          backgroundColor: theme('colors.danger.DEFAULT'),
          color: 'white',
          border: 'none',

          '&:not(:disabled):hover': {
            backgroundColor: theme('colors.danger.hover'),
            boxShadow: theme('boxShadow.danger'),
          },

          '&:not(:disabled):active': {
            backgroundColor: theme('colors.danger.dark'),
          },
        },

        // Button Sizes
        '.btn-xs': {
          padding: '6px 12px',
          fontSize: theme('fontSize.xs'),
          height: '28px',

          '&.btn-rounded': {
            padding: '6px',
            minWidth: '28px',
          },
        },

        '.btn-sm': {
          padding: '8px 16px',
          fontSize: theme('fontSize.sm'),
          height: '32px',

          '&.btn-rounded': {
            padding: '8px',
            minWidth: '32px',
          },
        },

        '.btn-md': {
          padding: '10px 20px',
          fontSize: theme('fontSize.base'),
          height: '40px',

          '&.btn-rounded': {
            padding: '10px',
            minWidth: '40px',
          },
        },

        '.btn-lg': {
          padding: '12px 24px',
          fontSize: theme('fontSize.lg'),
          height: '48px',

          '&.btn-rounded': {
            padding: '12px',
            minWidth: '48px',
          },
        },

        '.btn-xl': {
          padding: '16px 32px',
          fontSize: theme('fontSize.xl'),
          height: '56px',

          '&.btn-rounded': {
            padding: '16px',
            minWidth: '56px',
          },
        },

        // Button Modifiers
        '.btn-full': {
          width: '100%',
        },

        '.btn-rounded': {
          borderRadius: '50%',
        },

        '.btn-pill': {
          borderRadius: theme('borderRadius.pill'),
        },

        // Loading Spinner
        '.spinner': {
          animation: theme('animation.spin-smooth'),
        },

        '.spinner-xs': {
          width: '12px',
          height: '12px',
        },

        '.spinner-sm': {
          width: '16px',
          height: '16px',
        },

        '.spinner-md': {
          width: '20px',
          height: '20px',
        },

        '.spinner-lg': {
          width: '24px',
          height: '24px',
        },

        '.spinner-xl': {
          width: '32px',
          height: '32px',
        },
      });
    }),
  ],
};

export default config;
