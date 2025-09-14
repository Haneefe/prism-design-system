import { forwardRef, ReactNode, ElementType } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export interface StackOwnProps {
  /** Content to render */
  children?: ReactNode;
  /** Direction of the stack */
  direction?: 'horizontal' | 'vertical';
  /** Gap between items using spacing tokens */
  gap?: keyof typeof spacingMap;
  /** Alignment of items */
  align?: 'start' | 'center' | 'end' | 'stretch';
  /** Justify content */
  justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
  /** Whether to wrap items */
  wrap?: boolean;
  /** Element or component to render as */
  as?: ElementType;
}

export type StackProps<T extends ElementType = 'div'> = StackOwnProps &
  Omit<React.ComponentProps<T>, keyof StackOwnProps>;

const spacingMap = {
  0: 'var(--prism-spacing-0)',
  1: 'var(--prism-spacing-1)',
  2: 'var(--prism-spacing-2)',
  3: 'var(--prism-spacing-3)',
  4: 'var(--prism-spacing-4)',
  5: 'var(--prism-spacing-5)',
  6: 'var(--prism-spacing-6)',
  8: 'var(--prism-spacing-8)',
  10: 'var(--prism-spacing-10)',
  12: 'var(--prism-spacing-12)',
  16: 'var(--prism-spacing-16)',
  20: 'var(--prism-spacing-20)',
  24: 'var(--prism-spacing-24)',
};

const StyledStack = styled.div<{
  direction: NonNullable<StackOwnProps['direction']>;
  gap: NonNullable<StackOwnProps['gap']>;
  align: NonNullable<StackOwnProps['align']>;
  justify: NonNullable<StackOwnProps['justify']>;
  wrap: NonNullable<StackOwnProps['wrap']>;
}>`
  display: flex;
  flex-direction: ${props => props.direction === 'vertical' ? 'column' : 'row'};
  gap: ${props => spacingMap[props.gap]};
  align-items: ${props => {
    switch (props.align) {
      case 'start': return 'flex-start';
      case 'end': return 'flex-end';
      case 'center': return 'center';
      case 'stretch': return 'stretch';
      default: return 'flex-start';
    }
  }};
  justify-content: ${props => {
    switch (props.justify) {
      case 'start': return 'flex-start';
      case 'end': return 'flex-end';
      case 'center': return 'center';
      case 'space-between': return 'space-between';
      case 'space-around': return 'space-around';
      case 'space-evenly': return 'space-evenly';
      default: return 'flex-start';
    }
  }};
  flex-wrap: ${props => props.wrap ? 'wrap' : 'nowrap'};
`;

/**
 * Stack component for consistent spacing and alignment of elements.
 * Provides a simple API for flex layouts with design system spacing.
 */
export const Stack = forwardRef<HTMLElement, StackProps>(
  ({ 
    direction = 'vertical', 
    gap = 4, 
    align = 'start', 
    justify = 'start',
    wrap = false,
    as = 'div', 
    children, 
    ...props 
  }, ref) => {
    return (
      <StyledStack
        as={as}
        direction={direction}
        gap={gap}
        align={align}
        justify={justify}
        wrap={wrap}
        ref={ref as any}
        {...props}
      >
        {children}
      </StyledStack>
    );
  }
) as <T extends ElementType = 'div'>(
  props: StackProps<T> & { ref?: React.Ref<React.ComponentRef<T>> }
) => React.ReactElement;

(Stack as any).displayName = 'Stack';