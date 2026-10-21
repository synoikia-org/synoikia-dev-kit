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

[NoVibe](https://github.com/novibe-org/novibe) runs the workflow: spec-driven development for Claude Code. You manage the intent, and the agent writes the code. Each change goes through four steps, one slice at a time:

| Step | You | The agent |
|---|---|---|
| Specify | Answer, one round at a time | NoVibe's `requirements-engineer` skill asks until a Gherkin feature file holds what to build |
| Design | Decide | NoVibe's `architect` skill asks until the LikeC4 model holds the design. It writes an ADR only for a cross-cutting decision |
| Build | Watch the scenarios turn green | NoVibe's `developer` skill writes the tests first. The feature file is the test |
| Ship | Review the spec and the design | NoVibe's git hooks and CI checks refuse what the conventions forbid |

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

The NoVibe marketplace follows its `main` branch, because NoVibe has no release tags. Its plugin has a `version`, so a session keeps its cached copy until NoVibe bumps that version. The NoVibe git hooks and lint configs that a repository copies are updated in a pull request.

`create-plugin --claude` enables only `synoikia-plugin-dev` in a new plugin repository. Its author adopts NoVibe, or not.

| Where | How the plugins load |
|---|---|
| Claude Code on your computer | Trust the repository folder. Claude Code then adds the marketplaces and installs the enabled plugins. To install them by hand, run `claude plugin marketplace add synoikia-org/synoikia-dev-kit` and `claude plugin marketplace add novibe-org/novibe`, then `claude plugin install <plugin>@<marketplace>` |
| Claude Code on the web (cloud sessions) | A cloud session does not install the plugins that a repository enables. Add the plugins to your claude.ai account, and cloud sessions load them from there |

### The session start check

Each repository has a session start hook, `.claude/hooks/check-plugins.mjs`. It runs `claude plugin list` and names the plugins that are not loaded.

| Repository | Plugins | Level | When a plugin is not loaded |
|---|---|---|---|
| Synoikia core | `novibe`, `synoikia-core-dev` | Required | The assistant changes no files and tells you how to install the plugins |
| Synoikia plugins | `novibe`, `synoikia-plugin-dev` | Required | The assistant changes no files and tells you how to install the plugins |
| A new plugin repository from `create-plugin` | `synoikia-plugin-dev` | Recommended | The assistant tells you once, then continues |

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
