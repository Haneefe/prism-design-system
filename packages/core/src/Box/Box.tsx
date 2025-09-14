import { forwardRef, ReactNode, ElementType } from 'react';
import styled from '@emotion/styled';
import { SerializedStyles } from '@emotion/react';

export interface BoxOwnProps {
  /** Content to render */
  children?: ReactNode;
  /** Emotion styles via sx prop */
  sx?: SerializedStyles;
  /** Element or component to render as */
  as?: ElementType;
}

export type BoxProps<T extends ElementType = 'div'> = BoxOwnProps &
  Omit<React.ComponentProps<T>, keyof BoxOwnProps>;

const StyledBox = styled.div<{ sx?: SerializedStyles }>`
  box-sizing: border-box;
  ${props => props.sx}
`;

/**
 * Box is a fundamental layout primitive that serves as a building block
 * for other components. It supports polymorphic rendering and custom styles.
 */
export const Box = forwardRef<HTMLElement, BoxProps>(
  ({ as = 'div', sx, children, ...props }, ref) => {
    return (
      <StyledBox as={as} sx={sx} ref={ref as any} {...props}>
        {children}
      </StyledBox>
    );
  }
);

(Box as any).displayName = 'Box';