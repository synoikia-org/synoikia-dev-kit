---
name: core-release
description: >-
  Which versions a Synoikia core pull request bumps: @synoikia/plugin-sdk, @synoikia/core,
  @synoikia/create-plugin and the Docker image. Use it before you open any pull request that changes shipped
  content, and when asked to release, publish or bump a version. Examples: a fix in packages/core; a new SDK
  feature; a template change in create-plugin; a portal change; a dependency bump; a breaking change to the
  testing API.
---

# Core release

`@synoikia/plugin-sdk`, `@synoikia/core` and `@synoikia/create-plugin` publish to npm when their `version` changes on `main`. The Docker image uses the root `package.json` version, apart from the package versions.

## What to bump

A pull request bumps the version of each published package, and of the image, whose shipped content it changes, in the same pull request. Docs-, test- and CI-only changes bump nothing.

| Version | Bump when the pull request changes |
|---|---|
| `@synoikia/core` | `packages/core/src`, including `testing/`, or its runtime dependencies |
| `@synoikia/plugin-sdk` | `packages/plugin-sdk/src` or its dependencies |
| `@synoikia/create-plugin` | its own files. Also a patch whenever core or the SDK takes a minor bump, because its `workspace:^` ranges are packed with the minor pinned |
| Root `package.json` (the image) | anything that the image ships: core, the admin UI, the `Dockerfile` and image dependencies. Bump it by the same step as the largest package bump |

## How much

- While at 0.x, a breaking change or a new feature bumps the minor, and a fix bumps the patch.
- Name the new versions in the pull request title, for example "(core 0.7.0, image 0.5.0)".
- A breaking change to the SDK or to `@synoikia/core/testing` breaks every plugin repository, so call it out in the pull request.
