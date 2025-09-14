import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const tokensDir = join(__dirname, '../tokens');
const distDir = join(__dirname, '../dist');
const srcDir = join(__dirname, '../src');

// Ensure dist directory exists
mkdirSync(distDir, { recursive: true });

// Token file mappings
const tokenFiles = {
  color: 'color.json',
  typography: 'typography.json',
  spacing: 'spacing.json',
  radius: 'radius.json',
  shadow: 'shadow.json',
  zindex: 'zindex.json',
  breakpoints: 'breakpoints.json',
};

// Load all token files
const tokens: Record<string, any> = {};
for (const [key, filename] of Object.entries(tokenFiles)) {
  const filePath = join(tokensDir, filename);
  const content = readFileSync(filePath, 'utf-8');
  tokens[key] = JSON.parse(content);
}

// Generate CSS variables from tokens
function generateCSSVariables(tokenObj: any, prefix = ''): string {
  let css = '';
  
  for (const [key, value] of Object.entries(tokenObj)) {
    const varName = prefix ? `${prefix}-${key}` : key;
    
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      css += generateCSSVariables(value, varName);
    } else {
      const cssValue = Array.isArray(value) ? value.join(', ') : value;
      css += `  --prism-${varName}: ${cssValue};\n`;
    }
  }
  
  return css;
}

// Generate CSS file
let cssContent = `/* Auto-generated CSS variables from design tokens */\n\n`;

// Light theme (default)
cssContent += `:root {\n`;
cssContent += generateCSSVariables(tokens.color.light, 'color');
cssContent += generateCSSVariables(tokens.typography);
cssContent += generateCSSVariables(tokens.spacing);
cssContent += generateCSSVariables(tokens.radius);
cssContent += generateCSSVariables(tokens.shadow);
cssContent += generateCSSVariables(tokens.zindex);
cssContent += generateCSSVariables(tokens.breakpoints);
cssContent += `}\n\n`;

// Dark theme
cssContent += `.theme-dark {\n`;
cssContent += generateCSSVariables(tokens.color.dark, 'color');
cssContent += `}\n\n`;

// Media query helpers
cssContent += `/* Breakpoint media queries */\n`;
for (const [name, value] of Object.entries(tokens.breakpoints.breakpoints)) {
  if (name !== 'xs') {
    cssContent += `@media (min-width: ${value}) {\n`;
    cssContent += `  .breakpoint-${name} {\n`;
    cssContent += `    --prism-current-breakpoint: ${name};\n`;
    cssContent += `  }\n`;
    cssContent += `}\n\n`;
  }
}

// RTL support utilities
cssContent += `/* RTL support utilities */\n`;
cssContent += `[dir="rtl"] {\n`;
cssContent += `  --prism-text-align-start: right;\n`;
cssContent += `  --prism-text-align-end: left;\n`;
cssContent += `  --prism-margin-inline-start: margin-right;\n`;
cssContent += `  --prism-margin-inline-end: margin-left;\n`;
cssContent += `  --prism-padding-inline-start: padding-right;\n`;
cssContent += `  --prism-padding-inline-end: padding-left;\n`;
cssContent += `}\n\n`;

cssContent += `[dir="ltr"], :not([dir]) {\n`;
cssContent += `  --prism-text-align-start: left;\n`;
cssContent += `  --prism-text-align-end: right;\n`;
cssContent += `  --prism-margin-inline-start: margin-left;\n`;
cssContent += `  --prism-margin-inline-end: margin-right;\n`;
cssContent += `  --prism-padding-inline-start: padding-left;\n`;
cssContent += `  --prism-padding-inline-end: padding-right;\n`;
cssContent += `}\n`;

// Write CSS file
writeFileSync(join(distDir, 'variables.css'), cssContent);

// Generate TypeScript exports
function generateTSExports(tokenObj: any, prefix = ''): string {
  let ts = '';
  
  for (const [key, value] of Object.entries(tokenObj)) {
    const propName = prefix ? `${prefix}${key.charAt(0).toUpperCase() + key.slice(1)}` : key;
    
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      ts += generateTSExports(value, propName);
    } else {
      const tsValue = Array.isArray(value) 
        ? `[${value.map(v => JSON.stringify(v)).join(', ')}]`
        : JSON.stringify(value);
      // Quote property names that contain dots or special characters
      const quotedPropName = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(propName) ? propName : `"${propName}"`;
      ts += `  ${quotedPropName}: ${tsValue},\n`;
    }
  }
  
  return ts;
}

let tsContent = `/* Auto-generated TypeScript exports from design tokens */\n\n`;

tsContent += `export const colorTokens = {\n`;
tsContent += `  light: {\n`;
tsContent += generateTSExports(tokens.color.light, '    ');
tsContent += `  },\n`;
tsContent += `  dark: {\n`;
tsContent += generateTSExports(tokens.color.dark, '    ');
tsContent += `  },\n`;
tsContent += `} as const;\n\n`;

tsContent += `export const typographyTokens = {\n`;
tsContent += generateTSExports(tokens.typography);
tsContent += `} as const;\n\n`;

tsContent += `export const spacingTokens = {\n`;
tsContent += generateTSExports(tokens.spacing);
tsContent += `} as const;\n\n`;

tsContent += `export const radiusTokens = {\n`;
tsContent += generateTSExports(tokens.radius);
tsContent += `} as const;\n\n`;

tsContent += `export const shadowTokens = {\n`;
tsContent += generateTSExports(tokens.shadow);
tsContent += `} as const;\n\n`;

tsContent += `export const zIndexTokens = {\n`;
tsContent += generateTSExports(tokens.zindex);
tsContent += `} as const;\n\n`;

tsContent += `export const breakpointTokens = {\n`;
tsContent += generateTSExports(tokens.breakpoints);
tsContent += `} as const;\n\n`;

tsContent += `export const tokens = {\n`;
tsContent += `  color: colorTokens,\n`;
tsContent += `  typography: typographyTokens,\n`;
tsContent += `  spacing: spacingTokens,\n`;
tsContent += `  radius: radiusTokens,\n`;
tsContent += `  shadow: shadowTokens,\n`;
tsContent += `  zIndex: zIndexTokens,\n`;
tsContent += `  breakpoints: breakpointTokens,\n`;
tsContent += `} as const;\n\n`;

tsContent += `export type ColorTokens = typeof colorTokens;\n`;
tsContent += `export type TypographyTokens = typeof typographyTokens;\n`;
tsContent += `export type SpacingTokens = typeof spacingTokens;\n`;
tsContent += `export type RadiusTokens = typeof radiusTokens;\n`;
tsContent += `export type ShadowTokens = typeof shadowTokens;\n`;
tsContent += `export type ZIndexTokens = typeof zIndexTokens;\n`;
tsContent += `export type BreakpointTokens = typeof breakpointTokens;\n`;
tsContent += `export type Tokens = typeof tokens;\n`;

// Write TypeScript file to src directory
writeFileSync(join(srcDir, 'tokens.ts'), tsContent);

console.log('✅ Generated CSS variables and TypeScript exports from design tokens');