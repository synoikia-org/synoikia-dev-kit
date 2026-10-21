---
name: technical-writing
description: >-
  How to write prose in this repo: ASD-STE100 Simplified Technical English, short sentences, no semicolons, no
  em dashes, one topic per paragraph, no repetition. Use it before you write or change any document, README,
  ADR, model description, skill, feature file, commit message body or pull request description.
---

# Technical writing

All prose follows ASD-STE100 Simplified Technical English. Where the repository has the `prose` guard in its git hooks, the guard checks the mechanical rules on added lines. CI checks the pull request description.

## Sentences

- Write 20 words at most in an instruction and 25 at most in a description.
- Write one instruction in each sentence. Start an instruction with a verb: "Run the checks", not "The checks should be run".
- Use the active voice and simple tenses: present, past and future.
- Use approved plain words. Write "use", not "utilize". Write "start", not "commence". Write "show", not "demonstrate".
- Use a term with one meaning only. Use the glossary's terms where a glossary exists, such as `docs/reference.md` › Glossary in core.
- Do not use semicolons. Write two sentences.
- Do not use em dashes. Write two sentences, or use a colon before a list or an example.

## Paragraphs and structure

- Write one topic in each paragraph. Start the paragraph with its topic.
- Use a table or a list when you compare items or give steps.
- Give the steps of a procedure as a numbered list, one action for each step.
- Do not repeat a fact. State it in one place and link to that place.
- Describe what is true now. Put history in commit messages and pull requests.

## Check your text

1. Read each sentence. Cut each word that adds nothing.
2. Split each sentence that holds two statements.
3. Push. The `prose` guard reports each sentence it refuses.
