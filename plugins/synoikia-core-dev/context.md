# Synoikia core development

These rules apply to the Synoikia core repository. Its `CLAUDE.md` gives the layout and the commands.

## The rule everything follows

Security lives in core, once. A plugin only describes its upstream API. It never decides what is allowed.

- Do not add a plugin-side switch for anything that the gate, the sandbox, the approvals, the redaction or the auth already decide.
- Core stays plugin-agnostic. Do not name a plugin, such as TrueNAS, Seerr or Home Assistant, in core code, tests or UI placeholders. The plugins live in `via-justa/synoikia-core-plugins`.
- SDK code is bundled into every plugin. So `rules.ts`, `http-client.ts`, `openapi.ts` and `static-catalog.ts` decide what plugins tell core. Treat a change there as a security change.
- Each security-critical directory under `packages/core/src` (`gate/`, `sandbox/`, `plugins/`, `auth/`) has a short `README.md` with its pipeline and design sections. Read it before you change that module.

## Skills

| Task | Skill |
|---|---|
| Backend code or tests in `packages/core`, `packages/plugin-sdk` or `packages/create-plugin` | `core-development` |
| Admin portal code or tests: any `.vue` file or `packages/admin-ui` | `vue-development` |
| A change to the database schema or its data | `db-migration` |
| A design section in `docs/design`, or `README.md`, `DEVELOPMENT.md`, `CONTRIBUTING.md` or `SECURITY.md` | `design-document` |
| The version bumps of a pull request that changes shipped content | `core-release` |

Load the skill before you write or review that work. A behavior change also updates its design section.

## Security review

The `security-reviewer` agent of this plugin reviews core diffs. It also runs `pnpm audit` and sorts known CVEs by whether the vulnerable dependency ships and can be reached.

## The signing key

`packages/core/src/plugins/default-repo.ts` pins the signing key of the plugin repository. A change to it makes every install block plugin installs until an admin confirms the new key. Change it only for a compromised key.
