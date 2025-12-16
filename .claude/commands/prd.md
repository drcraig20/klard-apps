---
name: prd
description: Generate Product Requirements Document from the feature plan
arguments:
  - name: feature
    description: Feature name (auto-detects from most recent plan if omitted)
    required: false
model: opus
---

# Product Requirements Document

## Find the Plan

1. If feature name provided, look for: `docs/agile/plans/*-$ARGUMENTS.feature-plan.md`
2. Otherwise, find the most recently modified plan in `docs/agile/plans/`
3. If no plan found, inform user to run `/plan <feature>` first

## Load Context

Read and understand:
- The plan document
- Referenced existing documentation
- Current codebase structure

## Generate PRD Sections

Present each section for validation. Wait for confirmation before proceeding to the next.

### 1. Overview
- Problem Statement (from plan)
- Background context

### 2. Goals & Success Metrics
- Primary goal
- Secondary goals
- Non-goals (explicit exclusions)
- Measurable success criteria with targets

### 3. User Personas
For each persona:
- Role/title
- Goals
- Pain points
- Technical level

### 4. Requirements
Categorize each requirement:
- **P0 (Must Have)**: Core functionality, release blocker
- **P1 (Should Have)**: Important but not critical
- **P2 (Could Have)**: Nice to have

Each requirement needs:
- Clear description
- Acceptance criteria
- Dependencies

### 5. User Flows
Document the primary user journeys:
1. Step-by-step flow
2. Decision points
3. Error handling paths

### 6. Constraints & Assumptions
- Technical constraints
- Business constraints
- Assumptions being made
- External dependencies

### 7. Risks
| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|

### 8. Timeline
Key milestones with target dates

## Output

Save to: `docs/agile/prds/YYYY-MM-DD-<feature>-prd.md`

Reference the plan document in the PRD header.

## Next Phase

"✅ PRD complete. Run `/arch` to design the technical architecture."
