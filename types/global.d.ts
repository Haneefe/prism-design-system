/// <reference types="jest" />

declare module '@storybook/react' {
  export interface Preview {
    parameters?: any;
    decorators?: any[];
    globalTypes?: any;
  }
  export interface Meta<T = any> {
    title?: string;
    component?: T;
    parameters?: any;
    argTypes?: any;
  }
  export interface StoryObj<T = any> {
    args?: any;
    parameters?: any;
  }
}

declare module '@storybook/react-vite' {
  export interface StorybookConfig {
    stories?: string[];
    addons?: string[];
    framework?: {
      name: string;
      options?: any;
    };
    docs?: any;
    typescript?: any;
    viteFinal?: (config: any) => any;
  }
}