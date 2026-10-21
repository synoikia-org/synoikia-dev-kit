---
name: design-document
description: >-
  How to change Synoikia core's software design description in docs/design and the documents that describe
  the product (README.md, DEVELOPMENT.md, CONTRIBUTING.md, SECURITY.md). Use it for any task that adds, changes
  or reviews a design section, the glossary or one of those documents, and for every behavior change, because
  the design section changes with the behavior. Examples: document a new setting or route; update a section
  after a change to the gate; fix a section that disagrees with the code; add a subsection.
---

# Design document

`docs/design/` is the software design description (SDD) of core, one file for each section. `docs/design/README.md` is its index, rules and glossary. Code comments cite its sections, such as `§5.2`. Write by the `technical-writing` skill.

## When to change it

- When behavior changes, update the section it belongs to in the same pull request.
- When a change affects what `README.md`, `DEVELOPMENT.md`, `CONTRIBUTING.md` or `SECURITY.md` describes, update that document in the same pull request. That covers features, setup, commands, packages, ports, config, releases and security scope.

## Rules

- Use the glossary's terms only, each with one meaning.
- Describe the current design only. Do not write history: no earlier, reverted or revised designs, and no "this replaces", "used to" or migration notes. Those belong in commit messages and pull requests.
- Keep section numbers stable, because code comments cite them. A new subsection takes a new number. Never renumber or reuse one.
- State facts that the code confirms. If the code and the design disagree, find out which one is wrong before you edit either.
- Prefer tables and lists to long paragraphs. Give no rationale beyond what a reader needs to keep the design intact.
- The design document links the architecture views in `docs/architecture/`. It does not repeat them.
