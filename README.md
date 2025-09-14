# 🎨 Prism Design System

A production-ready, accessible React design system with comprehensive theming, animations, and developer experience.

![Build Status](https://github.com/your-org/prism-design-system/workflows/CI/badge.svg)
![Coverage](https://codecov.io/gh/your-org/prism-design-system/branch/main/graph/badge.svg)
![Version](https://img.shields.io/npm/v/@prism/components)
![License](https://img.shields.io/npm/l/@prism/components)

## ✨ Features

- 🎯 **Production-Ready**: Battle-tested components with comprehensive TypeScript support
- ♿ **Accessibility First**: WCAG 2.1 AA compliant with automated testing via jest-axe
- 🎭 **Theming System**: Light/dark themes with CSS custom properties and runtime switching
- 📱 **Responsive Design**: Mobile-first approach with flexible breakpoint system
- 🌍 **RTL Support**: Full right-to-left language support built-in
- ⚡ **Performance**: Tree-shakeable components with minimal bundle impact
- 🎬 **Smooth Animations**: Framer Motion integration for delightful micro-interactions
- 📚 **Comprehensive Docs**: Interactive Storybook with live examples
- 🧪 **Tested**: 95%+ test coverage with visual regression testing
- 🔧 **Developer Experience**: TypeScript-first with excellent IDE support

## 📦 Packages

| Package                                      | Description                                 | Version                                                |
| -------------------------------------------- | ------------------------------------------- | ------------------------------------------------------ |
| [`@prism/tokens`](./packages/tokens)         | Design tokens (colors, typography, spacing) | ![npm](https://img.shields.io/npm/v/@prism/tokens)     |
| [`@prism/core`](./packages/core)             | Core primitives and utilities               | ![npm](https://img.shields.io/npm/v/@prism/core)       |
| [`@prism/components`](./packages/components) | Complete component library                  | ![npm](https://img.shields.io/npm/v/@prism/components) |

## 🚀 Quick Start

### Installation

```bash
npm install @prism/components @prism/tokens
# or
pnpm add @prism/components @prism/tokens
# or
yarn add @prism/components @prism/tokens
```

### Setup

```tsx
import { ThemeProvider } from '@prism/components';
import '@prism/tokens/dist/css/variables.css';

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}
```

### Basic Usage

```tsx
import { Button, Input, Stack, Card } from '@prism/components';

function LoginForm() {
  return (
    <Card p="lg">
      <Stack spacing="md">
        <Input label="Email" type="email" />
        <Input label="Password" type="password" />
        <Button variant="primary" size="lg" fullWidth>
          Sign In
        </Button>
      </Stack>
    </Card>
  );
}
```

## 🎨 Design System

### Theme Structure

```typescript
const theme = {
  colors: {
    primary: { 50: '#f0f9ff', 500: '#3b82f6', 900: '#1e3a8a' },
    gray: { 50: '#f9fafb', 500: '#6b7280', 900: '#111827' },
  },
  typography: {
    fonts: { sans: 'Inter, sans-serif' },
    sizes: { sm: '14px', base: '16px', lg: '18px' },
  },
  spacing: { sm: '8px', md: '16px', lg: '24px' },
  radius: { sm: '4px', md: '8px', lg: '12px' },
};
```

### Component Variants

All components support systematic variants for consistent design:

```tsx
// Button variants
<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="outline">Outline Style</Button>
<Button variant="ghost">Subtle Action</Button>

// Input states
<Input state="default" />
<Input state="error" errorMessage="Required field" />
<Input state="success" />
```

## 🧪 Development

### Prerequisites

- Node.js 18+
- pnpm 8+

### Getting Started

```bash
# Clone the repository
git clone https://github.com/your-org/prism-design-system.git
cd prism-design-system

# Install dependencies
pnpm install

# Generate design tokens
pnpm generate:tokens

# Start development
pnpm dev

# Run tests
pnpm test

# Build packages
pnpm build
```

### Available Scripts

- `pnpm dev` - Start Storybook development server
- `pnpm build` - Build all packages
- `pnpm test` - Run test suite with coverage
- `pnpm lint` - Run ESLint
- `pnpm typecheck` - Type check all packages
- `pnpm generate:tokens` - Generate CSS from design tokens
- `pnpm changeset` - Create a changeset for release

### Monorepo Structure

```
prism-design-system/
├── packages/
│   ├── tokens/          # Design tokens and CSS generation
│   ├── core/           # Core primitives and utilities
│   └── components/     # Complete component library
├── examples/
│   └── dashboard/      # Example dashboard application
├── docs/              # Generated documentation
└── .storybook/        # Storybook configuration
```

## 📚 Documentation

### Storybook

Interactive component documentation is available at:

- **Production**: [https://prism-design-system.vercel.app](https://prism-design-system.vercel.app)
- **Local**: Run `pnpm dev` and visit `http://localhost:6006`

### Examples

- **Dashboard**: [Live Demo](https://prism-design-system.vercel.app/dashboard) | [Source](./examples/dashboard)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Development Workflow

1. **Fork & Clone**: Fork the repository and clone your fork
2. **Branch**: Create a feature branch (`git checkout -b feature/amazing-feature`)
3. **Develop**: Make your changes with tests and documentation
4. **Test**: Run `pnpm test` and `pnpm lint`
5. **Changeset**: Run `pnpm changeset` to document your changes
6. **Pull Request**: Open a PR with a clear description

### Commit Convention

We use [Conventional Commits](https://conventionalcommits.org/):

```
feat(components): add new DatePicker component
fix(tokens): correct color contrast ratios
docs(storybook): update Button examples
```

## 🔧 Architecture

### Design Principles

1. **Composability**: Components work together seamlessly
2. **Accessibility**: WCAG 2.1 AA compliance by default
3. **Performance**: Minimal runtime overhead
4. **Developer Experience**: TypeScript-first with intuitive APIs
5. **Flexibility**: Customizable without complexity

### Technical Decisions

- **Emotion**: CSS-in-JS for component styling with theme integration
- **TypeScript**: Strict mode for maximum type safety
- **Framer Motion**: Declarative animations with reduced bundle impact
- **Jest + RTL**: Comprehensive testing including accessibility validation
- **Storybook**: Component documentation and visual testing
- **pnpm**: Fast, efficient monorepo package management

## 📈 Roadmap

### Version 1.x

- [x] Core component library
- [x] Design token system
- [x] Accessibility compliance
- [x] Theme system with dark mode
- [x] Comprehensive documentation

### Version 2.x

- [ ] Advanced data components (DataTable, Calendar)
- [ ] Form validation library integration
- [ ] Advanced animation system
- [ ] Mobile-specific optimizations
- [ ] Additional design themes

### Future

- [ ] React Native component parity
- [ ] Figma design kit integration
- [ ] Advanced accessibility features
- [ ] Performance optimization tooling

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

## 🙏 Acknowledgments

- [Radix UI](https://radix-ui.com) - Accessibility primitives inspiration
- [Chakra UI](https://chakra-ui.com) - Theme system architecture
- [Mantine](https://mantine.dev) - Component API design patterns
- [React Aria](https://react-spectrum.adobe.com/react-aria/) - Accessibility best practices

---

<div align="center">
  <strong>Built with ❤️ by the Prism Design System team</strong>
</div>
