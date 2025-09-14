# @prism/tokens

Design tokens for the Prism Design System, providing a consistent foundation for colors, typography, spacing, and other design properties.

## Installation

```bash
pnpm add @prism/tokens
```

## Usage

### CSS Variables

Import the CSS variables in your application:

```css
@import '@prism/tokens/dist/variables.css';
```

Or in your JavaScript/TypeScript:

```typescript
import '@prism/tokens/dist/variables.css';
```

### TypeScript Tokens

Import and use typed tokens in your components:

```typescript
import { tokens, colorTokens, spacingTokens } from '@prism/tokens';

// Access specific token values
const primaryColor = colorTokens.light.primary[500];
const mediumSpacing = spacingTokens.spacing[4];

// Use with CSS-in-JS libraries
const buttonStyles = {
  backgroundColor: `var(--prism-color-primary-500)`,
  padding: `var(--prism-spacing-2) var(--prism-spacing-4)`,
  borderRadius: `var(--prism-radius-base)`,
};
```

## Theming

### Light and Dark Modes

The design system supports automatic theme switching:

```css
/* Light theme is applied by default via :root */
:root {
  --prism-color-background-primary: #ffffff;
  /* ... other light theme tokens */
}

/* Dark theme is applied when .theme-dark class is present */
.theme-dark {
  --prism-color-background-primary: #020617;
  /* ... other dark theme tokens */
}
```

Apply dark theme by adding the class to your document:

```javascript
document.documentElement.classList.toggle('theme-dark');
```

### Custom Token Overrides

You can override any token by redefining the CSS variable:

```css
:root {
  /* Override primary color */
  --prism-color-primary-500: #8b5cf6;

  /* Override spacing scale */
  --prism-spacing-4: 1.5rem;
}

/* Theme-specific overrides */
.theme-dark {
  --prism-color-primary-500: #a78bfa;
}
```

## RTL Support

The tokens include RTL (Right-to-Left) support utilities:

```css
/* Automatically switches based on dir attribute */
[dir='rtl'] {
  --prism-text-align-start: right;
  --prism-text-align-end: left;
}

[dir='ltr'] {
  --prism-text-align-start: left;
  --prism-text-align-end: right;
}
```

Use in your styles:

```css
.my-component {
  text-align: var(--prism-text-align-start);
  margin-inline-start: var(--prism-spacing-4);
}
```

## Token Categories

### Colors

- **Primary**: Main brand colors with 50-950 scale
- **Neutral**: Grayscale colors for text and backgrounds
- **Success/Warning/Error**: Semantic colors for states
- **Background**: Page and surface backgrounds
- **Text**: Text colors with hierarchy
- **Border**: Border and outline colors

### Typography

- **Font Family**: Sans-serif and monospace stacks
- **Font Size**: Responsive type scale from xs to 9xl
- **Font Weight**: Weight scale from thin to black
- **Line Height**: Leading values for optimal readability
- **Letter Spacing**: Tracking adjustments

### Spacing

- **Spacing Scale**: Consistent spacing from 0 to 96 (24rem)
- Based on 0.25rem (4px) increments

### Border Radius

- **Radius Scale**: From none to full (rounded)
- Includes base, md, lg, xl sizes

### Shadows

- **Elevation Scale**: Drop shadows from xs to 2xl
- Includes inner shadow and none options

### Z-Index

- **Layer Management**: Semantic z-index values
- Includes dropdown, modal, toast, tooltip layers

### Breakpoints

- **Responsive Scale**: Mobile-first breakpoints
- xs, sm, md, lg, xl, 2xl sizes

## Building

The tokens are generated from JSON files in the `tokens/` directory:

```bash
# Generate CSS variables and TypeScript exports
pnpm generate-css

# Build the package
pnpm build
```

## Contributing

When adding or modifying tokens:

1. Update the appropriate JSON file in `tokens/`
2. Run `pnpm generate-css` to regenerate outputs
3. Test in components to ensure accessibility compliance
4. Update documentation as needed

### Color Guidelines

- Ensure contrast ratios meet WCAG AA standards (4.5:1 for normal text)
- Test both light and dark theme variants
- Provide semantic color mappings for consistent usage
