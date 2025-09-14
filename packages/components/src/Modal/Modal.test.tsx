import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Modal } from './Modal';

expect.extend(toHaveNoViolations);

describe('Modal Component', () => {
  const defaultProps = {
    open: true,
    onClose: jest.fn(),
    children: 'Modal content',
  };

  it('renders when open', () => {
    render(<Modal {...defaultProps} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(<Modal {...defaultProps} open={false} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders title when provided', () => {
    render(<Modal {...defaultProps} title="Test Modal" />);
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(<Modal {...defaultProps} onClose={onClose} />);
    
    const closeButton = screen.getByLabelText('Close modal');
    fireEvent.click(closeButton);
    
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when escape key is pressed', () => {
    const onClose = jest.fn();
    render(<Modal {...defaultProps} onClose={onClose} />);
    
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not close on escape when closeOnEscape is false', () => {
    const onClose = jest.fn();
    render(<Modal {...defaultProps} onClose={onClose} closeOnEscape={false} />);
    
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    
    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose when backdrop is clicked', () => {
    const onClose = jest.fn();
    render(<Modal {...defaultProps} onClose={onClose} />);
    
    const backdrop = screen.getByRole('dialog').parentElement;
    fireEvent.click(backdrop!);
    
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not close on backdrop click when closeOnBackdropClick is false', () => {
    const onClose = jest.fn();
    render(
      <Modal {...defaultProps} onClose={onClose} closeOnBackdropClick={false} />
    );
    
    const backdrop = screen.getByRole('dialog').parentElement;
    fireEvent.click(backdrop!);
    
    expect(onClose).not.toHaveBeenCalled();
  });

  it('renders footer when provided', () => {
    const footer = <button>Footer button</button>;
    render(<Modal {...defaultProps} footer={footer} />);
    
    expect(screen.getByText('Footer button')).toBeInTheDocument();
  });

  it('has proper ARIA attributes', () => {
    render(
      <Modal 
        {...defaultProps} 
        title="Test Modal"
        aria-label="Custom label"
      />
    );
    
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-label', 'Custom label');
  });

  it('should not have accessibility violations', async () => {
    const { container } = render(
      <Modal {...defaultProps} title="Accessible Modal" />
    );
    const results = await axe(container);
    
    expect(results).toHaveNoViolations();
  });

  it('should trap focus within modal', () => {
    render(
      <Modal {...defaultProps} title="Focus Test">
        <button>First button</button>
        <button>Second button</button>
      </Modal>
    );
    
    const firstButton = screen.getByText('First button');
    const closeButton = screen.getByLabelText('Close modal');
    
    // Focus should be trapped - tabbing through should cycle within modal
    expect(document.activeElement).toBe(closeButton);
    
    fireEvent.keyDown(closeButton, { key: 'Tab' });
    expect(document.activeElement).toBe(firstButton);
  });

  it('renders different sizes correctly', () => {
    const { rerender } = render(<Modal {...defaultProps} size="sm" />);
    expect(screen.getByRole('dialog')).toHaveClass(/sm/);

    rerender(<Modal {...defaultProps} size="lg" />);
    expect(screen.getByRole('dialog')).toHaveClass(/lg/);

    rerender(<Modal {...defaultProps} size="xl" />);
    expect(screen.getByRole('dialog')).toHaveClass(/xl/);
  });
});