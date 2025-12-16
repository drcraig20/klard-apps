# Agile Development Workflow

Spec-driven agile development using Claude Code commands.

## Workflow

```
/plan → /prd → /arch → /stories → /tasks → /impl → /qa → /release
```

## Quick Commands

| Command | Description |
|---------|-------------|
| `/plan <feature>` | Start planning a new feature |
| `/prd` | Generate PRD from plan |
| `/arch` | Design architecture |
| `/stories` | Create user stories |
| `/tasks` | Generate task breakdown |
| `/impl <task-id>` | Implement task with TDD |
| `/qa` | Run QA process |
| `/release <version>` | Prepare release |
| `/status` | Show workflow status |
| `/board` | Display task board |

## Directory Structure

```
docs/agile/
├── plans/           # Feature plans
├── prds/            # Product requirements
├── architecture/    # Technical designs
├── stories/         # User stories
├── tasks/           # Task breakdowns
├── qa/              # QA reports
├── releases/        # Release notes
└── boards/          # Kanban boards
```

## Getting Started

1. Run `/plan <feature-name>` to start planning
2. Follow the workflow phase by phase
3. Use `/status` to check progress
