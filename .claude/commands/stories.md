---
name: stories
description: Create user stories with acceptance criteria from PRD
arguments:
  - name: feature
    description: Feature name (auto-detects if omitted)
    required: false
model: sonnet
---

# User Stories Creation

## Find Context Documents

Load these documents:
1. PRD from `docs/agile/prds/`
2. Architecture from `docs/agile/architecture/`

## Story Mapping

First, create a high-level story map:
```
Epic: [Feature Name]
├── Theme 1: [Theme]
│   ├── Story 1.1
│   └── Story 1.2
└── Theme 2: [Theme]
    └── Story 2.1
```

## Generate User Stories

For each requirement in the PRD, create stories:

### Story Format
```
STORY-NNN: [Story Title]

Priority: P0 | P1 | P2
Size: S (1-2h) | M (3-4h) | L (1d) | XL (2-3d)

As a [persona from PRD]
I want [capability]
So that [benefit/value]
```

### Acceptance Criteria

Write in Gherkin format:
```gherkin
Scenario: [Happy path]
  Given [initial context]
  When [action taken]
  Then [expected result]
  And [additional expectations]

Scenario: [Edge case]
  Given [edge case context]
  When [action taken]
  Then [expected handling]

Scenario: [Error case]
  Given [error condition]
  When [action taken]
  Then [error handled gracefully]
```

### Technical Notes
- Implementation hints from architecture
- Files likely to be modified
- Dependencies on other stories

### Definition of Done
- [ ] Code complete
- [ ] Unit tests (>80% coverage)
- [ ] Integration tests passing
- [ ] Code reviewed
- [ ] Documentation updated
- [ ] Deployed to staging

## Sizing Guide

| Size | Complexity | Hours | Examples |
|------|------------|-------|----------|
| S | Simple, well-understood | 1-2h | Add field, fix typo |
| M | Moderate, some unknowns | 3-4h | New component, API endpoint |
| L | Complex, multiple parts | 1 day | New feature, integration |
| XL | Very complex, many unknowns | 2-3 days | Major refactor, new system |

## Prioritization

Create a prioritization matrix:
| Story | Value | Effort | Priority | Dependencies |
|-------|-------|--------|----------|--------------|

Order by: P0 first, then value/effort ratio within each priority.

## Output

Save to: `docs/agile/stories/YYYY-MM-DD-<feature>-stories.md`

Include:
- Story map
- All stories with full details
- Prioritization matrix
- Dependency notes

## Next Phase

"✅ Stories complete. Run `/tasks` to break down into implementable tasks."
