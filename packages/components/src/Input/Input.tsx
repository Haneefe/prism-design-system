import { forwardRef, ReactNode, InputHTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Text, Stack } from '@prism/core';

export interface InputOwnProps {
  /** Label text */
  label?: string;
  /** Helper text displayed below input */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Input size variant */
  variant?: 'sm' | 'md' | 'lg';
  /** Icon to display before input */
  leftIcon?: ReactNode;
  /** Icon to display after input */
  rightIcon?: ReactNode;
}

export type InputProps = InputOwnProps & 
  Omit<InputHTMLAttributes<HTMLInputElement>, keyof InputOwnProps>;

const sizeStyles = {
  sm: css`
    height: 2rem;
    padding: 0 var(--prism-spacing-3);
    font-size: var(--prism-fontSize-sm);
  `,
  md: css`
    height: 2.5rem;
    padding: 0 var(--prism-spacing-4);
    font-size: var(--prism-fontSize-base);
  `,
  lg: css`
    height: 3rem;
    padding: 0 var(--prism-spacing-5);
    font-size: var(--prism-fontSize-lg);
  `,
};

const StyledInputWrapper = styled.div<{ hasError: boolean; disabled: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid var(--prism-color-border-primary);
  border-radius: var(--prism-radius-base);
  background-color: var(--prism-color-background-primary);
  transition: all 0.15s ease-in-out;
  
  &:focus-within {
    border-color: var(--prism-color-border-focus);
    outline: 2px solid var(--prism-color-border-focus);
    outline-offset: -1px;
  }
  
  ${props => props.hasError && css`
    border-color: var(--prism-color-error-500);
    &:focus-within {
      border-color: var(--prism-color-error-500);
      outline-color: var(--prism-color-error-500);
    }
  `}
  
  ${props => props.disabled && css`
    opacity: 0.5;
    cursor: not-allowed;
    background-color: var(--prism-color-background-secondary);
  `}

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const StyledInput = styled.input<{ inputVariant: NonNullable<InputOwnProps['variant']> }>`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: var(--prism-color-text-primary);
  font-family: var(--prism-fontFamily-sans);
  
  ${props => sizeStyles[props.inputVariant]}
  
  &::placeholder {
    color: var(--prism-color-text-tertiary);
  }
  
  &:disabled {
    cursor: not-allowed;
  }
`;

const IconWrapper = styled.span<{ position: 'left' | 'right' }>`
  display: inline-flex;
  align-items: center;
  color: var(--prism-color-text-secondary);
  ${props => props.position === 'left' && css`
    padding-left: var(--prism-spacing-3);
  `}
  ${props => props.position === 'right' && css`
    padding-right: var(--prism-spacing-3);
  `}
`;

const RequiredAsterisk = styled.span`
  color: var(--prism-color-error-500);
  margin-left: var(--prism-spacing-1);
`;

/**
 * Input component with label, helper text, error states, and icon support.
 * Provides accessible form field with consistent styling.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label,
    helperText,
    error,
    required = false,
    disabled = false,
    variant = 'md',
    leftIcon,
    rightIcon,
    id,
    ...props 
  }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = Boolean(error);
    const helperId = helperText || error ? `${inputId}-helper` : undefined;
    
    return (
      <Stack gap={1}>
        {label && (
          <Text 
            as="label" 
            variant="caption"
            color="primary"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              const input = document.getElementById(inputId);
              input?.focus();
            }}
          >
            {label}
            {required && <RequiredAsterisk aria-label="required">*</RequiredAsterisk>}
          </Text>
        )}
        
        <StyledInputWrapper hasError={hasError} disabled={disabled}>
          {leftIcon && (
            <IconWrapper position="left">
              {leftIcon}
            </IconWrapper>
          )}
          
          <StyledInput
            ref={ref}
            id={inputId}
            inputVariant={variant}
            disabled={disabled}
            required={required}
            aria-describedby={helperId}
            aria-invalid={hasError}
            {...props}
          />
          
          {rightIcon && (
            <IconWrapper position="right">
              {rightIcon}
            </IconWrapper>
          )}
        </StyledInputWrapper>
        
        {(helperText || error) && (
          <Text
            id={helperId}
            variant="caption"
            color={hasError ? 'secondary' : 'secondary'}
            role={hasError ? 'alert' : undefined}
          >
            {error || helperText}
          </Text>
        )}
      </Stack>
    );
  }
);

Input.displayName = 'Input';