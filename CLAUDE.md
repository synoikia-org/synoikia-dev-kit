# synoikia-dev-kit

The Claude Code plugin marketplace for Synoikia. `README.md` describes the plugins and how a repository uses them.

## Layout

| Path | What |
|---|---|
| `.claude-plugin/marketplace.json` | The marketplace and its plugins. No versions, so each commit is an update. The `security-audit` plugin comes from Cloudflare's repository at the commit in its `sha` |
| `.github/workflows/update-security-audit.yml` | Each week, opens a pull request that moves the `security-audit` `sha` to the upstream head |
| `plugins/<plugin>/.claude-plugin/plugin.json` | The plugin manifest. No version |
| `plugins/<plugin>/context.md` | The plugin's always-on rules. Its `SessionStart` hook adds them to the session |
| `plugins/<plugin>/skills/` | The plugin's skills, with their `references/` |
| `plugins/<plugin>/agents/` | The plugin's agents |
| `plugins/<plugin>/hooks/` | `hooks.json` and the hook scripts. They find their files through `${CLAUDE_PLUGIN_ROOT}`. `format.mjs` and `guard-paths.mjs` are the same in both plugins, so change both |

## Check a change

```sh
claude plugin validate .
claude plugin validate plugins/<plugin>
claude --plugin-dir plugins/<plugin> plugin details <plugin>
node --check plugins/<plugin>/hooks/<script>.mjs
```

## Conventions

- Write prose by the `technical-writing` skill. Both plugins carry the same copy, so change both.
- A rule that NoVibe's skills already state does not go in a plugin. A plugin holds only what is specific to Synoikia.
- A rule that applies only to one kind of task goes in a skill, not in `context.md`.
- Do not copy or change Cloudflare's `security-audit` skill. The weekly workflow updates its `sha`. Review the upstream diff in that pull request.
- Do not add `Co-Authored-By` or `Claude-Session` trailers to commit messages, and no "Generated with Claude Code" line to pull request descriptions.
