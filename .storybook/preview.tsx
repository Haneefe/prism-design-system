import type { Preview } from '@storybook/react';
import React from 'react';
import '../packages/tokens/dist/variables.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#020617',
        },
      ],
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1024px',
            height: '768px',
          },
        },
        wide: {
          name: 'Wide',
          styles: {
            width: '1440px',
            height: '900px',
          },
        },
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
    direction: {
      description: 'Text direction',
      defaultValue: 'ltr',
      toolbar: {
        title: 'Direction',
        icon: 'transfer',
        items: [
          { value: 'ltr', title: 'LTR' },
          { value: 'rtl', title: 'RTL' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story: any, context: any) => {
      const theme = context.globals.theme;
      const direction = context.globals.direction;
      
      // Apply theme class to document
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('theme-dark', theme === 'dark');
        document.documentElement.setAttribute('dir', direction);
      }
      
      return React.createElement(
        'div',
        {
          style: {
            minHeight: '100vh',
            backgroundColor: theme === 'dark' ? '#020617' : '#ffffff',
            color: theme === 'dark' ? '#f8fafc' : '#0f172a',
            direction: direction,
          }
        },
        React.createElement(Story)
      );
    },
  ],
};

export default preview;