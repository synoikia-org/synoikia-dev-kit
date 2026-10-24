---
name: core-release
description: >-
  How a Synoikia core pull request sets up its release: the `feature` or `breaking` label, no version bumps, and
  the draft release that publishes @synoikia/plugin-sdk, @synoikia/core, @synoikia/create-plugin and the Docker
  image. Use it before you open any pull request that changes shipped content, and when asked to release,
  publish or bump a version. Examples: a fix in packages/core; a new SDK feature; a template change in
  create-plugin; a portal change; a dependency bump; a breaking change to the testing API.
---

# Core release

A published GitHub release publishes the npm packages and the Docker image together. Each merge to `main` updates the draft release. The draft computes the versions from the pull request labels and the paths that each pull request changes. `DEVELOPMENT.md` › Releases gives the full flow.

## Steps for a pull request

1. Read `DEVELOPMENT.md` › Which versions a release bumps. It gives the labels and the paths of each artifact.
2. Do not change a `version` in a `package.json`.
3. Label the pull request `breaking` for a breaking change, or `feature` for a new feature. A fix takes no label.
4. If the change breaks the SDK or `@synoikia/core/testing`, call it out in the pull request. It breaks every plugin repository.

## Steps for a release

1. Open the draft release. Check its sections and its versions block against the merged pull requests.
2. Tell the user what the release publishes. Only a maintainer publishes it.
