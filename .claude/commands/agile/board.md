---
name: agile:board
description: Display task board for current feature
arguments:
  - name: feature
    description: Feature name (auto-detects most recent if omitted)
    required: false
model: haiku
---

# Task Board

## Find Board

1. If feature provided: `docs/agile/boards/<feature>-board.md`
2. Otherwise: Most recent board in `docs/agile/boards/`

## Display Board

```
┌─────────────────────────────────────────────────────────────────┐
│                        [Feature Name]                            │
├─────────────┬─────────────┬─────────────┬─────────────┬─────────┤
│   Backlog   │ In Progress │   Review    │    Done     │ Blocked │
├─────────────┼─────────────┼─────────────┼─────────────┼─────────┤
│ TASK-001    │ TASK-003    │ TASK-002    │ TASK-004    │         │
│ TASK-005    │             │             │ TASK-006    │         │
└─────────────┴─────────────┴─────────────┴─────────────┴─────────┘
```

## Progress

- Total tasks: X
- Completed: Y (Z%)
- Remaining estimate: Xh

## Dependencies

Show blocked tasks and their blockers.

## Quick Actions

```
/agile:impl <task-id>  - Work on task
/agile:status          - Full workflow status
/agile:qa              - Run QA (when all done)
```