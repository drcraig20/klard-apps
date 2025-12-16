---
name: agile-workflow
description: Spec-driven agile development workflow. Provides slash commands for feature planning, PRDs, architecture, user stories, tasks, TDD implementation, QA, and releases. Tech-agnostic — works with any language or framework.
---

# Agile Workflow

Spec-driven development lifecycle for building features from idea to release.

## Workflow

```
/plan → /prd → /arch → /stories → /tasks → /impl → /qa → /release
```

## Commands

| Command | Model | Purpose |
|---------|-------|---------|
| `/plan <feature>` | opus | Plan a new feature |
| `/prd` | opus | Generate Product Requirements Document |
| `/arch` | opus | Design technical architecture |
| `/stories` | sonnet | Create user stories with acceptance criteria |
| `/tasks` | sonnet | Break stories into tasks |
| `/impl <task-id>` | sonnet | Implement with TDD (red-green-refactor) |
| `/qa` | sonnet | Quality assurance checklist |
| `/release <version>` | haiku | Prepare release notes and changelog |
| `/status` | haiku | Show workflow progress |
| `/board` | haiku | Display task board |

## Artifacts

All outputs go to `docs/agile/`:

```
docs/agile/
├── plans/
├── prds/
├── architecture/
├── stories/
├── tasks/
├── qa/
├── releases/
└── boards/
```

## Principles

1. **Spec-first** — Define before building
2. **Test-driven** — Tests before code
3. **Incremental** — Validate each phase
4. **Traceable** — Tasks → Stories → PRD → Plan