---
name: board
description: Display and manage the task board
arguments:
  - name: feature
    description: Feature name (auto-detects most recent if omitted)
    required: false
model: haiku
---

# Task Board

## Find Board

1. If feature specified, load: `docs/agile/boards/<feature>-board.md`
2. Otherwise, find most recently modified board in `docs/agile/boards/`
3. If no board found, inform user to run `/tasks` first

## Display Board

### Visual Format

```
╔══════════════════════════════════════════════════════════════════════╗
║                        TASK BOARD: <feature>                          ║
╠═════════════════╦═════════════════╦═════════════════╦════════════════╣
║     BACKLOG     ║   IN PROGRESS   ║     REVIEW      ║      DONE      ║
╠═════════════════╬═════════════════╬═════════════════╬════════════════╣
║ □ TASK-001      ║ ◐ TASK-003      ║ ○ TASK-005      ║ ● TASK-002     ║
║   Description   ║   @developer    ║   PR #123       ║   ✓ Complete   ║
║   (2h)          ║   (4h)          ║   (2h)          ║   (3h)         ║
╠═════════════════╬═════════════════╬═════════════════╬════════════════╣
║ □ TASK-004      ║                 ║                 ║ ● TASK-006     ║
║   Description   ║                 ║                 ║   ✓ Complete   ║
║   (3h)          ║                 ║                 ║   (2h)         ║
╚═════════════════╩═════════════════╩═════════════════╩════════════════╝
```

### Summary Stats

| Status | Count | Hours |
|--------|-------|-------|
| Backlog | X | Xh |
| In Progress | X | Xh |
| Review | X | Xh |
| Done | X | Xh |
| **Total** | **X** | **Xh** |

**Progress**: [Done/Total] ([X]%)

### Blocked Tasks

If any tasks are blocked, highlight:
⚠️ TASK-XXX blocked by: [reason]

### Dependency View

Show tasks ready to start (all dependencies met):
- TASK-XXX: [description] - Ready ✓
- TASK-YYY: [description] - Blocked by TASK-ZZZ

## Task Actions

### Move Tasks

```
/task start TASK-XXX     Move to In Progress
/task review TASK-XXX    Move to Review  
/task done TASK-XXX      Move to Done
/task block TASK-XXX     Mark as blocked
```

### View Details

```
/task show TASK-XXX      Show full task details
```

## Recommended Next Task

Based on:
1. Dependencies satisfied
2. Priority (P0 > P1 > P2)
3. Size (smaller first for momentum)

**Suggested**: TASK-XXX - [description]
Run: `/impl TASK-XXX`

## Board Health

### Metrics
- **WIP Limit**: [X] tasks in progress (limit: 3)
- **Cycle Time**: Average [X] hours per task
- **Oldest in Progress**: TASK-XXX ([X] days)

### Warnings
- ⚠️ Too many tasks in progress (WIP > 3)
- ⚠️ Task stuck for >2 days
- ⚠️ No tasks in review (consider code review)

## Quick Commands

| Command | Description |
|---------|-------------|
| `/board` | Refresh board |
| `/status` | Full workflow status |
| `/impl <id>` | Start implementing task |
| `/task list` | List all tasks |
