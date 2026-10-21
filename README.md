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
| `synoikia-workflow` | Every Synoikia repository | The `change-workflow`, `requirements-engineer`, `architect`, `developer` and `technical-writing` skills. Hooks that check branch names, guard protected paths and run Prettier after each edit. The shared workflow rules. |
| `synoikia-core-dev` | Synoikia core | The `core-development`, `vue-development`, `db-migration`, `design-document` and `core-release` skills, the core `security-reviewer` agent and the core rules. |
| `synoikia-plugin-dev` | A Synoikia plugin repository | The `add-plugin`, `plugin-development` and `release-plugin` skills, the plugin `security-reviewer` agent and the plugin repository rules. |

`synoikia-workflow` is based on [NoVibe](https://github.com/novibe-org/novibe), spec-driven development for Claude Code. You manage the intent, and the agent writes the code. Each change goes through four steps, one slice at a time:

| Step | You | The agent |
|---|---|---|
| Specify | Answer, one round at a time | The `requirements-engineer` skill asks until a Gherkin feature file holds what to build |
| Design | Decide | The `architect` skill asks until the LikeC4 model in `docs/architecture` holds the design |
| Build | Watch the scenarios turn green | The `developer` skill writes the tests first. The feature file is the test |
| Ship | Review the spec and the design | Git hooks and the `Workflow` CI job refuse what the conventions forbid |

`synoikia-workflow` adds the Synoikia conventions to NoVibe: `change-workflow`, which sizes a change and runs its slices, the `technical-writing` prose rules, and the hooks.

Each plugin adds its rules (`context.md`) to every session through a `SessionStart` hook. So the rules apply like a `CLAUDE.md`. A repository's own `CLAUDE.md` keeps only its facts: its layout, its commands and its packages.

## Use the plugins

A repository adds the marketplace and its plugins in its `.claude/settings.json`:

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

Enable `synoikia-core-dev` in the core repository, and `synoikia-plugin-dev` in a plugin repository. `create-plugin --claude` writes these settings for a new plugin repository.

| Where | How the plugins load |
|---|---|
| Claude Code on your computer | Trust the repository folder. Claude Code then adds the marketplace and installs the enabled plugins. To install them by hand, run `claude plugin marketplace add synoikia-org/synoikia-dev-kit`, then `claude plugin install <plugin>@synoikia-dev-kit` |
| Claude Code on the web (cloud sessions) | A cloud session does not install the plugins that a repository enables. Add the plugins to your claude.ai account, and cloud sessions load them from there |

### The session start check

Each repository has a session start hook, `.claude/hooks/check-plugins.mjs`. It runs `claude plugin list` and names the plugins that are not loaded.

| Repository | Level | When a plugin is not loaded |
|---|---|---|
| Synoikia core | Required | The assistant changes no files and tells you how to install the plugins |
| Synoikia plugins | Required | The assistant changes no files and tells you how to install the plugins |
| A new plugin repository from `create-plugin` | Recommended | The assistant tells you once, then continues |

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
