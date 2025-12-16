---
name: agile:stories
description: Create user stories with acceptance criteria from PRD
arguments:
  - name: feature
    description: Feature name (auto-detects if omitted)
    required: false
model: sonnet
---

# User Stories Creation

## Mandatory Skill Activation

### Step 1 - EVALUATE

- `solid-design-principles` - YES - Ensure stories promote good design
- `superpowers:brainstorming` - CONDITIONAL - If need to refine story scope

### Step 2 - ACTIVATE

Use `Skill(solid-design-principles)` tool NOW.
Use `Skill(superpowers:brainstorming)` tool if story scope needs exploration.

### Step 3 - PARALLEL AGENT DISPATCH

Dispatch in parallel (single message with multiple Task tool calls):
```
Task 1: Explore agent - "Analyze PRD for user personas and requirements"
Task 2: Explore agent - "Review architecture for technical constraints on stories"
```

### Step 4 - PROCEED

Only after activating skills and dispatching agents, continue below.

---

## Your Role: Assistant (NOT Lead)

**The user is the lead PM.** Generate stories based on PRD, validate each with user.

---

## Find Context Documents

1. PRD from `docs/agile/prds/`
2. Architecture from `docs/agile/architecture/`

---

## Story Mapping

First, propose a high-level story map:
```
📊 STORY MAP

🎯 PM VALIDATION NEEDED:

Proposed epic structure:
```
Epic: [Feature Name]
├── Theme 1: [Theme]
│   ├── Story 1.1
│   └── Story 1.2
└── Theme 2: [Theme]
    └── Story 2.1
```

Does this structure make sense? Any themes missing?
```

---

## Generate User Stories (Validate Each)

For each story, present for validation:
```
📝 STORY PROPOSAL

### STORY-NNN: [Story Title]

**Priority:** P0 | P1 | P2
**Size:** S (1-2h) | M (3-4h) | L (1d) | XL (2-3d)

**As a** [persona from PRD]
**I want** [capability]
**So that** [benefit/value]

**Acceptance Criteria (Gherkin):**
```gherkin
Scenario: [Happy path]
  Given [initial context]
  When [action taken]
  Then [expected result]

Scenario: [Edge case]
  Given [edge case context]
  When [action taken]
  Then [expected handling]

Scenario: [Error case]
  Given [error condition]
  When [action taken]
  Then [error handled gracefully]
```

**Technical Notes:**
- Files likely affected: [list]
- Dependencies: [other stories]

🎯 PM DECISION:
1. Is this story correctly scoped?
2. Are the acceptance criteria complete?
3. Is the size estimate reasonable?
```

---

## SOLID Story Check

After generating stories, verify they promote good design:
```
✅ SOLID STORY CHECK

| Story | SRP Impact | Notes |
|-------|------------|-------|
| STORY-001 | ✅ Single concern | [notes] |
| STORY-002 | ⚠️ Multiple concerns | Consider splitting |

🎯 PM DECISION:
Should any stories be split for better design?
```

---

## Prioritization Matrix

```
📊 PRIORITIZATION MATRIX

| Story | Value | Effort | Priority | Dependencies |
|-------|-------|--------|----------|--------------|
| STORY-001 | High | Low | P0 | - |
| STORY-002 | High | Med | P0 | STORY-001 |

🎯 PM DECISION:
Does this prioritization align with your goals?
```

---

## Output

Save to: `docs/agile/stories/YYYY-MM-DD-<feature>-stories.md`

Include:
- Story map
- All stories with full details
- SOLID compliance notes
- Prioritization matrix
- Dependency notes

---

## Context Persistence (MANDATORY)

Before proceeding to the next phase, save context for continuity:

### 1. Decision Log
Append to `docs/agile/context/<feature>-decisions.md`:
```markdown
## Stories Phase Decisions - [DATE]

| Decision | Options Considered | Chosen | Rationale |
|----------|-------------------|--------|-----------|
| Story scope | [options] | [choice] | [user's reasoning] |
| Prioritization | [options] | [choice] | [user's reasoning] |

**Stories Created:**
| ID | Title | Priority | Size |
|----|-------|----------|------|
| STORY-001 | [title] | P0 | M |
```

### 2. Session Summary
Save to `docs/agile/context/<feature>-stories-summary.md`:
```markdown
# Stories Phase Summary: <feature>

**Date:** [DATE]
**Phase:** Stories

## Story Map
[Epic structure summary]

## Stories by Priority
**P0 (Must Have):**
- STORY-001: [title]

**P1 (Should Have):**
- STORY-002: [title]

## SOLID Story Check Results
[summary of any stories that needed splitting]

## Dependencies Identified
- STORY-002 depends on STORY-001

## Open Questions for Tasks Phase
- [question 1]

## Files Touched
- Created: `docs/agile/stories/[filename]`
- Updated: `docs/agile/context/<feature>-decisions.md`

## Handoff Context
```json
{
  "feature": "<feature>",
  "phase": "stories",
  "stories": ["STORY-001", "STORY-002"],
  "priority_order": ["STORY-001", "STORY-002"],
  "next_phase": "tasks"
}
```
```

---

## Next Phase

"✅ Stories complete. Run `/agile:tasks` to break down into implementable tasks."