---
name: agile:status
description: Show current agile workflow status and progress
model: haiku
---

# Workflow Status

## Skill-Aware Status

When showing recommended actions, include the skills that will be activated:

| Current State | Recommended Action | Skills Activated | Parallel Agents |
|---------------|-------------------|------------------|-----------------|
| No artifacts | `/agile:plan <feature>` | brainstorming (conditional), code-explorer | ✅ explorer + docs |
| Plan exists | `/agile:prd` | brainstorming (conditional), code-explorer | ✅ codebase + requirements |
| PRD exists | `/agile:arch` | code-architect, solid-design-principles, brainstorming (conditional) | ✅ architect + explorer |
| Architecture exists | `/agile:stories` | solid-design-principles, brainstorming (conditional) | ✅ PRD + architecture |
| Stories exist | `/agile:tasks` | writing-plans, brainstorming (conditional) | ✅ stories + code |
| Tasks exist | `/agile:impl <task-id>` | test-driven-development, verification | ✅ context (TDD sequential) |
| All tasks done | `/agile:qa` | code-review, verification | ✅ multiple reviewers |
| QA passed | `/agile:release <version>` | finishing-branch | ❌ sequential |
| Any phase done | `/agile:reflect` | conversation analysis | ❌ sequential |

## Check Artifacts

Scan `docs/agile/` for existing artifacts and determine current state.

## Phase Detection

| Phase | Artifact Location | Status |
|-------|-------------------|--------|
| 1. Plan | `docs/agile/plans/` | ✅/⏳/❌ |
| 2. PRD | `docs/agile/prds/` | ✅/⏳/❌ |
| 3. Architecture | `docs/agile/architecture/` | ✅/⏳/❌ |
| 4. Stories | `docs/agile/stories/` | ✅/⏳/❌ |
| 5. Tasks | `docs/agile/tasks/` | ✅/⏳/❌ |
| 6. Implementation | `docs/agile/boards/` | ✅/⏳/❌ |
| 7. QA | `docs/agile/qa/` | ✅/⏳/❌ |
| 8. Release | `docs/agile/releases/` | ✅/⏳/❌ |

Legend:
- ✅ Complete
- ⏳ In Progress
- ❌ Not Started

## Current Phase

Based on artifacts found, determine:
- **Current Phase**: [Phase name]
- **Active Feature**: [Feature name from most recent artifacts]

## Task Board Summary

If in implementation phase, show board status:

```
┌─────────────┬─────────────┬─────────────┬─────────────┐
│   Backlog   │ In Progress │   Review    │    Done     │
├─────────────┼─────────────┼─────────────┼─────────────┤
│     X       │      Y      │      Z      │      W      │
└─────────────┴─────────────┴─────────────┴─────────────┘
```

Progress: [W/(X+Y+Z+W)] tasks complete ([%]%)

## Blockers

Check for:
- Tasks stuck in "In Progress" for >2 days
- Dependencies not resolved
- QA failures not addressed

## Recent Activity

Show last 5 modified files in `docs/agile/`:
1. [file] - [timestamp]
2. [file] - [timestamp]
...