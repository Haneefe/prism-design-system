import { forwardRef, ReactNode, ElementType } from 'react';
import styled from '@emotion/styled';

export interface VisuallyHiddenOwnProps {
  /** Content to render */
  children?: ReactNode;
  /** Element or component to render as */
  as?: ElementType;
}

export type VisuallyHiddenProps<T extends ElementType = 'span'> = VisuallyHiddenOwnProps &
  Omit<React.ComponentProps<T>, keyof VisuallyHiddenOwnProps>;

const StyledVisuallyHidden = styled.span`
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
`;

/**
 * VisuallyHidden component renders content that is accessible to screen readers
 * but visually hidden from sighted users. Useful for providing context and
 * improving accessibility without affecting the visual design.
 */
export const VisuallyHidden = forwardRef<HTMLElement, VisuallyHiddenProps>(
  ({ as = 'span', children, ...props }, ref) => {
    return (
      <StyledVisuallyHidden as={as} ref={ref} {...props}>
        {children}
      </StyledVisuallyHidden>
    );
  }
) as <T extends ElementType = 'span'>(
  props: VisuallyHiddenProps<T> & { ref?: React.Ref<React.ComponentRef<T>> }
) => React.ReactElement;

(VisuallyHidden as any).displayName = 'VisuallyHidden';