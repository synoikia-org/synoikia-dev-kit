# Synoikia core development

These rules apply to the Synoikia core repository. Its `CLAUDE.md` gives the layout and the commands.

## The rule everything follows

Security lives in core, once. A plugin only describes its upstream API. It never decides what is allowed.

- Do not add a plugin-side switch for anything that the gate, the sandbox, the approvals, the redaction or the auth already decide.
- Core stays plugin-agnostic. Do not name a plugin, such as TrueNAS, Seerr or Home Assistant, in core code, tests or UI placeholders. The plugins live in `synoikia-org/synoikia-core-plugins`.
- SDK code is bundled into every plugin. So `rules.ts`, `http-client.ts`, `openapi.ts` and `static-catalog.ts` decide what plugins tell core. Treat a change there as a security change.
- The security decisions of core are ADRs in `docs/adrs/`. Read the ADRs of a module before you change it. Other facts, such as the tables and the Admin API routes, are in `docs/reference.md`.

  | Part | ADRs |
  |---|---|
  | `gate/`, `sandbox/`, `approvals/`, redaction | ADR-0003 to ADR-0007 |
  | `auth/`, roles | ADR-0008 to ADR-0010 |
  | `plugins/`, the SDK contract | ADR-0011 to ADR-0014 |
  | The listeners, secrets, data writers, portal widgets, notifications | ADR-0015 to ADR-0019 |

## Skills

| Task | Skill |
|---|---|
| Backend code or tests in `packages/core`, `packages/plugin-sdk` or `packages/create-plugin` | `core-development` |
| Admin portal code or tests: any `.vue` file or `packages/admin-ui` | `vue-development` |
| A change to the database schema or its data | `db-migration` |
| The release labels of a pull request that changes shipped content, or a release | `core-release` |
| Prose of any kind | `technical-writing` |

Load the skill before you write or review that work.

## Workflow

NoVibe's `novibe` skill runs every change: `requirements-engineer`, then `architect`, then `developer`, one slice for each pull request. The NoVibe plugin (`novibe@nv-plugins`) must be enabled next to this one. Synoikia adds these rules to it:

- **Prose.** All prose follows the `technical-writing` skill: feature files, ADRs, model descriptions, documents, commit messages and pull request descriptions. The `prose` guard of the git hooks checks it.
- **Security audit.** When the slice crosses a trust boundary, run this plugin's `security-reviewer` agent as well as Cloudflare's `security-audit`. The `security-audit` plugin of this marketplace supplies it. One line covers both: `Security audit: <boundary and findings>` or `Security audit: none. <why>`.
- **Scenarios.** Show each proposed scenario in the chat as a Gherkin code block. Do not put scenarios in a question form.
- **Slice size.** A slice holds up to 6 scenarios when they are strongly related. Group related scenarios into one slice, so that the change needs fewer pull requests.
- **Pull request.** Do these steps for each slice:
  1. When the driver approves the scenarios, commit them as `spec:`, push, and open the pull request as a draft.
  2. Run the `architect` step. When the interview ends, commit its result as `arch:` and push.
  3. Stop. Start the `developer` step only when the driver tells you to.
  4. Watch the pull request with `subscribe_pr_activity` until it merges or closes.
  5. Mark the pull request ready when the slice is complete, CI passes on its head, and both security reviews have run. The `Security audit:` line names their result.
  6. When a push to `main` makes the pull request conflict, mark it as a draft. Merge `main`, resolve the conflicts and push. Mark it ready again when step 5 holds.
- **Trailers.** Do not add `Co-Authored-By` or `Claude-Session` lines anywhere: commit messages, pull request descriptions, comments or files. Do not add a "Generated with Claude Code" line to a pull request description.
- **Identity.** Commit as the user when their identity is known. Do not commit as Claude.
- **Branches.** The remotes refuse a branch whose name starts with `claude/`. Name the branch for the slice, such as `feat/<slug>` or `docs/<slug>`.

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
