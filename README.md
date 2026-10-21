<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/assets/synoikia-lockup-dark.svg" />
    <img src="docs/assets/synoikia-lockup-light.svg" alt="Synoikia" height="72" />
  </picture>
</p>

<p align="center">
  <strong>The dev kit for Synoikia.</strong><br />
  Claude Code plugins to develop and maintain <a href="https://github.com/via-justa/synoikia-core">Synoikia core</a> and Synoikia plugins.
</p>

# synoikia-dev-kit

The repository is a Claude Code plugin marketplace named `synoikia-dev-kit`.

## Plugins

| Plugin | For | Contents |
|---|---|---|
| `synoikia-core-dev` | Synoikia core | The `core-development`, `vue-development`, `db-migration`, `core-release` and `technical-writing` skills. The core `security-reviewer` agent. Hooks that guard protected paths and run Prettier after each edit. The core rules. |
| `synoikia-plugin-dev` | A Synoikia plugin repository | The `add-plugin`, `plugin-development`, `release-plugin` and `technical-writing` skills. The plugin `security-reviewer` agent. The same hooks. The plugin repository rules. |

Each plugin adds its rules (`context.md`) to every session through a `SessionStart` hook. So the rules apply like a `CLAUDE.md`. A repository's own `CLAUDE.md` keeps only its facts: its layout, its commands and its packages.

## The workflow is NoVibe

[NoVibe](https://github.com/novibe-org/novibe) runs the workflow: spec-driven development for Claude Code. You manage the intent, and the agent writes the code.

These plugins add only what is specific to Synoikia:

- The `technical-writing` rules for all prose, which a `prose` guard in the git hooks checks.
- The `security-reviewer` agent, next to the Cloudflare `security-audit` that NoVibe runs. One `Security audit:` line covers both.
- A draft pull request after the `spec:` commit, watched until it merges.
- No `Co-Authored-By` or `Claude-Session` trailers, and no "Generated with Claude Code" line.
- The skills for core, the admin portal, the database, releases and plugins.

## Use the plugins

A repository adds both marketplaces and its plugins in its `.claude/settings.json`. The core repository enables `synoikia-core-dev`, and the plugins repository enables `synoikia-plugin-dev`:

```json
{
  "extraKnownMarketplaces": {
    "nv-plugins": {
      "source": { "source": "github", "repo": "novibe-org/novibe" }
    },
    "synoikia-dev-kit": {
      "source": { "source": "github", "repo": "synoikia-org/synoikia-dev-kit" }
    }
  },
  "enabledPlugins": {
    "novibe@nv-plugins": true,
    "synoikia-core-dev@synoikia-dev-kit": true
  }
}
```

`create-plugin --claude` enables only `synoikia-plugin-dev` in a new plugin repository. Its author adopts NoVibe, or not.

| Where | How the plugins load |
|---|---|
| Claude Code on your computer | Trust the repository folder. Claude Code then adds the marketplaces and installs the enabled plugins. To install them by hand, run `claude plugin marketplace add synoikia-org/synoikia-dev-kit` and `claude plugin marketplace add novibe-org/novibe`, then `claude plugin install <plugin>@<marketplace>` |
| Claude Code on the web (cloud sessions) | A cloud session does not install the plugins that a repository enables. Add the plugins to your claude.ai account, and cloud sessions load them from there |

## Protected paths

Both plugins read `.claude/guard-paths.json` in the repository. Each rule matches a path relative to the repository root with a regular expression.

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
