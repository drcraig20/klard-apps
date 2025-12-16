---
name: agile:arch
description: Design technical architecture based on the PRD
arguments:
  - name: feature
    description: Feature name (auto-detects from most recent PRD if omitted)
    required: false
model: opus
---

# Architecture Design

## Mandatory Skill Activation

### Step 1 - EVALUATE

- `feature-dev:code-architect` - YES - Architecture design and pattern analysis
- `solid-design-principles` - YES - SOLID compliance in design
- `superpowers:brainstorming` - CONDITIONAL - If exploring architectural options

### Step 2 - ACTIVATE

Use `Skill(solid-design-principles)` tool NOW.
Use `Skill(superpowers:brainstorming)` tool if exploring multiple approaches.

### Step 3 - PARALLEL AGENT DISPATCH

Dispatch in parallel (single message with multiple Task tool calls):
```
Task 1: feature-dev:code-architect - "Design architecture for [feature] based on PRD"
Task 2: feature-dev:code-explorer - "Analyze existing architecture patterns in codebase"
```

### Step 4 - PROCEED

Only after activating skills and dispatching agents, continue below.

---

## Your Role: Assistant (NOT Lead)

**The user is the lead Architect.** Present options, analyze trade-offs, but let them decide.

---

## Find the PRD

1. If feature name provided, look for: `docs/agile/prds/*-$ARGUMENTS.feature-prd.md`
2. Otherwise, find the most recently modified PRD in `docs/agile/prds/`
3. If no PRD found, inform user to run `/agile:prd` first

---

## Analyze Existing Architecture (Parallel Agents)

Dispatch parallel agents:
```
🔍 DISPATCHING PARALLEL AGENTS

Agent 1: feature-dev:code-architect
- Task: "Design architecture for [feature]"

Agent 2: feature-dev:code-explorer
- Task: "Analyze existing architecture patterns"

Waiting for results...
```

Present combined findings:
```
🔍 EXISTING ARCHITECTURE ANALYSIS (from parallel agents)

**Code Architect recommendations:**
- [architectural approach]

**Existing Patterns (from explorer):**
- [pattern]: [where used]

**Technology Stack:**
- [tech]: [version]

**Relevant Files:**
- [file:line] - [description]

🎯 ARCHITECT INPUT:
Should we follow these patterns or is there a reason to diverge?
```

---

## Conversation-Based Diagram Creation

### System Context Diagram

**Do NOT generate diagrams without consulting the user.**

```
📊 SYSTEM CONTEXT DIAGRAM

Let's map out the system architecture together.

🎯 ARCHITECT INPUT NEEDED:

1. **System Boundaries**
   - What is the main system/feature we're building?
   - What are the external systems it interacts with?

2. **Actors/Users**
   - Who are the human actors? (e.g., End User, Admin)
   - Who are the system actors? (e.g., Cron Jobs, External APIs)

3. **Data Flows**
   - What data flows INTO the system?
   - What data flows OUT of the system?

💡 BEST PRACTICE SUGGESTIONS:
- [ ] API Gateway as entry point
- [ ] Separate read/write paths (CQRS)
- [ ] Message queue for async operations
- [ ] Cache layer for frequently accessed data

Please describe your components and I'll draft the Mermaid diagram.
```

After input, draft and iterate:
```
📐 DRAFT: SYSTEM CONTEXT DIAGRAM

[Show Mermaid flowchart based on user input]

🎯 ARCHITECT REVIEW:
1. Are all components represented correctly?
2. Are the connections accurate?
3. Should I add/remove/rename any components?
```

### Sequence Diagram

```
🔄 SEQUENCE DIAGRAM

Let's map the interaction flow step-by-step.

🎯 ARCHITECT INPUT NEEDED:

1. **Participants** (columns in the diagram)
   - List all actors and systems involved

2. **Primary Flow** (happy path)
   - What's step 1? Who initiates?
   - Walk me through until completion

3. **Error Flows**
   - What happens on error?

Please describe the flow and I'll draft the sequence.
```

### Entity Relationship Diagram

```
💾 ENTITY RELATIONSHIP DIAGRAM

Let's design the data model together.

🎯 ARCHITECT INPUT NEEDED:

1. **Entities** (tables/collections)
   - What are the main entities?
   - For each, what are the key fields?

2. **Relationships**
   - How do entities relate?
   - One-to-many? Many-to-many?

💡 BEST PRACTICE SUGGESTIONS:
- Use UUID for primary keys
- Include created_at/updated_at
- Consider soft deletes

Please describe your entities and I'll draft the ER diagram.
```

---

## SOLID Compliance Check

After architecture is drafted, validate against SOLID:

```
✅ SOLID COMPLIANCE CHECK

| Principle | Status | Notes |
|-----------|--------|-------|
| Single Responsibility | ✅/⚠️/❌ | [notes] |
| Open/Closed | ✅/⚠️/❌ | [notes] |
| Liskov Substitution | ✅/⚠️/❌ | [notes] |
| Interface Segregation | ✅/⚠️/❌ | [notes] |
| Dependency Inversion | ✅/⚠️/❌ | [notes] |

🎯 ARCHITECT REVIEW:
Any concerns with SOLID compliance?
```

---

## Technology Decisions (ADRs)

For each significant decision:
```
📝 ARCHITECTURE DECISION RECORD

**ADR-NNN: [Title]**

🎯 ARCHITECT INPUT NEEDED:

**Context:** [Why this decision is needed]

**Options:**
- Option A: [description] - [pros/cons]
- Option B: [description] - [pros/cons]

💡 **Recommendation:** [Your suggestion with reasoning]

Which option do you prefer and why?
```

---

## Output

Save to: `docs/agile/architecture/YYYY-MM-DD-<feature>-arch.md`

Include:
- All Mermaid diagrams (approved by user)
- ADRs with user's decisions
- SOLID compliance table
- Security considerations
- Performance notes

---

## Next Phase

"✅ Architecture complete. Run `/agile:stories` to create user stories."