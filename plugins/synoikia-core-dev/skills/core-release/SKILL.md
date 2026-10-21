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

## Steps

1. Read `DEVELOPMENT.md` › Which versions a change bumps. It is the rule for each package and for the image.
2. Bump each `version` that the rule names, in the same pull request as the change.
3. Name the new versions in the pull request title, for example "(core 0.7.0, image 0.5.0)".
4. If the change breaks the SDK or `@synoikia/core/testing`, call it out in the pull request. It breaks every plugin repository.
