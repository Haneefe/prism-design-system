import { 
  forwardRef, 
  ReactNode, 
  useEffect, 
  MouseEvent, 
  KeyboardEvent 
} from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { motion, AnimatePresence } from 'framer-motion';
import FocusTrap from 'focus-trap-react';
import { Stack, Text, VisuallyHidden } from '@prism/core';

export interface ModalProps {
  /** Whether the modal is open */
  open: boolean;
  /** Function called when modal should close */
  onClose: () => void;
  /** Modal title */
  title?: string;
  /** Modal content */
  children: ReactNode;
  /** Custom header content */
  header?: ReactNode;
  /** Footer content */
  footer?: ReactNode;
  /** Size of the modal */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Whether clicking backdrop should close modal */
  closeOnBackdropClick?: boolean;
  /** Whether pressing Escape should close modal */
  closeOnEscape?: boolean;
  /** Custom aria-label for the modal */
  'aria-label'?: string;
  /** ID of element that labels the modal */
  'aria-labelledby'?: string;
  /** ID of element that describes the modal */
  'aria-describedby'?: string;
}

const sizeStyles = {
  sm: css`
    max-width: 28rem;
  `,
  md: css`
    max-width: 32rem;
  `,
  lg: css`
    max-width: 48rem;
  `,
  xl: css`
    max-width: 64rem;
  `,
};

const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: var(--prism-zIndex-modal);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--prism-spacing-4);
  overflow-y: auto;
`;

const ModalContainer = styled(motion.div)<{ size: NonNullable<ModalProps['size']> }>`
  position: relative;
  background-color: var(--prism-color-background-primary);
  border-radius: var(--prism-radius-lg);
  box-shadow: var(--prism-shadow-2xl);
  width: 100%;
  max-height: calc(100vh - var(--prism-spacing-8));
  overflow: hidden;
  display: flex;
  flex-direction: column;
  
  ${props => sizeStyles[props.size]}
`;

const ModalHeader = styled.div`
  padding: var(--prism-spacing-6);
  border-bottom: 1px solid var(--prism-color-border-primary);
  flex-shrink: 0;
`;

const ModalBody = styled.div`
  padding: var(--prism-spacing-6);
  flex: 1;
  overflow-y: auto;
`;

const ModalFooter = styled.div`
  padding: var(--prism-spacing-6);
  border-top: 1px solid var(--prism-color-border-primary);
  flex-shrink: 0;
`;

const CloseButton = styled.button`
  position: absolute;
  top: var(--prism-spacing-4);
  right: var(--prism-spacing-4);
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: var(--prism-radius-base);
  color: var(--prism-color-text-secondary);
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  
  &:hover {
    background-color: var(--prism-color-background-secondary);
    color: var(--prism-color-text-primary);
  }
  
  &:focus-visible {
    outline: 2px solid var(--prism-color-border-focus);
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
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

/**
 * Modal component with focus trap, backdrop, and smooth animations.
 * Follows accessibility best practices with proper ARIA attributes and keyboard navigation.
 */
export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({
    open,
    onClose,
    title,
    children,
    header,
    footer,
    size = 'md',
    closeOnBackdropClick = true,
    closeOnEscape = true,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
  }, ref) => {
    // Handle escape key
    useEffect(() => {
      if (!open || !closeOnEscape) return;

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape as any);
      return () => document.removeEventListener('keydown', handleEscape as any);
    }, [open, closeOnEscape, onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
      if (open) {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = originalStyle;
        };
      }
    }, [open]);

    const handleBackdropClick = (event: MouseEvent) => {
      if (!closeOnBackdropClick) return;
      if (event.target === event.currentTarget) {
        onClose();
      }
    };

    const modalId = ariaLabelledBy || `modal-${Math.random().toString(36).substr(2, 9)}`;
    const titleId = title ? `${modalId}-title` : undefined;
    const descriptionId = ariaDescribedBy || `${modalId}-content`;

    return (
      <AnimatePresence>
        {open && (
          <FocusTrap>
            <Backdrop
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={handleBackdropClick}
            >
              <ModalContainer
                ref={ref}
                size={size}
                role="dialog"
                aria-modal="true"
                aria-label={ariaLabel}
                aria-labelledby={titleId || ariaLabelledBy}
                aria-describedby={descriptionId}
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ 
                  duration: 0.2,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                <CloseButton
                  onClick={onClose}
                  aria-label="Close modal"
                  type="button"
                >
                  <CloseIcon />
                </CloseButton>

                {(header || title) && (
                  <ModalHeader>
                    {header || (
                      <Text
                        id={titleId}
                        variant="h3"
                        color="primary"
                      >
                        {title}
                      </Text>
                    )}
                  </ModalHeader>
                )}

                <ModalBody id={descriptionId}>
                  {children}
                </ModalBody>

                {footer && (
                  <ModalFooter>
                    {footer}
                  </ModalFooter>
                )}
              </ModalContainer>
            </Backdrop>
          </FocusTrap>
        )}
      </AnimatePresence>
    );
  }
);

Modal.displayName = 'Modal';