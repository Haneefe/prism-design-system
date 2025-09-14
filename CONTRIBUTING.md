# Contributing to Prism Design System

Thank you for your interest in contributing to Prism Design System! This guide will help you get started with contributing to the project.

## 🤝 Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](./CODE_OF_CONDUCT.md). Please read it before contributing.

## 🎯 How to Contribute

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected vs actual behavior**
- **Screenshots** if applicable
- **Environment details** (OS, Node version, browser)
- **Code sample** demonstrating the issue

Use this template:

```markdown
**Bug Description**
A clear description of the bug.

**To Reproduce**

1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**

- OS: [e.g. macOS, Windows]
- Node: [e.g. 18.17.0]
- Browser: [e.g. Chrome 115]
- Package Version: [e.g. @prism/components@1.2.0]
```

### Suggesting Features

Feature requests are welcome! Please provide:

- **Clear use case** for the feature
- **Detailed description** of the proposed solution
- **Examples** of similar implementations
- **Alternatives considered**

### Contributing Code

#### Development Setup

1. **Fork the repository**

   ```bash
   git clone https://github.com/your-username/prism-design-system.git
   cd prism-design-system
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Generate design tokens**

   ```bash
   pnpm generate:tokens
   ```

4. **Start development environment**
   ```bash
   pnpm dev
   ```

#### Making Changes

1. **Create a branch**

   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes**
   - Follow our [coding standards](#coding-standards)
   - Add tests for new functionality
   - Update documentation as needed

3. **Test your changes**

   ```bash
   pnpm test
   pnpm lint
   pnpm typecheck
   ```

4. **Create a changeset**

   ```bash
   pnpm changeset
   ```

   Select the packages affected and describe your changes.

5. **Commit your changes**

   ```bash
   git add .
   git commit -m "feat(components): add new DatePicker component"
   ```

6. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

## 🎨 Adding New Components

### Component Structure

New components should follow this structure:

```
packages/components/src/ComponentName/
├── ComponentName.tsx          # Main component
├── ComponentName.test.tsx     # Tests
├── ComponentName.stories.tsx  # Storybook stories
├── index.ts                   # Exports
└── types.ts                   # TypeScript types
```

### Component Template

```tsx
// ComponentName.tsx
import React from 'react';
import { Box } from '@prism/core';
import { ComponentNameProps } from './types';

export const ComponentName = React.forwardRef<
  HTMLDivElement,
  ComponentNameProps
>(({ children, variant = 'default', ...props }, ref) => {
  return (
    <Box ref={ref} data-testid="component-name" {...props}>
      {children}
    </Box>
  );
});

ComponentName.displayName = 'ComponentName';
```

### Component Guidelines

1. **Accessibility First**
   - Include proper ARIA attributes
   - Support keyboard navigation
   - Test with screen readers
   - Add accessibility tests

2. **TypeScript Support**
   - Export all prop types
   - Use generic types where appropriate
   - Document complex types

3. **Theme Integration**
   - Use design tokens for styling
   - Support theme variants
   - Respect dark/light mode

4. **Performance**
   - Use React.forwardRef for DOM refs
   - Optimize re-renders with React.memo if needed
   - Keep bundle size minimal

### Testing Requirements

Every component must include:

1. **Unit Tests**

   ```tsx
   // ComponentName.test.tsx
   import { render, screen } from '@testing-library/react';
   import { axe } from 'jest-axe';
   import { ComponentName } from './ComponentName';

   describe('ComponentName', () => {
     it('renders correctly', () => {
       render(<ComponentName>Test</ComponentName>);
       expect(screen.getByTestId('component-name')).toBeInTheDocument();
     });

     it('has no accessibility violations', async () => {
       const { container } = render(<ComponentName>Test</ComponentName>);
       const results = await axe(container);
       expect(results).toHaveNoViolations();
     });
   });
   ```

2. **Storybook Stories**

   ```tsx
   // ComponentName.stories.tsx
   import type { Meta, StoryObj } from '@storybook/react';
   import { ComponentName } from './ComponentName';

   const meta: Meta<typeof ComponentName> = {
     title: 'Components/ComponentName',
     component: ComponentName,
     parameters: {
       docs: { description: { component: 'Component description' } },
     },
   };

   export default meta;
   type Story = StoryObj<typeof meta>;

   export const Default: Story = {
     args: {
       children: 'Default ComponentName',
     },
   };
   ```

## 📝 Coding Standards

### TypeScript Guidelines

- Use strict TypeScript configuration
- Prefer interfaces over types for object shapes
- Export all public types and interfaces
- Use meaningful names for generic parameters

```tsx
// Good
interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

// Avoid
type ButtonProps = {
  variant?: string;
  size?: string;
} & ComponentProps<'button'>;
```

### React Patterns

- Use functional components with hooks
- Implement forwardRef for components that render DOM elements
- Use React.memo sparingly, only when performance issues are identified
- Prefer composition over inheritance

```tsx
// Good
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <button ref={ref} {...props}>
        {children}
      </button>
    );
  }
);

// Avoid
export const Button = (props: ButtonProps) => {
  return <button {...props}>{props.children}</button>;
};
```

### Styling Guidelines

- Use design tokens from `@prism/tokens`
- Follow mobile-first responsive design
- Prefer CSS custom properties for runtime theming
- Use Emotion's `sx` prop for component-specific styles

```tsx
// Good
<Box
  sx={{
    padding: 'var(--prism-spacing-md)',
    backgroundColor: 'var(--prism-colors-primary-500)',
    borderRadius: 'var(--prism-radius-md)'
  }}
/>

// Avoid
<Box
  sx={{
    padding: '16px',
    backgroundColor: '#3b82f6',
    borderRadius: '8px'
  }}
/>
```

### Accessibility Guidelines

- Include meaningful `aria-label` or `aria-labelledby`
- Support keyboard navigation
- Provide focus indicators
- Test with automated tools (jest-axe)
- Manual testing with screen readers

```tsx
// Good
<button
  aria-label="Close dialog"
  onClick={onClose}
  onKeyDown={handleKeyDown}
>
  <CloseIcon aria-hidden="true" />
</button>

// Avoid
<button onClick={onClose}>
  <CloseIcon />
</button>
```

## 🧪 Testing Guidelines

### Test Categories

1. **Unit Tests**: Component behavior and props
2. **Integration Tests**: Component interactions
3. **Accessibility Tests**: WCAG compliance
4. **Visual Tests**: Prevent UI regressions

### Test Coverage Requirements

- **Minimum 90% code coverage**
- **All public APIs tested**
- **Accessibility compliance verified**
- **Error states handled**

### Testing Best Practices

```tsx
// Good: Descriptive test names
describe('Button component', () => {
  it('calls onClick handler when clicked', () => {
    // test implementation
  });

  it('shows loading state when loading prop is true', () => {
    // test implementation
  });

  it('is accessible to screen readers', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

// Avoid: Vague test names
describe('Button', () => {
  it('works', () => {
    // test implementation
  });
});
```

## 📚 Documentation Guidelines

### Storybook Stories

- Include all component variants
- Document props with descriptions
- Provide interactive examples
- Include accessibility notes

### README Files

Each package should include:

- Clear installation instructions
- Basic usage examples
- API documentation
- Migration guides for breaking changes

### Code Comments

- Document complex logic and algorithms
- Explain accessibility implementations
- Note performance considerations
- Include links to relevant specifications

## 🔄 Release Process

### Changesets

We use [Changesets](https://github.com/changesets/changesets) for version management:

1. **Create changeset**

   ```bash
   pnpm changeset
   ```

2. **Select packages** affected by your changes

3. **Choose change type**:
   - `patch`: Bug fixes
   - `minor`: New features
   - `major`: Breaking changes

4. **Write description** of changes

### Version Types

- **Patch (1.0.1)**: Bug fixes, documentation updates
- **Minor (1.1.0)**: New features, non-breaking changes
- **Major (2.0.0)**: Breaking changes, API modifications

## 🚨 Breaking Changes

When introducing breaking changes:

1. **Document the change** in the changeset
2. **Provide migration guide** in the description
3. **Update examples** and documentation
4. **Consider deprecation** warnings first

## ❓ Getting Help

- **GitHub Discussions**: General questions and ideas
- **GitHub Issues**: Bug reports and feature requests
- **Discord**: Real-time community chat (link in README)

## 🎉 Recognition

Contributors will be:

- Added to the contributors list
- Mentioned in release notes
- Eligible for maintainer roles

Thank you for contributing to Prism Design System! 🙏
