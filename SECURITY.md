# Security Policy

## Supported Versions

We currently support the following versions of Prism Design System with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take security issues seriously. If you discover a security vulnerability in Prism Design System, please follow these steps:

### 🔒 Private Disclosure

**DO NOT** create a public GitHub issue for security vulnerabilities.

Instead, please:

1. **Email us**: Send details to security@prism-design-system.com
2. **Include**:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Any suggested fixes

### 📋 What to Include

Your security report should contain:

- **Component/Package affected**
- **Vulnerability type** (XSS, injection, etc.)
- **Attack vector** and reproduction steps
- **Impact assessment** (data exposure, privilege escalation, etc.)
- **Proof of concept** (if applicable)
- **Suggested mitigation** (if known)

### ⏱️ Response Timeline

- **Initial response**: Within 48 hours
- **Status update**: Within 7 days
- **Fix timeline**: Varies by severity
  - Critical: 1-3 days
  - High: 1-2 weeks
  - Medium: 2-4 weeks
  - Low: Next minor release

### 🏆 Recognition

We believe in recognizing security researchers who help keep our users safe:

- **Security acknowledgments** in release notes
- **Hall of Fame** listing (if desired)
- **Coordinated disclosure** timeline
- **CVE assignment** for significant vulnerabilities

### 🛡️ Security Best Practices

When using Prism Design System:

1. **Keep dependencies updated**

   ```bash
   pnpm update @prism/components @prism/tokens @prism/core
   ```

2. **Content Security Policy**

   ```html
   <meta
     http-equiv="Content-Security-Policy"
     content="default-src 'self'; style-src 'self' 'unsafe-inline';"
   />
   ```

3. **Sanitize user input** when using dynamic content

   ```tsx
   // Good: Sanitized content
   <Text>{sanitizeHtml(userContent)}</Text>

   // Avoid: Raw HTML injection
   <Text dangerouslySetInnerHTML={{__html: userContent}} />
   ```

4. **Validate props** and component inputs
5. **Use TypeScript** for additional type safety
6. **Regular security audits** with tools like `npm audit`

### 🔍 Security Considerations

Our components are designed with security in mind:

- **XSS Prevention**: HTML is escaped by default
- **Injection Protection**: No `eval()` or dynamic code execution
- **Input Validation**: TypeScript interfaces enforce prop types
- **Dependency Management**: Regular security updates
- **Content Security**: Compatible with strict CSP policies

### 📞 Contact Information

- **Security Email**: security@prism-design-system.com
- **PGP Key**: [Available on request]
- **Response Team**: Core maintainers and security specialists

---

Thank you for helping keep Prism Design System secure! 🔒
