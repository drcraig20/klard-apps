---
name: agile:plan
description: Start planning a new feature using spec-driven agile workflow with brainstorming
arguments:
  - name: feature
    description: Name of the feature to plan
    required: true
model: opus
---

# Feature Planning: $ARGUMENTS.feature

## Mandatory Skill Activation

### Step 1 - EVALUATE

- `superpowers:brainstorming` - CONDITIONAL - If multiple approaches or complex problem
- `feature-dev:code-explorer` - YES - Understanding existing codebase patterns

### Step 2 - ACTIVATE

Use `Skill(superpowers:brainstorming)` tool if complexity warrants it.

### Step 3 - PARALLEL AGENT DISPATCH

Dispatch in parallel (single message with multiple Task tool calls):
```
Task 1: feature-dev:code-explorer - "Analyze codebase for patterns related to [feature]"
Task 2: Explore agent - "Research existing implementations in docs/ directory do not read or include unrelated docs"
```

### Step 4 - PROCEED

Only after activating skills and dispatching agents, continue below.

---

## Your Role: Assistant (NOT Lead)

**The user is the lead Architect/PM/Developer.** You are helping them articulate their vision.

### What You DO:
- ✅ Ask ONE question at a time
- ✅ Present 2-3 options with trade-offs
- ✅ Research the codebase for patterns (via parallel agents)
- ✅ Challenge unclear requirements
- ✅ Suggest best practices

### What You DON'T DO:
- ❌ Make final decisions without user input
- ❌ Skip asking for validation
- ❌ Assume requirements

---

## Setup

Ensure the agile directory structure exists:
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

Create any missing directories with .gitkeep files.

---

## Agent Timeout Strategy

When dispatching parallel agents:

1. **Initial dispatch:** Use shorter timeout (30-45s) with `block=false`
2. **While waiting:** Continue with independent work (file reads, local analysis)
3. **Check progress:** Use `TaskOutput(task_id, block=false)` periodically
4. **Final wait:** Use `block=true` only when ready to process results

**Example:**
```
# Dispatch agents (non-blocking)
agent_1 = Task(..., run_in_background=true)
agent_2 = Task(..., run_in_background=true)

# Do other work while waiting...
Read file_1
Read file_2

# Check if ready
TaskOutput(agent_1, block=false)

# When ready to process
TaskOutput(agent_1, block=true, timeout=60000)
```

**Why:** Prevents idle waiting and uses time efficiently.

---

## Context Gathering (Parallel Agents)

Dispatch parallel agents to gather context:

```
🔍 DISPATCHING PARALLEL AGENTS

Agent 1: feature-dev:code-explorer
- Task: "Analyze project structure and patterns for [feature]"

Agent 2: Explore agent
- Task: "Find relevant documentation in docs/"

Waiting for results...
```

Present combined findings:
```
🔍 CODEBASE ANALYSIS (from parallel agents)

**Code Explorer findings:**
- [file:line] - [description]
- Existing patterns: [pattern description]

**Documentation findings:**
- [relevant docs]

⚡ ARCHITECT INPUT:
Does this context match your understanding? Anything to add?
```

---

## Planning Questions (One at a Time)

Following the brainstorming skill (if activated), ask these ONE AT A TIME:

### Question 1: Problem
```
🎯 ARCHITECT INPUT NEEDED

**What problem are we solving?**
- Who experiences this problem?
- Why does it matter now?
- What's the impact of NOT solving it?
```

### Question 2: User
```
🎯 ARCHITECT INPUT NEEDED

**Who is the primary user?**
- What's their current workflow?
- What pain points do they have?
```

### Question 3: Success
```
🎯 ARCHITECT INPUT NEEDED

**What does success look like?**
- How will we measure it?
- What's the minimum viable outcome?
```

### Question 4: Scope
```
🎯 ARCHITECT INPUT NEEDED

**What's explicitly OUT of scope?**
- What are we NOT building?
- What can wait for future iterations?
```

### Question 5: Constraints
```
🎯 ARCHITECT INPUT NEEDED

**Any constraints?**
- Technical constraints?
- Time constraints?
- Resource constraints?
```

### Question 6: Integration
```
🎯 ARCHITECT INPUT NEEDED

**How does this fit with existing functionality?**
- What existing code will be affected?
- Are there dependencies?
```

---

## Approach Options

After gathering context, propose 2-3 approaches:

```
🏗️ APPROACH OPTIONS

**Option A: [Name]**
- Approach: [description]
- Pros: [list]
- Cons: [list]
- Effort: [estimate]

**Option B: [Name]**
- Approach: [description]
- Pros: [list]
- Cons: [list]
- Effort: [estimate]

💡 **Recommendation:** Option [X] because [reasoning]

🎯 ARCHITECT DECISION:
Which approach aligns with your vision? Or should we explore a hybrid?
```

---

## Output

Save to: `docs/agile/plans/YYYY-MM-DD-$ARGUMENTS.feature-plan.md`

Include:
- Problem statement (user's words)
- User context
- Success criteria
- Chosen approach with user's rationale
- High-level scope
- Out of scope items
- Constraints and risks
- Next steps

---

## Context Persistence (MANDATORY)

Before proceeding to the next phase, save context for continuity:

### 1. Decision Log
Append to `docs/agile/context/$ARGUMENTS.feature-decisions.md`:
```markdown
## Plan Phase Decisions - [DATE]

| Decision | Options Considered | Chosen | Rationale |
|----------|-------------------|--------|-----------|
| [decision] | [options] | [choice] | [user's reasoning] |

**Key Constraints Identified:**
- [constraint 1]
- [constraint 2]
```

### 2. Session Summary
Save to `docs/agile/context/$ARGUMENTS.feature-plan-summary.md`:
```markdown
# Plan Phase Summary: $ARGUMENTS.feature

**Date:** [DATE]
**Phase:** Planning

## Problem Statement
[User's words verbatim]

## Chosen Approach
[Approach name]: [brief description]

## Key Decisions
1. [decision 1]
2. [decision 2]

## Open Questions for PRD Phase
- [question 1]
- [question 2]

## Files Touched
- Created: `docs/agile/plans/[filename]`

## Handoff Context
```json
{
  "feature": "$ARGUMENTS.feature",
  "phase": "plan",
  "approach": "[chosen approach]",
  "next_phase": "prd",
  "open_questions": ["q1", "q2"]
}
```
```

---

## Phase Gate: Design Validation

Before saving plan, present to user for validation:

```
🎯 ARCHITECT VALIDATION GATE

**Design Summary:**
- Approach: [approach name]
- Component reuse: [% of existing components]
- New components: [count]
- SOLID compliance: [status]

**Ready for PRD phase?**

**Options:**
- **Yes, save plan** - Proceed to `/agile:prd`
- **Refine design** - Go back to brainstorming questions
- **Adjust scope** - Modify in/out of scope items
```

Wait for explicit user approval before proceeding.

---

## Next Phase

✅ Upon user approval: "Plan complete and saved to `docs/agile/plans/YYYY-MM-DD-$ARGUMENTS.feature-plan.md`.

Ready for PRD phase? Run `/agile:prd`"