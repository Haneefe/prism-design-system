import React, { ReactNode, useEffect, useState, useContext } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Text, Flex } from '@prism/core';

export type ToastVariant = 'success' | 'warning' | 'error' | 'info';

export interface Toast {
  id: string;
  title?: string;
  message: string;
  variant?: ToastVariant;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface ToastProps extends Omit<Toast, 'id'> {
  onClose: () => void;
}

const variantStyles = {
  success: css`
    background-color: var(--prism-color-success-50);
    border-color: var(--prism-color-success-200);
    color: var(--prism-color-success-800);
  `,
  warning: css`
    background-color: var(--prism-color-warning-50);
    border-color: var(--prism-color-warning-200);
    color: var(--prism-color-warning-800);
  `,
  error: css`
    background-color: var(--prism-color-error-50);
    border-color: var(--prism-color-error-200);
    color: var(--prism-color-error-800);
  `,
  info: css`
    background-color: var(--prism-color-primary-50);
    border-color: var(--prism-color-primary-200);
    color: var(--prism-color-primary-800);
  `,
};

const ToastContainer = styled(motion.div)<{ variant: ToastVariant }>`
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: var(--prism-spacing-3);
  padding: var(--prism-spacing-4);
  border: 1px solid;
  border-radius: var(--prism-radius-base);
  box-shadow: var(--prism-shadow-lg);
  min-width: 320px;
  max-width: 480px;
  
  ${props => variantStyles[props.variant]}
`;

const ToastContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const ToastActions = styled.div`
  display: flex;
  align-items: center;
  gap: var(--prism-spacing-2);
  flex-shrink: 0;
`;

const ActionButton = styled.button`
  background: transparent;
  border: none;
  color: currentColor;
  font-size: var(--prism-fontSize-sm);
  font-weight: var(--prism-fontWeight-medium);
  text-decoration: underline;
  cursor: pointer;
  padding: 0;
  
  &:hover {
    text-decoration: none;
  }
  
  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
    border-radius: var(--prism-radius-sm);
  }
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: currentColor;
  cursor: pointer;
  padding: var(--prism-spacing-1);
  border-radius: var(--prism-radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    opacity: 0.7;
  }
  
  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
`;

const ProgressBar = styled(motion.div)<{ variant: ToastVariant }>`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background-color: currentColor;
  opacity: 0.3;
`;

const IconWrapper = styled.div`
  flex-shrink: 0;
  width: 1.25rem;
  height: 1.25rem;
  margin-top: 0.125rem;
`;

const CloseIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const getIcon = (variant: ToastVariant) => {
  switch (variant) {
    case 'success':
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22,4 12,14.01 9,11.01" />
        </svg>
      );
    case 'warning':
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      );
    case 'error':
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      );
    case 'info':
    default:
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      );
  }
};

/**
 * Toast component for displaying temporary notifications.
 * Supports auto-dismiss, custom actions, and accessibility.
 */
export const ToastComponent = ({
  title,
  message,
  variant = 'info',
  duration = 5000,
  action,
  onClose,
}: ToastProps) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (duration <= 0) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev - (100 / (duration / 100));
        if (next <= 0) {
          onClose();
          return 0;
        }
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [duration, onClose]);

  return (
    <ToastContainer
      variant={variant}
      initial={{ opacity: 0, x: 300, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.9 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      role="alert"
      aria-live="polite"
    >
      <IconWrapper>
        {getIcon(variant)}
      </IconWrapper>
      
      <ToastContent>
        {title && (
          <Text
            variant="caption"
            color="secondary"
          >
            {title}
          </Text>
        )}
        <Text variant="caption" color="secondary">
          {message}
        </Text>
      </ToastContent>
      
      <ToastActions>
        {action && (
          <ActionButton onClick={action.onClick}>
            {action.label}
          </ActionButton>
        )}
        <CloseButton onClick={onClose} aria-label="Close notification">
          <CloseIcon />
        </CloseButton>
      </ToastActions>
      
      {duration > 0 && (
        <ProgressBar
          variant={variant}
          initial={{ width: '100%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1, ease: 'linear' }}
        />
      )}
    </ToastContainer>
  );
};

// Toast Provider and Hook for managing toast state
const ToastContext = React.createContext<{
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => string;
  removeToast: (id: string) => void;
  clearToasts: () => void;
} | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const ToastListContainer = styled.div`
  position: fixed;
  top: var(--prism-spacing-4);
  right: var(--prism-spacing-4);
  z-index: var(--prism-zIndex-toast);
  display: flex;
  flex-direction: column;
  gap: var(--prism-spacing-3);
  max-width: 100vw;
  pointer-events: none;
  
  > * {
    pointer-events: auto;
  }
`;

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id };
    setToasts(prev => [...prev, newToast]);
    return id;
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const clearToasts = () => {
    setToasts([]);
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, clearToasts }}>
      {children}
      <ToastListContainer>
        <AnimatePresence>
          {toasts.map(toast => (
            <ToastComponent
              key={toast.id}
              {...toast}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </AnimatePresence>
      </ToastListContainer>
    </ToastContext.Provider>
  );
};