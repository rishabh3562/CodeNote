### Content:

# Workflow Explanation: Commitlint, ESLint, Lint-Staged, and Husky

This document explains the tools and practices set up in the project to ensure clean and consistent code while maintaining high development standards.

## 1. Commitlint: Enforcing Commit Message Standards

Commitlint ensures that all commit messages follow a defined convention for better collaboration and traceability. The project uses the **Conventional Commits** format.

-                  **Purpose**: Prevents poorly written commit messages.
- **Key Configuration**:
  - Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, etc.
  - Scopes for modularity, e.g., `auth`, `UI`, `format`.
  - Subject limit: Commit message summaries are restricted to 72 characters.

### Workflow:

1. Write your commit message following the defined format.
2. Commitlint will validate the message during `git commit`.
3. Errors will block the commit process.

---

## 2. ESLint: Code Quality Checks

ESLint analyzes your code for potential issues like unused variables, improper syntax, or bad practices.

- **Purpose**: Enforces code quality and consistency across the codebase.
- **Custom Rules**:
  - Prevent unused variables and console logs (`warn` level).
  - Integrates Prettier for formatting rules (`error` level).

### Workflow:

1. Run ESLint manually:
   ```bash
   npm run lint
   ```
2. Fix issues automatically:
   ```bash
   npm run lint:fix
   ```
3. Pre-commit, ESLint ensures that only clean code is committed.

---

## 3. Prettier: Code Formatting

Prettier is set up to standardize the formatting of your code.

- **Purpose**: Keeps the codebase clean and readable.
- **Configuration**:
  - 2 spaces for indentation.
  - Semi-colons enabled.
  - Single quotes for strings.
  - Ignores directories like `node_modules`, `build`, and `dist`.

### Workflow:

1. Prettier formats staged files before commits using Lint-Staged.
2. For manual formatting:
   ```bash
   npm run prettier
   ```

---

## 4. Lint-Staged: Running Linters on Staged Files

Lint-Staged runs specified linters only on files staged for commit.

- **Purpose**: Ensures only staged changes are linted and formatted, optimizing the process.
- **Configuration**:
  - Runs ESLint on JavaScript and TypeScript files.
  - Applies Prettier to all file types.

### Workflow:

1. Stage your changes:
   ```bash
   git add .
   ```
2. Commit your changes. Lint-Staged will run the configured linters and formatters:
   ```bash
   git commit -m "feat: add feature X"
   ```
3. Only clean code proceeds to be committed.

---

## 5. Husky: Git Hook Automation

Husky automates Git hooks for pre-commit and commit-msg checks.

- **Purpose**: Prevent invalid commits by running automated checks.
- **Setup**:
  - Pre-commit: Runs ESLint and Prettier on staged files via Lint-Staged.
  - Commit-msg: Validates commit messages with Commitlint.

### Workflow:

1. During `git commit`, Husky triggers:
   - **Pre-commit**: Fixes and formats code with ESLint and Prettier.
   - **Commit-msg**: Validates the commit message.
2. If checks fail, the commit is blocked until resolved.

---

## Summary

This workflow ensures:

- Proper commit messages with Commitlint.
- High code quality with ESLint.
- Consistent formatting with Prettier.
- Pre-commit checks with Lint-Staged.
- Automated Git hooks with Husky.

By following these practices, developers maintain a clean, standardized, and efficient codebase.

```

```
