import { Stack, StackProps } from '../Stack/Stack';
import { forwardRef, ElementType } from 'react';

/**
 * Flex is an alias for Stack with horizontal direction by default.
 * Provides a convenient API for horizontal layouts.
 */
export const Flex = forwardRef<HTMLElement, StackProps>(
  ({ direction = 'horizontal', ...props }, ref) => {
    return <Stack direction={direction} ref={ref as any} {...props} />;
  }
) as <T extends ElementType = 'div'>(
  props: StackProps<T> & { ref?: React.Ref<React.ComponentRef<T>> }
) => React.ReactElement;

(Flex as any).displayName = 'Flex';