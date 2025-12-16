---
name: plan
description: Start planning a new feature using spec-driven agile workflow
arguments:
  - name: feature
    description: Name of the feature to plan
    required: true
model: opus
---

# Feature Planning: $ARGUMENTS.feature

You are starting the spec-driven agile workflow. Follow these steps:

## Setup

First, ensure the agile directory structure exists:
```
docs/agile/
├── plans/
├── prds/
├── architecture/
├── stories/
├── tasks/
├── tests/
├── qa/
├── releases/
├── boards/
└── sprints/
```

Create any missing directories with .gitkeep files.

## Context Gathering

Before asking questions, review:
1. README.md - Understand the project
2. Recent git commits - What's been worked on
3. Existing docs/ - Any related documentation
4. src/ structure - Technical architecture

## Planning Questions

Ask these questions ONE AT A TIME. Wait for each answer before proceeding:

1. **Problem**: What problem are we solving? Why does it matter now?

2. **User**: Who is the primary user? What's their current workflow?

3. **Success**: What does success look like? How will we measure it?

4. **Scope**: What's explicitly OUT of scope for this feature?

5. **Constraints**: Any technical, time, or resource constraints?

6. **Integration**: How does this fit with existing functionality?

## Approach Options

After gathering context, propose 2-3 approaches:
- For each approach: brief description, pros, cons, rough effort
- Make a clear recommendation with reasoning
- Let user choose or request modifications

## Output

Create the plan document at:
`docs/agile/plans/YYYY-MM-DD-$ARGUMENTS.feature-plan.md`

Include:
- Problem statement
- User context
- Success criteria
- Chosen approach with rationale
- High-level scope
- Known constraints and risks
- Next steps

## Next Phase

After saving the plan, inform the user:
"✅ Plan complete. Run `/prd` to generate the Product Requirements Document."
