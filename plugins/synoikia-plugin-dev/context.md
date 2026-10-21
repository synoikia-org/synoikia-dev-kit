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

Load the skill before you write or review that work. `plugin.yaml`, `manifest.json` and `test/compliance.yaml` are policy, so review a diff of them as a security change.

## Security review

The `security-reviewer` agent of this plugin reviews plugin diffs. It checks classification, request building, approval summaries, secrets, network hosts and the release flow. It also runs `pnpm audit` and sorts known CVEs by whether the dependency is bundled into a plugin.

## The signing key

Never touch the `MINISIGN_SECRET_KEY` flow in `.github/workflows/release.yml` unless asked. A change to `minisign.pub` blocks installs until each admin confirms the new key.
