# Synoikia core development

These rules apply to the Synoikia core repository. Its `CLAUDE.md` gives the layout and the commands.

## The rule everything follows

Security lives in core, once. A plugin only describes its upstream API. It never decides what is allowed.

- Do not add a plugin-side switch for anything that the gate, the sandbox, the approvals, the redaction or the auth already decide.
- Core stays plugin-agnostic. Do not name a plugin, such as TrueNAS, Seerr or Home Assistant, in core code, tests or UI placeholders. The plugins live in `via-justa/synoikia-core-plugins`.
- SDK code is bundled into every plugin. So `rules.ts`, `http-client.ts`, `openapi.ts` and `static-catalog.ts` decide what plugins tell core. Treat a change there as a security change.
- The security decisions of `gate/`, `sandbox/`, `plugins/` and `auth/` under `packages/core/src` are ADRs in `docs/adrs/`. Read them before you change that module. While a module still has its `README.md`, read that instead.

## Skills

| Task | Skill |
|---|---|
| Backend code or tests in `packages/core`, `packages/plugin-sdk` or `packages/create-plugin` | `core-development` |
| Admin portal code or tests: any `.vue` file or `packages/admin-ui` | `vue-development` |
| A change to the database schema or its data | `db-migration` |
| The version bumps of a pull request that changes shipped content | `core-release` |
| Prose of any kind | `technical-writing` |

Load the skill before you write or review that work.

## Workflow

NoVibe's `novibe` skill runs every change: `requirements-engineer`, then `architect`, then `developer`, one slice for each pull request. The NoVibe plugin (`novibe@nv-plugins`) must be enabled next to this one. Synoikia adds these rules to it:

- **Prose.** All prose follows the `technical-writing` skill: feature files, ADRs, model descriptions, documents, commit messages and pull request descriptions. The `prose` guard of the git hooks checks it.
- **Security audit.** When the slice crosses a trust boundary, run this plugin's `security-reviewer` agent as well as Cloudflare's `security-audit`. One line covers both: `Security audit: <boundary and findings>` or `Security audit: none. <why>`.
- **Pull request.** After the `spec:` commit, open the pull request as a draft. Watch it with `subscribe_pr_activity` until it merges or closes.
- **Trailers.** Do not add `Co-Authored-By` or `Claude-Session` trailers to commit messages. Do not add a "Generated with Claude Code" line to pull request descriptions.

## Code

- Keep comments minimal: one or two lines, only for what the code cannot say. That is a reason, a constraint, an `ADR-NNNN` or a feature `@id`. Do not write multi-line comment blocks in code, YAML, SQL or workflows.
- Prettier formats everything. A hook of this plugin runs it after each edit.
- TypeScript is strict, with `noUncheckedIndexedAccess` and `verbatimModuleSyntax`. Use `import type` for types and `.js` extensions on relative imports. Unused variables are allowed only with a `_` prefix.

## Protected files

A hook of this plugin reads `.claude/guard-paths.json` and denies or asks before an edit to each path that the file lists. Generated files, such as `pnpm-lock.yaml`, change only through their tools.

## Security review

The `security-reviewer` agent of this plugin reviews core diffs. It also runs `pnpm audit` and sorts known CVEs by whether the vulnerable dependency ships and can be reached.

## The signing key

`packages/core/src/plugins/default-repo.ts` pins the signing key of the plugin repository. A change to it makes every install block plugin installs until an admin confirms the new key. Change it only for a compromised key.
