import { forwardRef, ReactNode, ElementType } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Box } from '@prism/core';

export interface CardOwnProps {
  /** Content to render */
  children?: ReactNode;
  /** Whether the card is interactive (hoverable) */
  interactive?: boolean;
  /** Card padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Element or component to render as */
  as?: ElementType;
}

export type CardProps<T extends ElementType = 'div'> = CardOwnProps &
  Omit<React.ComponentProps<T>, keyof CardOwnProps>;

const paddingStyles = {
  none: css`
    padding: 0;
  `,
  sm: css`
    padding: var(--prism-spacing-3);
  `,
  md: css`
    padding: var(--prism-spacing-4);
  `,
  lg: css`
    padding: var(--prism-spacing-6);
  `,
};

const StyledCard = styled.div<{
  interactive: boolean;
  padding: NonNullable<CardOwnProps['padding']>;
}>`
  background-color: var(--prism-color-background-primary);
  border: 1px solid var(--prism-color-border-primary);
  border-radius: var(--prism-radius-lg);
  box-shadow: var(--prism-shadow-sm);
  transition: all 0.15s ease-in-out;
  
  ${props => paddingStyles[props.padding]}
  
  ${props => props.interactive && css`
    cursor: pointer;
    
    &:hover {
      box-shadow: var(--prism-shadow-md);
      border-color: var(--prism-color-border-secondary);
    }
    
    &:focus-visible {
      outline: 2px solid var(--prism-color-border-focus);
      outline-offset: 2px;
    }
  `}

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

/**
 * Card component for grouping related content with consistent styling.
 * Supports interactive states and flexible padding options.
 */
export const Card = forwardRef<HTMLElement, CardProps>(
  ({ 
    children,
    interactive = false,
    padding = 'md',
    as = 'div',
    ...props 
  }, ref) => {
    return (
      <StyledCard
        as={as}
        interactive={interactive}
        padding={padding}
        ref={ref as any}
        tabIndex={interactive ? 0 : undefined}
        {...props}
      >
        {children}
      </StyledCard>
    );
  }
) as <T extends ElementType = 'div'>(
  props: CardProps<T> & { ref?: React.Ref<React.ComponentRef<T>> }
) => React.ReactElement;

(Card as any).displayName = 'Card';