import { forwardRef, ReactNode, ElementType } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export type TextVariant = 'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption' | 'overline';

export interface TextOwnProps {
  /** Content to render */
  children?: ReactNode;
  /** Text variant determining size and weight */
  variant?: TextVariant;
  /** Text color */
  color?: 'primary' | 'secondary' | 'tertiary' | 'inverse';
  /** Text alignment */
  align?: 'left' | 'center' | 'right' | 'start' | 'end';
  /** Element or component to render as */
  as?: ElementType;
}

export type TextProps<T extends ElementType = 'p'> = TextOwnProps &
  Omit<React.ComponentProps<T>, keyof TextOwnProps>;

const variantStyles = {
  display: css`
    font-size: var(--prism-fontSize-6xl);
    font-weight: var(--prism-fontWeight-bold);
    line-height: var(--prism-lineHeight-tight);
    letter-spacing: var(--prism-letterSpacing-tight);
  `,
  h1: css`
    font-size: var(--prism-fontSize-4xl);
    font-weight: var(--prism-fontWeight-bold);
    line-height: var(--prism-lineHeight-tight);
  `,
  h2: css`
    font-size: var(--prism-fontSize-3xl);
    font-weight: var(--prism-fontWeight-semibold);
    line-height: var(--prism-lineHeight-tight);
  `,
  h3: css`
    font-size: var(--prism-fontSize-2xl);
    font-weight: var(--prism-fontWeight-semibold);
    line-height: var(--prism-lineHeight-snug);
  `,
  h4: css`
    font-size: var(--prism-fontSize-xl);
    font-weight: var(--prism-fontWeight-medium);
    line-height: var(--prism-lineHeight-snug);
  `,
  h5: css`
    font-size: var(--prism-fontSize-lg);
    font-weight: var(--prism-fontWeight-medium);
    line-height: var(--prism-lineHeight-normal);
  `,
  h6: css`
    font-size: var(--prism-fontSize-base);
    font-weight: var(--prism-fontWeight-medium);
    line-height: var(--prism-lineHeight-normal);
  `,
  body: css`
    font-size: var(--prism-fontSize-base);
    font-weight: var(--prism-fontWeight-normal);
    line-height: var(--prism-lineHeight-normal);
  `,
  caption: css`
    font-size: var(--prism-fontSize-sm);
    font-weight: var(--prism-fontWeight-normal);
    line-height: var(--prism-lineHeight-normal);
  `,
  overline: css`
    font-size: var(--prism-fontSize-xs);
    font-weight: var(--prism-fontWeight-semibold);
    line-height: var(--prism-lineHeight-normal);
    letter-spacing: var(--prism-letterSpacing-wide);
    text-transform: uppercase;
  `,
};

const colorStyles = {
  primary: css`
    color: var(--prism-color-text-primary);
  `,
  secondary: css`
    color: var(--prism-color-text-secondary);
  `,
  tertiary: css`
    color: var(--prism-color-text-tertiary);
  `,
  inverse: css`
    color: var(--prism-color-text-inverse);
  `,
};

const alignStyles = {
  left: css`
    text-align: left;
  `,
  center: css`
    text-align: center;
  `,
  right: css`
    text-align: right;
  `,
  start: css`
    text-align: var(--prism-text-align-start);
  `,
  end: css`
    text-align: var(--prism-text-align-end);
  `,
};

const defaultElements: Record<TextVariant, ElementType> = {
  display: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body: 'p',
  caption: 'span',
  overline: 'span',
};

const StyledText = styled.p<{
  variant: TextVariant;
  color: NonNullable<TextOwnProps['color']>;
  align?: TextOwnProps['align'];
}>`
  margin: 0;
  font-family: var(--prism-fontFamily-sans);
  
  ${props => variantStyles[props.variant]}
  ${props => colorStyles[props.color]}
  ${props => props.align && alignStyles[props.align]}
`;

/**
 * Text component for typography with consistent styling and semantic HTML.
 * Supports various text variants and automatically maps to appropriate HTML elements.
 */
export const Text = forwardRef<HTMLElement, TextProps>(
  ({ variant = 'body', color = 'primary', align, as, children, ...props }, ref) => {
    const element = as || defaultElements[variant];
    
    return (
      <StyledText
        as={element}
        variant={variant}
        color={color}
        align={align}
        ref={ref as any}
        {...props}
      >
        {children}
      </StyledText>
    );
  }
) as <T extends ElementType = 'p'>(
  props: TextProps<T> & { ref?: React.Ref<React.ComponentRef<T>> }
) => React.ReactElement;

(Text as any).displayName = 'Text';