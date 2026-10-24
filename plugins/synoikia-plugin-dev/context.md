# Synoikia plugin development

These rules apply to a Synoikia plugin repository. Its `CLAUDE.md` gives its plugins, its layout and its commands.

## A plugin only describes its upstream API

Core decides what is allowed. Core's sandbox, permission gate, approvals, redaction and audit apply to every plugin.

- A plugin supplies the catalog, the classification (read, write, locked), targets, summaries, confirmation literals and `sensitiveKeys`.
- A plugin never adds its own allow or deny switch, approval prompt or secret handling.
- If a plugin needs something that core does not offer, that is a change in Synoikia core, released first.

## Skills

| Task | Skill |
|---|---|
| Plugin code, `plugin.yaml`, `manifest.json` or tests | `plugin-development` |
| A new plugin | `add-plugin`, then `plugin-development` |
| A version bump or an SDK range update | `release-plugin` |
| Prose of any kind | `technical-writing` |

Load the skill before you write or review that work. `plugin.yaml`, `manifest.json` and `test/compliance.yaml` are policy, so review a diff of them as a security change.

## Workflow

When the repository enables the NoVibe plugin (`novibe@nv-plugins`), its `novibe` skill runs every change: `requirements-engineer`, then `architect`, then `developer`, one slice for each pull request. The Synoikia plugins repository enables it. Synoikia adds these rules to it:

- **Prose.** All prose follows the `technical-writing` skill: feature files, ADRs, model descriptions, documents, commit messages and pull request descriptions. Where the repository has the `prose` guard in its git hooks, the guard checks it.
- **Security audit.** When the slice crosses a trust boundary, run this plugin's `security-reviewer` agent as well as Cloudflare's `security-audit`. The `security-audit` plugin of this marketplace supplies it. One line covers both: `Security audit: <boundary and findings>` or `Security audit: none. <why>`.
- **Pull request.** After the `spec:` commit, open the pull request as a draft. Watch it with `subscribe_pr_activity` until it merges or closes.
- **Trailers.** Do not add `Co-Authored-By` or `Claude-Session` trailers to commit messages. Do not add a "Generated with Claude Code" line to pull request descriptions.

## Code

- Keep comments minimal: one or two lines, only for what the code cannot say. That is a reason, a constraint, an `ADR-NNNN` or a feature `@id`. Do not write multi-line comment blocks in code, YAML, SQL or workflows.
- Prettier formats everything. A hook of this plugin runs it after each edit.
- TypeScript is strict, with `noUncheckedIndexedAccess` and `verbatimModuleSyntax`. Use `import type` for types and `.js` extensions on relative imports. Unused variables are allowed only with a `_` prefix.

## Protected files

A hook of this plugin reads `.claude/guard-paths.json` and denies or asks before an edit to each path that the file lists. Generated files, such as `pnpm-lock.yaml`, change only through their tools.

## Security review

The `security-reviewer` agent of this plugin reviews plugin diffs. It checks classification, request building, approval summaries, secrets, network hosts and the release flow. It also runs `pnpm audit` and sorts known CVEs by whether the dependency is bundled into a plugin.

## The signing key

Never touch the `MINISIGN_SECRET_KEY` flow in `.github/workflows/release.yml` unless asked. A change to `minisign.pub` blocks installs until each admin confirms the new key.
