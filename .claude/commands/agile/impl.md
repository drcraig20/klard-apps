---
name: agile:impl
description: Implement a task using Test-Driven Development (red-green-refactor)
arguments:
  - name: task_id
    description: Task ID to implement (e.g., AUTH-001-01)
    required: true
model: sonnet
---

# Implement Task: $ARGUMENTS.task_id

## Mandatory Skill Activation

### Step 1 - EVALUATE

- `superpowers:using-git-worktrees` - YES - Isolate implementation in worktree (MANDATORY)
- `superpowers:subagent-driven-development` - YES - Fresh subagent per task with code review
- `superpowers:dispatching-parallel-agents` - CONDITIONAL - If implementing 3+ independent tasks
- `superpowers:test-driven-development` - YES - TDD workflow
- `superpowers:verification-before-completion` - YES - Verify before claiming done
- `superpowers:testing-anti-patterns` - YES - Avoid testing mistakes
- `solid-design-principles` - YES - Write SOLID code
- `superpowers:brainstorming` - CONDITIONAL - If implementation approach unclear

### Step 2 - ACTIVATE

**⚠️ WORKTREE ISOLATION REQUIRED:**
Use `Skill(superpowers:using-git-worktrees)` tool FIRST - create isolated worktree before any implementation.

**⚠️ PARALLEL IMPLEMENTATION (if multiple independent tasks):**
Use `Skill(superpowers:dispatching-parallel-agents)` if implementing 3+ independent tasks.
Use `Skill(superpowers:subagent-driven-development)` for subagent-per-task workflow.

Then activate remaining skills:
Use `Skill(superpowers:test-driven-development)` tool NOW.
Use `Skill(superpowers:testing-anti-patterns)` tool NOW.
Use `Skill(solid-design-principles)` tool NOW.
Use `Skill(superpowers:brainstorming)` tool if approach needs exploration.

### Step 3 - PARALLEL AGENT DISPATCH (Context Gathering Only)

**TDD cycle is sequential** (red → green → refactor), BUT context gathering happens in parallel BEFORE:

Dispatch in parallel (single message with multiple Task tool calls):
```
Task 1: Explore agent - "Search task files for $ARGUMENTS.task_id details using Grep"
Task 2: feature-dev:code-explorer - "Analyze files that will be modified/created using Grep patterns"
Task 3: Explore agent - "Find related tests and patterns using Grep"
Task 4: Explore agent - "Find existing UI components that can be reused for this task (check klard-web/src/components and klard-mobile/src/components)"
```

### Step 4 - CONTEXT7 LIBRARY LOOKUP (BLOCKING)

**⚠️ DO NOT proceed to TDD until this step is complete.**

1. **Identify libraries** from task description
2. **Resolve each library ID:**
   ```
   mcp__context7__resolve-library-id: libraryName="[library]"
   ```
3. **Fetch documentation:**
   ```
   mcp__context7__get-library-docs: context7CompatibleLibraryID="[id]" topic="[topic]"
   ```
4. **Present to user:**
   ```
   📚 CONTEXT7 LIBRARY DOCUMENTATION

   **Libraries for $ARGUMENTS.task_id:**
   | Library | Topic | Key API Pattern |
   |---------|-------|-----------------|
   | [lib] | [topic] | [pattern from docs] |

   🎯 DEVELOPER CONFIRMATION:
   Library patterns loaded. Ready to proceed with TDD?
   ```

**Why blocking:** Training data may have outdated APIs. Context7 ensures CURRENT patterns.

### Step 5 - PROCEED

Only after activating skills, receiving context from parallel agents, AND fetching Context7 docs, continue below.

---

## Your Role: Assistant (NOT Lead)

**The user is the lead Developer.** You assist with TDD, but they:
- Confirm readiness before each phase
- Validate test approaches
- Decide when implementation is "good enough"
- Approve refactoring changes

---

## Context Engineering Rules

**NEVER read entire files.** Use intelligent, sectional reading:

1. **Use Grep to find relevant sections:**
   ```
   Grep: pattern="class.*ComponentName" path="src/"
   Grep: pattern="function.*methodName" path="src/"
   Grep: pattern="import.*from" path="src/file.ts"
   ```

2. **Use Read with offset/limit for specific lines:**
   ```
   Read: file_path="src/file.ts" offset=45 limit=30
   ```

3. **Summarize, don't dump:**
   - Present key signatures and interfaces
   - Show only relevant code blocks
   - Provide condensed context

---

## Find Task Context (via Parallel Agents)

Using context from dispatched agents:
1. Task details from `docs/agile/tasks/`
2. Load task description, files, subtasks
3. Find related story from `docs/agile/stories/`
4. Check architecture notes from `docs/agile/architecture/`

---

## Fetch Library Documentation (MANDATORY)

**BEFORE writing any code that uses external libraries, you MUST:**

1. **Resolve library ID:**
   ```
   mcp__context7__resolve-library-id: libraryName="[library-name]"
   ```

2. **Fetch current documentation:**
   ```
   mcp__context7__get-library-docs:
     context7CompatibleLibraryID="[resolved-id]"
     topic="[relevant-topic]"
     mode="code"
   ```

3. **Present key patterns to user:**
   ```
   📚 LIBRARY DOCUMENTATION (Context7)

   **[Library Name] - Latest Patterns:**
   - [Key API pattern 1]
   - [Key API pattern 2]

   🎯 DEVELOPER CONFIRMATION:
   Ready to proceed with these patterns?
   ```

**DO NOT skip this step.** Training data may have outdated patterns.

---

## Pre-Implementation Checklist

```
✅ PRE-IMPLEMENTATION CHECK

- [ ] **Working in isolated git worktree** (MANDATORY - verify with `git worktree list`)
- [ ] Task dependencies are complete
- [ ] Understand acceptance criteria
- [ ] Know which files to modify/create
- [ ] **Library docs fetched via Context7 MCP** (MANDATORY if using libraries)
- [ ] **Existing components identified for reuse** (NO DRY violations)
- [ ] Test framework identified

♻️ REUSABLE COMPONENTS FOR THIS TASK:
| Component | Path | How to Use |
|-----------|------|------------|
| [component] | [path] | [usage] |

🎯 DEVELOPER CONFIRMATION:
Ready to proceed?
```

---

## Parallel Sub-Agent Implementation (When Applicable)

**Use parallel sub-agents when:**
- Implementing 3+ tasks with **no file overlap**
- Tasks are in **different packages** (e.g., klard-auth, klard-web, klard-mobile)
- Tasks can be verified **independently**

**Do NOT use parallel when:**
- Tasks modify the same files
- Tasks have sequential dependencies (e.g., AUTH-001-02 depends on AUTH-001-01)
- Tasks share database migrations or schema changes

### Parallel Dispatch Pattern

```
🚀 PARALLEL IMPLEMENTATION MODE

Identified [N] independent tasks for parallel execution:

| Task ID | Package | Files | Can Parallelize? |
|---------|---------|-------|------------------|
| AUTH-001-01 | klard-auth | package.json | ✅ Independent |
| AUTH-008-01 | klard-mobile | hooks/useShakeAnimation.ts | ✅ Independent |
| AUTH-010-01 | klard-mobile | components/auth/NetworkErrorSheet.tsx | ✅ Independent |

Dispatching sub-agents in parallel...
```

**Dispatch format (single message with multiple Task tool calls):**

```
Task 1 (general-purpose):
  description: "Implement AUTH-001-01"
  prompt: |
    You are implementing AUTH-001-01 from docs/agile/tasks/[task-file].md

    MANDATORY FIRST STEPS:
    1. Use Skill(superpowers:using-git-worktrees) to create worktree: impl/AUTH-001-01
    2. Use Skill(superpowers:test-driven-development) for TDD
    3. Fetch Context7 docs for any libraries used

    Your job:
    1. Read task details from the task file
    2. Create isolated worktree for this task
    3. Implement using TDD (red → green → refactor)
    4. Verify with tests, lint, tsc
    5. Commit changes in worktree
    6. Report: files changed, test results, any issues

    Work directory: /path/to/klard-apps

Task 2 (general-purpose):
  description: "Implement AUTH-008-01"
  prompt: [same structure, different task]

Task 3 (general-purpose):
  description: "Implement AUTH-010-01"
  prompt: [same structure, different task]
```

### After Parallel Completion

1. **Collect sub-agent reports**
2. **Dispatch code reviewers** (can also be parallel):
   ```
   Task (superpowers:code-reviewer): Review AUTH-001-01 implementation
   Task (superpowers:code-reviewer): Review AUTH-008-01 implementation
   Task (superpowers:code-reviewer): Review AUTH-010-01 implementation
   ```
3. **Fix any Critical/Important issues** (sequential - may conflict)
4. **Merge worktrees** to main implementation branch
5. **Run full test suite** to verify integration

### Worktree Merge Strategy

```bash
# After all parallel tasks complete and pass review:
cd /path/to/klard-apps

# Merge each worktree's branch
git merge impl/AUTH-001-01 --no-ff -m "feat(auth): AUTH-001-01 - Install passkey dependency"
git merge impl/AUTH-008-01 --no-ff -m "feat(mobile): AUTH-008-01 - Create useShakeAnimation hook"
git merge impl/AUTH-010-01 --no-ff -m "feat(mobile): AUTH-010-01 - Create NetworkErrorSheet"

# Clean up worktrees
git worktree remove impl/AUTH-001-01
git worktree remove impl/AUTH-008-01
git worktree remove impl/AUTH-010-01

# Run full verification
pnpm test --run
pnpm lint
pnpm exec tsc --noEmit
```

---

## TDD Cycle: Red → Green → Refactor (Sequential Mode)

### 1. RED: Write Failing Tests

**Following superpowers:test-driven-development skill:**

Write tests FIRST that describe expected behavior.

```
🔴 RED PHASE

Writing failing test for: [behavior]

[Show complete test code]

Running: `pnpm test path/to/test.ts --run`
Expected: FAIL with "[specific error]"

🎯 Actual result: [show output]
```

### 2. GREEN: Write Minimum Code

```
🟢 GREEN PHASE

Implementing minimal code to pass:

[Show implementation]

Running: `pnpm test path/to/test.ts --run`
Expected: PASS

🎯 Actual result: [show output]
```

### 3. REFACTOR: Clean Up

```
🔵 REFACTOR PHASE

Improvements:
- [what was improved]

Running tests: STILL PASSING ✅
Running lint: PASSING ✅
```

---

## Verification Before Completion

**Following superpowers:verification-before-completion skill:**

```
✅ VERIFICATION CHECKLIST

Run these commands and confirm output:

- [ ] `pnpm test path/to/test.ts --run` → PASS
- [ ] `pnpm lint` → No errors
- [ ] `pnpm exec tsc --noEmit` → No errors

🎯 VERIFICATION RESULTS:
[Show actual output from each command]

Only mark complete AFTER showing evidence.
```

---

## Context Persistence (Per Task)

After each task completion, update context:

### 1. Decision Log (if decisions made)
Append to `docs/agile/context/<feature>-decisions.md`:
```markdown
## Implementation Decision - $ARGUMENTS.task_id - [DATE]

| Decision | Options | Chosen | Rationale |
|----------|---------|--------|-----------|
| [implementation choice] | [options] | [choice] | [why] |
```

### 2. Update Handoff Context
Update `docs/agile/context/<feature>-impl-progress.md`:
```markdown
# Implementation Progress: <feature>

**Last Updated:** [DATE]
**Current Task:** $ARGUMENTS.task_id

## Completed Tasks
| Task ID | Status | Files Changed | Notes |
|---------|--------|---------------|-------|
| FEAT-001-01 | ✅ | [files] | [notes] |

## In Progress
- $ARGUMENTS.task_id: [current status]

## Patterns Established
- [pattern 1]: [where used]
- [pattern 2]: [where used]

## Libraries Used (Context7)
- [library]: [version] - [why]

## Technical Debt / Follow-ups
- [ ] [item 1]
- [ ] [item 2]
```

---

## Update Task Board

After verification:
1. Open `docs/agile/boards/<feature>-board.md`
2. Move task to "Done"
3. Add completion marker: `✓`

---

## Commit Changes

```bash
git add [files]
git commit -m "<type>(<scope>): <description>

Refs: $ARGUMENTS.task_id"
```

---

## Next Steps

```
✅ Task $ARGUMENTS.task_id complete.

Next task: Run `/agile:board` to see remaining tasks.
All tasks done? Run `/agile:qa` to start quality assurance.
```