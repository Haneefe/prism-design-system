import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveNoViolations(): R;
    }
  }
}

declare module 'jest-axe' {
  export function axe(container: Element): Promise<any>;
  export const toHaveNoViolations: any;
}

export {};