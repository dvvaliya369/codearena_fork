# Pre-commit Hook Setup Documentation

## Overview

This project is configured with pre-commit hooks to ensure code quality and consistency. The setup includes automated linting, formatting, and type checking before every commit.

## What's Included

### Tools Configured

1. **Husky** - Git hook management
2. **lint-staged** - Run linters on staged files only
3. **ESLint** - JavaScript/TypeScript linting
4. **Prettier** - Code formatting
5. **TypeScript** - Type checking

### Hook Triggers

The pre-commit hook runs automatically when you attempt to commit changes and will:

- Lint TypeScript/JavaScript files with ESLint
- Format code with Prettier
- Fix auto-fixable issues
- Prevent commits if unfixable issues exist

## Installation & Setup

The pre-commit hooks are already configured in this project. When you run:

```bash
npm install
```

Husky will automatically set up the git hooks thanks to the `prepare` script in `package.json`.

### Manual Setup (if needed)

If hooks aren't working, you can manually reinitialize:

```bash
# Reinstall husky hooks
npx husky install

# Make sure the pre-commit hook is executable
chmod +x .husky/pre-commit
```

## Configuration Files

### `.husky/pre-commit`

```bash
npx lint-staged
```

### `package.json` - lint-staged configuration

```json
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": ["eslint --fix", "prettier --write"],
    "*.{json,css,md}": ["prettier --write"]
  }
}
```

### `.eslintrc.json`

```json
{
  "extends": [
    "next/core-web-vitals",
    "next/typescript",
    "@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "rules": {
    "prefer-const": "error",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/consistent-type-definitions": ["error", "interface"]
  }
}
```

### `.prettierrc`

```json
{
  "plugins": ["prettier-plugin-tailwindcss"],
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": false,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

## Available Scripts

You can run these commands manually:

```bash
# Lint all files
npm run lint

# Lint and fix auto-fixable issues
npm run lint:fix

# Format all files
npm run format

# Check if files are formatted correctly
npm run format:check
```

## Workflow

### Normal Commit Flow

1. Make your changes
2. Stage files: `git add .`
3. Commit: `git commit -m "your message"`
4. Pre-commit hook runs automatically:
   - Lints staged files
   - Formats staged files
   - Fixes auto-fixable issues
   - Re-stages fixed files
5. Commit completes if no unfixable issues

### When Issues Are Found

If the pre-commit hook finds issues:

1. **Auto-fixable issues** - Will be fixed and re-staged automatically
2. **Manual fixes needed** - Commit will be blocked with error details
3. Fix the reported issues manually
4. Re-stage the files: `git add .`
5. Try committing again: `git commit -m "your message"`

### Example Output

**Successful pre-commit:**

```
✔ Preparing lint-staged...
✔ Running tasks for staged files...
✔ Applying modifications from tasks...
✔ Cleaning up temporary files...
```

**Failed pre-commit:**

```
✖ eslint --fix:

  /path/to/file.ts
    10:5  error  'unused' is assigned a value but never used  @typescript-eslint/no-unused-vars

✖ lint-staged failed due to a linting error.
```

## Bypassing Pre-commit Hooks

**⚠️ Not Recommended**: You can bypass hooks with:

```bash
git commit -m "message" --no-verify
```

However, this defeats the purpose of maintaining code quality.

## IDE Integration

### VS Code

Install these extensions for the best experience:

- **ESLint** - Real-time linting
- **Prettier - Code formatter** - Format on save
- **TypeScript Importer** - Auto imports

### VS Code Settings

Add to your `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

## Troubleshooting

### Hook Not Running

1. Check if `.husky/pre-commit` exists and is executable
2. Verify `prepare` script runs during `npm install`
3. Ensure you're in a git repository
4. Try: `npx husky install`

### Permission Errors

```bash
chmod +x .husky/pre-commit
```

### ESLint Errors

1. Check your `.eslintrc.json` configuration
2. Ensure all required plugins are installed
3. Run `npm run lint` to see all issues

### Prettier Conflicts

1. Check `.prettierrc` configuration
2. Some ESLint rules might conflict with Prettier
3. Use `eslint-config-prettier` to disable conflicting rules

### Performance Issues

If pre-commit hooks are slow:

1. lint-staged only processes staged files (already optimized)
2. Consider excluding large files in `.gitignore`
3. Use `.eslintignore` for files that don't need linting

## Team Workflow

### For Team Members

1. **First time setup**: Run `npm install` after cloning
2. **Daily workflow**: Normal git workflow - hooks run automatically
3. **Issues**: Fix linting/formatting errors before committing
4. **Questions**: Refer to this documentation or ask team leads

### For Project Maintainers

1. **Adding new rules**: Update `.eslintrc.json` and communicate changes
2. **Prettier config**: Changes to `.prettierrc` affect entire codebase
3. **Dependencies**: Keep linting tools up to date
4. **Documentation**: Update this file when changing configurations

## Benefits

- **Consistent Code Style** - Prettier ensures uniform formatting
- **Fewer Bugs** - ESLint catches common issues early
- **Better Collaboration** - Same standards for all contributors
- **Time Savings** - Automated fixes reduce manual work
- **Quality Assurance** - No low-quality code reaches the repository

## Best Practices

1. **Fix issues promptly** - Don't bypass hooks unnecessarily
2. **Understand the rules** - Learn why certain patterns are discouraged
3. **IDE setup** - Configure your editor to match project settings
4. **Regular updates** - Keep dependencies current
5. **Team communication** - Discuss rule changes with the team

## Customization

To modify the setup:

1. **ESLint rules** - Edit `.eslintrc.json`
2. **Prettier config** - Edit `.prettierrc`
3. **File patterns** - Modify `lint-staged` in `package.json`
4. **Additional hooks** - Create new files in `.husky/`

Remember to coordinate changes with your team and update this documentation accordingly.
