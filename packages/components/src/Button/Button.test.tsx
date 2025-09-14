import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from './Button';

expect.extend(toHaveNoViolations);

describe('Button Component', () => {
  it('renders with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('can be disabled', () => {
    render(<Button disabled>Disabled button</Button>);
    const button = screen.getByRole('button');
    
    expect(button).toBeDisabled();
  });

  it('shows loading state', () => {
    render(<Button loading>Loading button</Button>);
    const button = screen.getByRole('button');
    
    expect(button).toBeDisabled();
  });

  it('renders different variants', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass(/primary/);

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass(/secondary/);

    rerender(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole('button')).toHaveClass(/ghost/);

    rerender(<Button variant="destructive">Destructive</Button>);
    expect(screen.getByRole('button')).toHaveClass(/destructive/);
  });

  it('renders different sizes', () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button')).toHaveClass(/sm/);

    rerender(<Button size="md">Medium</Button>);
    expect(screen.getByRole('button')).toHaveClass(/md/);

    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button')).toHaveClass(/lg/);
  });

  it('supports polymorphic rendering', () => {
    render(<Button as="a" href="/test">Link button</Button>);
    const link = screen.getByRole('link');
    
    expect(link).toHaveAttribute('href', '/test');
    expect(link).toHaveTextContent('Link button');
  });

  it('renders icons correctly', () => {
    render(
      <Button leftIcon="👈" rightIcon="👉">
        With icons
      </Button>
    );
    
    expect(screen.getByText('👈')).toBeInTheDocument();
    expect(screen.getByText('👉')).toBeInTheDocument();
    expect(screen.getByText('With icons')).toBeInTheDocument();
  });

  it('should not have accessibility violations', async () => {
    const { container } = render(<Button>Accessible button</Button>);
    const results = await axe(container);
    
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations when disabled', async () => {
    const { container } = render(<Button disabled>Disabled button</Button>);
    const results = await axe(container);
    
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations in loading state', async () => {
    const { container } = render(<Button loading>Loading button</Button>);
    const results = await axe(container);
    
    expect(results).toHaveNoViolations();
  });
});