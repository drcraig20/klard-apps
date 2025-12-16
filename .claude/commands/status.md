---
name: status
description: Show current agile workflow status and progress
model: haiku
---

# Workflow Status

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

## Recommendations

Based on current state, suggest next action:

| Current State | Recommended Action |
|---------------|-------------------|
| No artifacts | `/plan <feature>` |
| Plan exists | `/prd` |
| PRD exists | `/arch` |
| Architecture exists | `/stories` |
| Stories exist | `/tasks` |
| Tasks exist | `/impl <task-id>` |
| All tasks done | `/qa` |
| QA passed | `/release <version>` |

## Quick Actions

```
/plan <feature>  - Start new feature
/board           - View task board
/impl <task-id>  - Work on task
/status          - Refresh status
```

## Recent Activity

Show last 5 modified files in `docs/agile/`:
1. [file] - [timestamp]
2. [file] - [timestamp]
...
