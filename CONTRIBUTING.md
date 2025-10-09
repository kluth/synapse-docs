# Contributing to Synapse

Thank you for your interest in contributing to Synapse! This document provides guidelines and instructions for contributing to this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Zero-Dependency Philosophy](#zero-dependency-philosophy)
- [Getting Started](#getting-started)
- [Issue-Based Development](#issue-based-development)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing Requirements](#testing-requirements)
- [Pull Request Process](#pull-request-process)
- [Documentation](#documentation)
- [Community](#community)

---

## Code of Conduct

We are committed to providing a welcoming and inclusive environment. All contributors are expected to:

- Be respectful and considerate
- Welcome newcomers and help them get started
- Focus on constructive feedback
- Accept responsibility and apologize when mistakes are made
- Focus on what is best for the community

---

## Zero-Dependency Philosophy

**CRITICAL**: Synapse maintains a **zero external dependency** policy for all core packages.

### Why Zero Dependencies?

- ✅ **No Supply Chain Attacks**: Every line of code is ours
- ✅ **No Breaking Changes**: We control the entire stack
- ✅ **Predictable Behavior**: No mysterious bugs from dependencies
- ✅ **Smaller Bundle Sizes**: Only what you need
- ✅ **Long-Term Stability**: No abandoned dependencies
- ✅ **Faster Installation**: No deep dependency trees

### What This Means for Contributors

```typescript
// ✅ GOOD - Pure Synapse, zero deps
import { http } from '@snps/http-client';
import { array } from '@snps/utils';

// ❌ BAD - External dependency
import axios from 'axios';
import lodash from 'lodash';
```

### Implementation Guidelines

1. **Use Native APIs**: Leverage built-in browser/Node.js APIs
2. **Pure TypeScript**: Write everything in TypeScript
3. **Web Standards**: Follow web standards for compatibility
4. **Internal Sharing**: Reuse code across packages internally only
5. **Build-Time Only**: Only TypeScript and testing tools in `devDependencies`

### When External Packages Are Needed

For platform integrations (Firebase, Azure, AWS), we **wrap** their SDKs:
- Users import from `@snps/backend-hub`
- We manage the external SDK internally
- Users never touch external packages directly
- We handle breaking changes

---

## Getting Started

### Prerequisites

- **Node.js**: 18.0.0 or higher
- **pnpm**: Latest version (this project uses pnpm exclusively)
- **Git**: Latest version
- **GitHub CLI**: `gh` for issue and PR management

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/kluth/Synapse-[package-name].git
cd Synapse-[package-name]

# Install dependencies
pnpm install

# Build the package
pnpm build

# Run tests
pnpm test

# Watch mode for development
pnpm dev
```

---

## Issue-Based Development

**MANDATORY**: All changes must be linked to a GitHub issue.

### Before Starting Work

1. **Find or Create an Issue**
   ```bash
   # Search existing issues
   gh issue list

   # Create new issue
   gh issue create --title "Feature: implement X" --body "Description..."
   ```

2. **Issue Must Include**:
   - Clear description of feature/fix
   - Success criteria (checkbox list)
   - Related BLUEPRINT.md section
   - Difficulty level (Easy/Medium/Hard)
   - Priority level (Low/Medium/High/Critical)

3. **Label Simple Issues**:
   - Tag beginner-friendly issues with `good-first-issue`

### Finding Issues to Work On

```bash
# View all open issues
gh issue list

# View good first issues
gh issue list --label "good-first-issue"

# View by priority
gh issue list --label "high-priority"
```

---

## Development Workflow

### 1. Create Feature Branch

```bash
# Always create from latest main
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/issue-<number>-<short-description>
```

**Branch Naming Convention**:
- Features: `feature/issue-<number>-<description>`
- Fixes: `fix/issue-<number>-<description>`
- Docs: `docs/issue-<number>-<description>`

Examples:
- `feature/issue-1-http-client`
- `fix/issue-42-validation-bug`
- `docs/issue-10-api-documentation`

### 2. Make Your Changes

```bash
# Make changes
# ... edit files ...

# Build to check for errors
pnpm build

# Run tests
pnpm test

# Run linter
pnpm lint
```

### 3. Commit Your Changes

**Commit Message Format**:
```
<type>: <description> (refs #<issue-number>)

<optional body with more details>

Closes #<issue-number>
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Example**:
```bash
git add .
git commit -m "feat: implement HTTP client with retry logic (refs #1)

- Add GET, POST, PUT, DELETE methods
- Implement retry with exponential backoff
- Add timeout handling
- Include request/response interceptors

Closes #1"
```

### 4. Push Your Branch

```bash
git push origin feature/issue-1-http-client
```

### 5. Create Pull Request

```bash
gh pr create --title "Implement HTTP client" \
  --body "Implements HTTP client with retry and timeout support.

## Changes
- Added core HTTP methods
- Implemented retry logic with exponential backoff
- Added configurable timeout
- Included request/response interceptors

## Testing
- [ ] Unit tests added
- [ ] All tests passing
- [ ] Manual testing completed

Closes #1" \
  --base main
```

---

## Coding Standards

### TypeScript

- **Strict Mode**: Enabled with all strict flags
- **Type Safety**: Full type annotations for public APIs
- **No `any`**: Use proper types or `unknown`
- **Export Types**: Use `export type` for type-only exports
- **File Extensions**: Always use `.js` in imports

```typescript
// ✅ GOOD
import { Router } from './router.js';
export type RouteOptions = { path: string };

// ❌ BAD
import { Router } from './router';
export interface RouteOptions { path: string }
```

### Code Style

- **Formatting**: Use Prettier (config included)
- **Linting**: Use ESLint (config included)
- **Naming**:
  - Classes: `PascalCase`
  - Functions/variables: `camelCase`
  - Constants: `UPPER_SNAKE_CASE`
  - Files: `kebab-case.ts`

### File Organization

```
src/
├── index.ts           # Main entry point
├── core/              # Core functionality
├── utils/             # Utility functions
├── types/             # TypeScript types
└── __tests__/         # Tests
```

### Comments

- **Minimal Comments**: Code should be self-documenting
- **Comment When**: Complex algorithms or non-obvious logic
- **JSDoc**: Use for public APIs

```typescript
/**
 * Makes an HTTP request with retry logic
 * @param url - The URL to request
 * @param options - Request options
 * @returns Promise with response data
 */
export async function request(url: string, options?: RequestOptions): Promise<Response> {
  // Implementation
}
```

---

## Testing Requirements

### Test-Driven Development (TDD)

We follow TDD principles:

1. **Red**: Write a failing test
2. **Green**: Write minimal code to pass
3. **Refactor**: Improve while keeping tests green

### Test Coverage

- **100% Coverage Required**: All code must be tested
- **Test Location**: `src/__tests__/**/*.test.ts`
- **Test Framework**: Node.js built-in test runner

### Writing Tests

```typescript
import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert';
import { YourFeature } from '../index.js';

describe('YourFeature', () => {
  let feature: YourFeature;

  beforeEach(() => {
    feature = new YourFeature();
  });

  test('should do something', () => {
    const result = feature.doSomething();
    assert.strictEqual(result, 'expected');
  });

  test('should handle errors', () => {
    assert.throws(() => feature.doInvalidThing());
  });

  test('async operations', async () => {
    const result = await feature.asyncOperation();
    assert.ok(result);
  });
});
```

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

---

## Pull Request Process

### Before Submitting

- [ ] Code builds without errors (`pnpm build`)
- [ ] All tests pass (`pnpm test`)
- [ ] Linter passes (`pnpm lint`)
- [ ] 100% test coverage maintained
- [ ] Documentation updated
- [ ] CHANGELOG.md updated (if applicable)
- [ ] Commits follow format
- [ ] Branch is up to date with main

### PR Template

Your PR should include:

1. **Clear Title**: Describes what the PR does
2. **Description**: Detailed explanation of changes
3. **Changes Made**: Bullet list of changes
4. **Testing**: How you tested the changes
5. **Screenshots**: If UI changes
6. **Breaking Changes**: If any
7. **Issue Reference**: `Closes #<issue-number>`

### Review Process

1. **Automated Checks**: CI/CD pipeline runs automatically
2. **Code Review**: Maintainers review your code
3. **Address Feedback**: Make requested changes
4. **Approval**: Once approved, PR is merged
5. **Issue Closes**: Linked issue closes automatically

### After Merge

- Your branch will be deleted automatically
- Thank you for your contribution! 🎉

---

## Documentation

### README Updates

If your changes affect usage, update:
- Installation instructions
- API documentation
- Examples
- Configuration options

### Code Documentation

- Add JSDoc comments for public APIs
- Update inline comments if logic changes
- Add examples for complex features

### CHANGELOG

For significant changes, update CHANGELOG.md:

```markdown
## [Unreleased]

### Added
- New feature X (#123)

### Changed
- Improved performance of Y (#124)

### Fixed
- Bug in Z when condition A (#125)
```

---

## Community

### Getting Help

- **GitHub Issues**: For bugs and features
- **Discussions**: For questions and ideas
- **Pull Requests**: For code contributions

### Communication

- Be respectful and constructive
- Provide clear descriptions
- Include reproduction steps for bugs
- Share examples and use cases

### Recognition

Contributors are recognized in:
- CONTRIBUTORS.md file
- Release notes
- Project README
- Community highlights

---

## Quick Reference

### Common Commands

```bash
# Setup
pnpm install
pnpm build

# Development
pnpm dev              # Watch mode
pnpm test             # Run tests
pnpm lint             # Check code style
pnpm format           # Format code

# Issues
gh issue list
gh issue create
gh issue view <number>

# Branches
git checkout -b feature/issue-<number>-<description>
git push origin <branch-name>

# Pull Requests
gh pr create --title "..." --body "Closes #<number>"
gh pr list
gh pr view <number>
```

### Issue-Based Workflow

```bash
# 1. Find/Create Issue
gh issue create --title "Feature: X"

# 2. Create Branch
git checkout -b feature/issue-1-x

# 3. Make Changes
# ... code ...

# 4. Commit
git commit -m "feat: implement X (refs #1)

Closes #1"

# 5. Push
git push origin feature/issue-1-x

# 6. Create PR
gh pr create --title "Implement X" --body "Closes #1"
```

---

## Thank You!

Your contributions make Synapse better for everyone. We appreciate your time and effort!

**Questions?** Open a discussion or ask in your issue.

**Found a Bug?** Open an issue with reproduction steps.

**Have an Idea?** Share it in discussions or create a feature request.

---

**Happy Coding! 🚀**
