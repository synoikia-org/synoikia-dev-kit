# Synoikia workflow

These rules apply to every Synoikia repository that enables this plugin. The repository's own `CLAUDE.md` gives its layout, its commands and its packages.

## Every change

- Every task that changes the repository starts with the `change-workflow` skill. Questions that change nothing do not.
- Changes are built spec first and test first, one slice for each pull request. The `requirements-engineer` skill writes the feature file, the `architect` skill writes the build plan, and the `developer` skill builds it red then green.
- The rules for commits, branches, feature files, tests and prose are in `docs/workflow.md`. The git hooks and the `Workflow` CI job check them. Install the hooks once per clone with `pnpm hooks:install`. Run `pnpm workflow pre-push` before a push.
- All prose follows the `technical-writing` skill: documents, skills, feature files, commit messages and pull request descriptions.
- Keep each change focused. Specify new behavior in a feature file before the code.

## Code

- Keep comments minimal: one or two lines, only for what the code cannot say, such as a reason, a constraint or a design reference. Do not write multi-line comment blocks in code, YAML, SQL or workflows.
- Prettier formats everything. A hook runs it after each edit.
- TypeScript is strict, with `noUncheckedIndexedAccess` and `verbatimModuleSyntax`. Use `import type` for types and `.js` extensions on relative imports. Unused variables are allowed only with a `_` prefix.

## Commits and pull requests

- Do not add `Co-Authored-By` or `Claude-Session` trailers to commit messages.
- Do not add a "Generated with Claude Code" line to pull request descriptions.

## Security review

- Before you open a pull request that touches a path in `synoikia.workflow.securityPaths` of the root `package.json`, run the security reviewer of the repository's dev plugin on the diff. Address its findings.
- Put its `Security audit:` line in the pull request description. The `Workflow` CI job fails a ready pull request without it.

## Protected files

A hook reads `.claude/guard-paths.json` and denies or asks before an edit to each path that the file lists. Generated files, such as `pnpm-lock.yaml`, change only through their tools.
