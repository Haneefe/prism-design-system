import { forwardRef, ReactNode, ElementType, ButtonHTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import { Box } from '@prism/core';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonOwnProps {
  /** Content to render */
  children?: ReactNode;
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Size of the button */
  size?: ButtonSize;
  /** Whether button is in loading state */
  loading?: boolean;
  /** Icon to display before text */
  leftIcon?: ReactNode;
  /** Icon to display after text */
  rightIcon?: ReactNode;
  /** Whether button is disabled */
  disabled?: boolean;
  /** Whether button takes full width */
  fullWidth?: boolean;
  /** Element or component to render as */
  as?: ElementType;
}

export type ButtonProps<T extends ElementType = 'button'> = ButtonOwnProps &
  Omit<React.ComponentProps<T>, keyof ButtonOwnProps>;

const sizeStyles = {
  sm: css`
    height: 2rem;
    padding: 0 var(--prism-spacing-3);
    font-size: var(--prism-fontSize-sm);
    gap: var(--prism-spacing-1);
  `,
  md: css`
    height: 2.5rem;
    padding: 0 var(--prism-spacing-4);
    font-size: var(--prism-fontSize-base);
    gap: var(--prism-spacing-2);
  `,
  lg: css`
    height: 3rem;
    padding: 0 var(--prism-spacing-6);
    font-size: var(--prism-fontSize-lg);
    gap: var(--prism-spacing-2);
  `,
};

const variantStyles = {
  primary: css`
    background-color: var(--prism-color-primary-500);
    color: var(--prism-color-text-inverse);
    border: 1px solid var(--prism-color-primary-500);
    
    &:hover:not(:disabled) {
      background-color: var(--prism-color-primary-600);
      border-color: var(--prism-color-primary-600);
    }
    
    &:focus-visible {
      outline: 2px solid var(--prism-color-border-focus);
      outline-offset: 2px;
    }
    
    &:active:not(:disabled) {
      background-color: var(--prism-color-primary-700);
      border-color: var(--prism-color-primary-700);
    }
  `,
  secondary: css`
    background-color: var(--prism-color-background-primary);
    color: var(--prism-color-text-primary);
    border: 1px solid var(--prism-color-border-primary);
    
    &:hover:not(:disabled) {
      background-color: var(--prism-color-background-secondary);
      border-color: var(--prism-color-border-secondary);
    }
    
    &:focus-visible {
      outline: 2px solid var(--prism-color-border-focus);
      outline-offset: 2px;
    }
    
    &:active:not(:disabled) {
      background-color: var(--prism-color-background-tertiary);
    }
  `,
  ghost: css`
    background-color: transparent;
    color: var(--prism-color-text-primary);
    border: 1px solid transparent;
    
    &:hover:not(:disabled) {
      background-color: var(--prism-color-background-secondary);
    }
    
    &:focus-visible {
      outline: 2px solid var(--prism-color-border-focus);
      outline-offset: 2px;
    }
    
    &:active:not(:disabled) {
      background-color: var(--prism-color-background-tertiary);
    }
  `,
  destructive: css`
    background-color: var(--prism-color-error-500);
    color: var(--prism-color-text-inverse);
    border: 1px solid var(--prism-color-error-500);
    
    &:hover:not(:disabled) {
      background-color: var(--prism-color-error-600);
      border-color: var(--prism-color-error-600);
    }
    
    &:focus-visible {
      outline: 2px solid var(--prism-color-border-focus);
      outline-offset: 2px;
    }
    
    &:active:not(:disabled) {
      background-color: var(--prism-color-error-700);
      border-color: var(--prism-color-error-700);
    }
  `,
};

const StyledButton = styled(motion.button)<{
  variant: ButtonVariant;
  size: ButtonSize;
  fullWidth: boolean;
}>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--prism-fontFamily-sans);
  font-weight: var(--prism-fontWeight-medium);
  line-height: 1;
  white-space: nowrap;
  border-radius: var(--prism-radius-base);
  cursor: pointer;
  user-select: none;
  transition: all 0.15s ease-in-out;
  
  ${props => sizeStyles[props.size]}
  ${props => variantStyles[props.variant]}
  ${props => props.fullWidth && css`width: 100%;`}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const LoadingSpinner = styled(motion.div)<{ size?: ButtonSize }>`
  width: 1rem;
  height: 1rem;
  border: 2px solid currentColor;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    &::after {
      content: "⋯";
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
    }
  }
`;

const IconWrapper = styled.span<{ loading?: boolean }>`
  display: inline-flex;
  align-items: center;
  ${props => props.loading && css`opacity: 0;`}
`;

/**
 * Button component with multiple variants, sizes, and states.
 * Supports loading state, icons, and polymorphic rendering.
 */
export const Button = forwardRef<HTMLElement, ButtonProps>(
  ({ 
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    leftIcon,
    rightIcon,
    disabled = false,
    fullWidth = false,
    as = 'button',
    ...props 
  }, ref) => {
    const isDisabled = disabled || loading;
    
    if (as !== 'button') {
      // For non-button elements, use Box with basic styling
      return (
        <Box
          as={as}
          ref={ref as any}
          sx={css`
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: var(--prism-spacing-2);
            padding: var(--prism-spacing-2) var(--prism-spacing-4);
            background-color: var(--prism-colors-primary-500);
            color: var(--prism-colors-primary-50);
            border-radius: var(--prism-radius-md);
            text-decoration: none;
            cursor: pointer;
          `}
          {...(props as any)}
        >
          {leftIcon && (
            <IconWrapper loading={loading}>
              {leftIcon}
            </IconWrapper>
          )}
          
          {loading && <LoadingSpinner size={size} />}
          {children}
          
          {rightIcon && (
            <IconWrapper loading={loading}>
              {rightIcon}
            </IconWrapper>
          )}
        </Box>
      );
    }
    
    return (
      <StyledButton
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        disabled={isDisabled}
        ref={ref as any}
        whileHover={!isDisabled ? { scale: 1.02 } : undefined}
        whileTap={!isDisabled ? { scale: 0.98 } : undefined}
        {...(props as any)}
      >
        {loading && (
          <LoadingSpinner
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'absolute' }}
          />
        )}
        
        {leftIcon && (
          <IconWrapper loading={loading}>
            {leftIcon}
          </IconWrapper>
        )}
        
        <IconWrapper loading={loading}>
          {children}
        </IconWrapper>
        
        {rightIcon && (
          <IconWrapper loading={loading}>
            {rightIcon}
          </IconWrapper>
        )}
      </StyledButton>
    );
  }
);

(Button as any).displayName = 'Button';