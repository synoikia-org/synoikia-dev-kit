# synoikia-dev-kit

Claude Code plugins to develop and maintain Synoikia core and Synoikia plugins. The repository is a plugin marketplace named `synoikia-dev-kit`.

## Plugins

| Plugin | For | Contents |
|---|---|---|
| `synoikia-workflow` | Every Synoikia repository | The `change-workflow`, `requirements-engineer`, `architect`, `developer` and `technical-writing` skills. Hooks that check branch names, guard protected paths and run Prettier after each edit. The shared workflow rules. |
| `synoikia-core-dev` | Synoikia core | The `core-development`, `vue-development`, `db-migration`, `design-document` and `core-release` skills, the core `security-reviewer` agent and the core rules. |
| `synoikia-plugin-dev` | A Synoikia plugin repository | The `add-plugin`, `plugin-development` and `release-plugin` skills, the plugin `security-reviewer` agent and the plugin repository rules. |

`synoikia-workflow` is based on [novibe](https://github.com/novibe-org/novibe).

Each plugin adds its rules (`context.md`) to every session through a `SessionStart` hook. So the rules apply like a `CLAUDE.md`. A repository's own `CLAUDE.md` keeps only its facts: its layout, its commands and its packages.

## Use the plugins in a repository

Add the marketplace and the plugins to the repository's `.claude/settings.json`:

```json
{
  "extraKnownMarketplaces": {
    "synoikia-dev-kit": {
      "source": { "source": "github", "repo": "synoikia-org/synoikia-dev-kit" }
    }
  },
  "enabledPlugins": {
    "synoikia-workflow@synoikia-dev-kit": true,
    "synoikia-plugin-dev@synoikia-dev-kit": true
  }
}
```

Enable `synoikia-core-dev` in the core repository, and `synoikia-plugin-dev` in a plugin repository.

## Protected paths

The `synoikia-workflow` plugin reads `.claude/guard-paths.json` in the repository. Each rule matches a path relative to the repository root with a regular expression.

```json
[
  { "match": "(^|/)pnpm-lock\\.yaml$", "decision": "deny", "reason": "pnpm-lock.yaml is generated. Change package.json and run `pnpm install` instead." },
  { "match": "^minisign\\.pub$", "decision": "ask", "reason": "minisign.pub is the key that every install pins for this repository." }
]
```

- `deny` stops the edit, and `ask` asks the user first.
- A repository without the file guards no path.
- A file that cannot be read makes every edit ask, so a broken list never lets edits through.

## Check a change

```sh
claude plugin validate .
claude plugin validate plugins/<plugin>
claude --plugin-dir plugins/<plugin> plugin details <plugin>
```

The plugins have no version, so that each commit is an update. The validator warns about the missing version. So do not use `--strict`, which treats that warning as an error.

## License

MIT. See `LICENSE`.
