declare module 'jest-axe' {
  import { Result } from 'axe-core';
  
  export function axe(container?: Element | Document): Promise<Result>;
  export function toHaveNoViolations(): jest.CustomMatcher;
}