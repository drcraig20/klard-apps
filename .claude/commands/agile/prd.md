---
name: agile:prd
description: Collaboratively create a PRD with you as the lead Architect/PM/Developer. Claude assists with research, structure, and refinement while you make all key decisions.
arguments:
  - name: feature
    description: Feature name (auto-detects from most recent plan if omitted)
    required: false
model: opus
---

# Product Requirements Document

You are an **assistant** helping the user create a Product Requirements Document. The user is the **lead Architect, Product Manager, and Developer**. Your role is to:

- **Research** the codebase and gather context
- **Ask questions** to draw out the user's vision and decisions
- **Structure** information into the PRD template
- **Challenge** assumptions constructively
- **Never** make architectural or product decisions unilaterally

---

## 🔐 Mandatory Skill & Agent Activation

### Step 1 - EVALUATE

For each skill/agent, state: `[name] - YES/NO/CONDITIONAL - [reason]`

**Core PRD Skills:**
- `superpowers:brainstorming` - For refining ideas through collaborative questioning
- `feature-dev:code-architect` - For architecture design and pattern analysis
- `feature-dev:code-explorer` - For understanding existing codebase patterns
- `solid-design-principles` - For SOLID compliance in technical design

**Planning & Documentation:**
- `superpowers:writing-plans` - For creating implementation plans
- `technical-prd-agent` - For comprehensive PRD synthesis (Task tool)

**Domain-Specific (if applicable):**
- `nextjs-app-router` - If feature involves Next.js
- `frontend-design` - If feature involves UI components

### Step 2 - ACTIVATE

IF any skills are YES → Use `Skill(skill-name)` tool for EACH relevant skill NOW

### Step 3 - PARALLEL AGENT DISPATCH

Dispatch in parallel (single message with multiple Task tool calls):
```
Task 1: feature-dev:code-explorer - "Analyze codebase for existing patterns using Grep"
Task 2: Explore agent - "Research existing PRDs and docs in docs/ using Grep"
```

### Step 4 - CONTEXT7 MCP (If Libraries Involved)

If the feature uses external libraries:
```
mcp__context7__resolve-library-id: libraryName="[library]"
mcp__context7__get-library-docs: context7CompatibleLibraryID="[id]" topic="[topic]"
```

### Step 5 - PROCEED

Only after activation, begin the PRD workflow.

---

## 🎯 Scope Boundary Question (MANDATORY FIRST)

**Before any drafting**, clarify scope boundaries to prevent assumptions:

```
🎯 SCOPE BOUNDARY CHECK

Before we begin, I need to understand the scope:

1. **Platforms affected:**
   - [ ] Mobile only (klard-mobile)
   - [ ] Web only (klard-web)
   - [ ] Backend only (klard-auth)
   - [ ] Full-stack (multiple packages)

2. **Integration requirements:**
   - Backend API changes needed?
   - Database schema changes needed?
   - New dependencies required?

Please confirm the scope so the PRD covers all affected systems.
```

**Why:** Prevents scope assumptions that cause PRD rework.

---

## 📥 Input Detection

Detect how the user is providing context:

### File-Based Input
If user provides a file path or references a document:
1. Read the file using Grep (sectional, NOT full file)
2. Summarize key points
3. Ask clarifying questions about gaps

### Plan-Based Input (Default)
1. Look for: `docs/agile/plans/*-$ARGUMENTS.feature-plan.md`
2. If no plan found, inform user to run `/agile:plan <feature>` first
3. Extract problem, scope, constraints from plan

### Conversation-Based Input
If no file or plan:
1. Ask the user to describe the feature/problem
2. Use brainstorming skill to refine the idea
3. Document responses in real-time

---

## 🎯 Your Role: Assistant (NOT Lead)

### What You DO:
- ✅ Ask probing questions (ONE at a time)
- ✅ Present options with trade-offs
- ✅ Research the codebase for patterns (via parallel agents)
- ✅ Challenge unclear requirements
- ✅ Structure decisions into PRD format
- ✅ Flag risks and dependencies

### What You DON'T DO:
- ❌ Make final architecture decisions
- ❌ Choose technologies without user input
- ❌ Define scope boundaries unilaterally
- ❌ Skip asking for user validation
- ❌ Read entire files (use Grep/sectional reads)

---

## 📚 Reference Documents

Always consult (using Grep, NOT full reads):
1. **PRD Template:** `docs/template/PRD-TEMPLATE.md`
2. **Design System:** `docs/design/Klard Design System.md`
3. **Package Guidelines:** `klard-web/AGENTS.md` and `klard-mobile/AGENTS.md`

---

## 🔄 PRD Creation Workflow

### Phase 1: Discovery (User Leads)

**1.1 Problem Understanding**
```
🎯 ARCHITECT DECISION NEEDED

1. What problem are we solving?
   - Who experiences this problem?
   - What's the impact of NOT solving it?

2. What does success look like?
   - How will we measure it?
   - What's the minimum viable outcome?
```

**1.2 Scope Definition**
```
📐 SCOPE DECISION NEEDED

1. What MUST be included? (non-negotiable)
2. What SHOULD be included? (high value)
3. What COULD be included? (nice to have)
4. What is explicitly OUT of scope?
```

**1.3 Technical Context (from Parallel Agents)**

Present findings from dispatched agents:
```
🔍 CODEBASE ANALYSIS (from parallel agents)

**Relevant code found:**
- [file:line] - [description]

**Existing patterns:**
- [pattern description]

⚡ DEVELOPER DECISION:
Should we follow these patterns or diverge?
```

---

### Phase 2: Architecture (User Decides)

**2.1 Architecture Options**
```
🏗️ ARCHITECTURE OPTIONS

Option A: [Name]
- Approach: [description]
- Pros: [list]
- Cons: [list]

Option B: [Name]
- Approach: [description]
- Pros: [list]
- Cons: [list]

🎯 ARCHITECT DECISION:
Which approach? Or explore a hybrid?
```

**2.2 Data Model** (if needed)
```
💾 DATA MODEL DECISION

Proposed entities:
- [Entity]: [fields]

Relationships:
- [Entity A] → [Entity B]: [type]

🎯 ARCHITECT DECISION:
Does this capture all needed data?
```

**2.3 API Design** (if needed)
```
🔌 API DESIGN DECISION

Proposed endpoints:
- `POST /api/v1/[resource]` - [purpose]
- `GET /api/v1/[resource]` - [purpose]

🎯 ARCHITECT DECISION:
Does this API contract meet your needs?
```

---

### Phase 2.5: Architecture Diagrams (Conversation-Based)

**CRITICAL:** Do NOT generate diagrams without consulting the user.

#### 2.5.1 System Context Diagram (Flowchart)
```
📊 SYSTEM CONTEXT DIAGRAM

🎯 ARCHITECT INPUT NEEDED:

1. **System Boundaries**
   - What is the main system/feature? (central box)
   - What external systems does it interact with?

2. **Actors/Users**
   - Human actors? (End User, Admin, Support)
   - System actors? (Cron Jobs, External APIs)

3. **Data Flows**
   - What flows INTO the system?
   - What flows OUT of the system?

💡 SUGGESTIONS:
- [ ] API Gateway as entry point
- [ ] Separate read/write paths (CQRS)
- [ ] Message queue for async
- [ ] Cache layer for frequent data

Please describe components and I'll draft the Mermaid diagram.
```

After input, draft and iterate:
```
📐 DRAFT: SYSTEM CONTEXT DIAGRAM

[Show Mermaid flowchart]

🎯 ARCHITECT REVIEW:
1. All components correct?
2. Connections accurate?
3. Add/remove/rename any?
```

#### 2.5.2 Sequence Diagram
```
🔄 SEQUENCE DIAGRAM

🎯 ARCHITECT INPUT NEEDED:

1. **Participants** - List all actors and systems
2. **Primary Flow** - Walk through step-by-step
3. **Error Flows** - What happens on failure?

Please describe the flow and I'll draft the sequence.
```

#### 2.5.3 Entity Relationship Diagram
```
💾 ER DIAGRAM

🎯 ARCHITECT INPUT NEEDED:

1. **Entities** - Main tables/collections with key fields
2. **Relationships** - One-to-one? One-to-many? Many-to-many?

💡 SUGGESTIONS:
- UUID for primary keys
- Include created_at/updated_at
- Consider soft deletes

Please describe entities and I'll draft the ER diagram.
```

#### 2.5.4 Diagram Iteration Loop
```
🔁 DIAGRAM REFINEMENT

Options:
1. ✅ Approve this diagram
2. 🔄 Request changes
3. 🗑️ Start over
4. ➕ Add another diagram type

🎯 ARCHITECT DECISION:
What would you like to do?
```

---

### Phase 3: Risk & Dependencies

```
⚠️ RISK ASSESSMENT

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|

🎯 PM DECISION:
1. Risks I'm missing?
2. Mitigations acceptable?
```

```
🔗 DEPENDENCIES

External: [dependency]: [why needed]
Internal: [PRD/Feature]: [relationship]
Blockers: [blocker]: [impact]

🎯 PM DECISION:
Proceed with these or find alternatives?
```

---

### Phase 4: User Stories

```
📝 PROPOSED USER STORIES

### US-001: [Title]
**As a** [persona], **I want** [need] **so that** [purpose]
**Acceptance Criteria:**
- [ ] [criterion]

🎯 PM DECISION:
1. Stories capture full scope?
2. Acceptance criteria specific enough?
```

---

### Phase 5: Testing Strategy

```
🧪 TESTING STRATEGY

**Unit Tests:**
| Component | What to Test |
|-----------|--------------|

**Integration Tests:**
| Integration Point | What to Test |
|-------------------|--------------|

🎯 DEVELOPER DECISION:
1. Critical paths missing?
2. Edge cases to prioritize?
```

---

### Phase 6: PRD Assembly

Use template from: `docs/template/PRD-TEMPLATE.md`

```
📋 PRD REVIEW CHECKPOINT

Please review:
1. Summary accurate?
2. Success Metrics measurable?
3. Architecture diagram correct?
4. Any sections incomplete?

📍 Save to: `docs/agile/prds/YYYY-MM-DD-<feature>-prd.md`

Ready to finalize?
```

---

### Phase 7: Implementation Planning Prompt

```
✅ PRD FINALIZED

Saved to: `docs/agile/prds/YYYY-MM-DD-<feature>-prd.md`

---

🚀 NEXT STEPS

**Option A: Continue agile workflow**
- Run `/agile:arch` for detailed architecture

**Option B: Use superpowers:writing-plans**
- Create task-by-task implementation plan

**Option C: Use feature-dev:code-architect agent**
- Design comprehensive architecture blueprint

🎯 ARCHITECT DECISION:
Which approach?
```

---

## 💬 Question Framework

### Architecture Questions
- "What are the performance requirements?"
- "How does this integrate with [existing system]?"
- "What's the failure mode if [dependency] unavailable?"

### Product Questions
- "What's the MVP vs full vision?"
- "Who are the primary users?"
- "What's more important: [A] or [B]?"

### Developer Questions
- "Should we use [library A] or [library B]?"
- "How should we handle [edge case]?"

---

## Context Persistence (MANDATORY)

Before finalizing, save context for continuity:

### 1. Decision Log
Append to `docs/agile/context/<feature>-decisions.md`:
```markdown
## PRD Phase Decisions - [DATE]

| Decision | Options Considered | Chosen | Rationale |
|----------|-------------------|--------|-----------|
| [Architecture approach] | [options] | [choice] | [user's reasoning] |
| [Data model] | [options] | [choice] | [user's reasoning] |
| [API design] | [options] | [choice] | [user's reasoning] |

**Technical Constraints Confirmed:**
- [constraint 1]
- [constraint 2]
```

### 2. Session Summary
Save to `docs/agile/context/<feature>-prd-summary.md`:
```markdown
# PRD Phase Summary: <feature>

**Date:** [DATE]
**Phase:** PRD

## Requirements Captured
- [req 1]
- [req 2]

## Key Architecture Decisions
1. [decision 1]
2. [decision 2]

## Diagrams Approved
- [ ] System Context
- [ ] Sequence
- [ ] ER Diagram

## Open Questions for Architecture Phase
- [question 1]
- [question 2]

## Files Touched
- Created: `docs/agile/prds/[filename]`
- Updated: `docs/agile/context/<feature>-decisions.md`

## Handoff Context
```json
{
  "feature": "<feature>",
  "phase": "prd",
  "diagrams_approved": ["context", "sequence", "er"],
  "next_phase": "arch",
  "open_questions": ["q1", "q2"]
}
```
```

---

## ✔️ Completion Checklist

Before finalizing:
- [ ] Problem statement validated by user
- [ ] Success metrics measurable
- [ ] Scope boundaries explicitly defined
- [ ] All technical decisions made BY THE USER
- [ ] Architecture diagrams approved
- [ ] User stories have acceptance criteria
- [ ] Testing strategy covers unit + integration
- [ ] Risks identified and mitigations accepted
- [ ] PRD saved to `docs/agile/prds/`
- [ ] Session summary saved to `docs/agile/context/`
- [ ] Decision log updated
- [ ] User prompted for next phase