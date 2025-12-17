---
name: agile:impl
description: Execute all tasks from the task document using parallel sub-agents for independent tasks
arguments:
  - name: feature
    description: Feature name (auto-detects from most recent task document if omitted)
    required: false
model: opus
---

# Implement Feature: Parallel Sub-Agent Execution

## Mandatory Skills

Activate these skills FIRST:
- `Skill(superpowers:dispatching-parallel-agents)` - For parallel task execution
- `Skill(superpowers:verification-before-completion)` - For verification

---

## Step 1: Load Task Document

1. Find task document:
   - If `$ARGUMENTS.feature` provided: `docs/agile/tasks/*-$ARGUMENTS.feature-tasks.md`
   - Otherwise: Most recent file in `docs/agile/tasks/`

2. Parse the document and extract:
   - All **Tasks** with their IDs, descriptions, dependencies
   - Group tasks by **Epic** for reporting
   - Build **dependency graph**

3. Display overview:
```
📋 IMPLEMENTATION PLAN

**Feature:** [Feature Name]
**Task Document:** [path]

| Epic | Tasks | Est. Hours |
|------|-------|------------|
| Epic 1: [name] | Y | Zh |
| Epic 2: [name] | Y | Zh |
| **TOTAL** | **Y** | **Zh** |
```

---

## Step 2: Identify ALL Independent Tasks

Analyze the ENTIRE task document and identify ALL tasks that can run NOW (no unmet dependencies):

```
🔍 DEPENDENCY ANALYSIS

**Ready to execute (no dependencies):**
| Task ID | Epic | Package | Files |
|---------|------|---------|-------|
| AUTH-001-01 | 1 | klard-auth | package.json |
| AUTH-008-01 | 2 | klard-mobile | hooks/useShakeAnimation.ts |
| AUTH-008-03 | 2 | klard-web | hooks/useShakeAnimation.ts |
| AUTH-010-01 | 2 | klard-mobile | components/NetworkErrorSheet |
| AUTH-010-02 | 2 | klard-mobile | utils/error-helpers.ts |
| AUTH-011-01 | 3 | klard-auth | .well-known/assetlinks.json |
| AUTH-011-02 | 3 | klard-auth | .well-known/apple-app-site-association |
| AUTH-012-01 | 3 | klard-mobile | app.json |
| AUTH-013-01 | 3 | klard-auth | .env.example, README |

**Blocked (waiting on dependencies):**
- AUTH-001-02 → blocked by AUTH-001-01
- AUTH-001-03 → blocked by AUTH-001-02
- ... [X more tasks]

Dispatching [N] independent tasks in parallel...
```

---

## Step 3: Dispatch ALL Independent Tasks in Parallel

Send a **single message with multiple Task tool calls** - one for each independent task:

```typescript
// ALL independent tasks dispatched simultaneously
Task 1 (general-purpose): "Implement AUTH-001-01"
Task 2 (general-purpose): "Implement AUTH-008-01"
Task 3 (general-purpose): "Implement AUTH-008-03"
Task 4 (general-purpose): "Implement AUTH-010-01"
Task 5 (general-purpose): "Implement AUTH-010-02"
Task 6 (general-purpose): "Implement AUTH-011-01"
Task 7 (general-purpose): "Implement AUTH-011-02"
Task 8 (general-purpose): "Implement AUTH-012-01"
Task 9 (general-purpose): "Implement AUTH-013-01"
```

**Sub-agent prompt template:**
```
You are implementing [TASK-ID] from docs/agile/tasks/[task-file].md

## MANDATORY REQUIREMENTS

1. **Context7 Library Lookup (BLOCKING)**
   Before writing ANY code using external libraries:
   - `mcp__context7__resolve-library-id`: libraryName="[library]"
   - `mcp__context7__get-library-docs`: context7CompatibleLibraryID="[id]" topic="[topic]"

2. **Test-Driven Development**
   - RED: Write failing test first
   - GREEN: Write minimal code to pass
   - REFACTOR: Clean up while tests pass

3. **SOLID Principles**
   - Validate against SRP, OCP, LSP, ISP, DIP

## TASK DETAILS

Read the task document section for [TASK-ID]. Find it by searching for "#### Task [TASK-ID]".

Implement exactly what the task specifies:
- Files to modify/create
- Step-by-step instructions
- Acceptance criteria

## VERIFICATION (MANDATORY)

Run and report actual output:
```bash
pnpm test [test-path] --run  # If task has tests
pnpm lint
pnpm exec tsc --noEmit
```

## COMMIT

```bash
git add [files]
git commit -m "[type]([scope]): [description]

Refs: [TASK-ID]"
```

## ACCEPTANCE VERIFICATION (MANDATORY)

Before reporting success, verify your changes:
1. [ ] File changes match task requirements (not just formatting/imports)
2. [ ] Core functionality is implemented (not placeholder code)
3. [ ] Acceptance criteria from task document are met
4. [ ] `git diff --stat` shows meaningful changes to required files

**FAIL the task if only formatting, import reordering, or trivial changes were made.**

## REPORT BACK

Return a structured report:
1. **Task ID:** [TASK-ID]
2. **Status:** Success/Failed
3. **Files changed:** [list]
4. **Tests:** [results]
5. **Verification:** [lint, tsc results]
6. **Commit SHA:** [hash]
7. **Acceptance criteria met:** [yes/no with details]
8. **Issues:** [any problems encountered]

## CRITICAL: WORKING DIRECTORY

**ALL commands MUST run in the feature worktree, NOT the main repo.**

Before ANY file operations or git commands:
```bash
cd [WORKTREE_PATH]  # e.g., /Users/.../klard-apps/.worktrees/passkey-impl
pwd  # Verify you're in the worktree
```

If the task document mentions a worktree, use that path. If unsure, ASK before proceeding.
```

---

## Step 4: Collect Results & Find Newly Unblocked Tasks

After dispatching sub-agents, use **blocking calls** to collect results:

```typescript
// Use blocking mode with extended timeout (avoid repeated polling)
TaskOutput(task_id, block=true, timeout=180000)  // 3 minutes per task
```

**Why blocking over polling:**
- Polling consumes context with repeated checks
- Blocking waits efficiently without context growth
- Timeout ensures tasks don't hang indefinitely

After ALL parallel sub-agents complete:

1. **Collect all reports** using blocking TaskOutput
2. **Update dependency graph** - mark completed tasks
3. **Find newly unblocked tasks** - tasks whose dependencies are now met
4. **Run integration verification:**
   ```bash
   pnpm test --run
   pnpm lint
   pnpm exec tsc --noEmit
   ```

```
📊 BATCH COMPLETE

**Completed Tasks:**
| Task ID | Status | Files | Commit |
|---------|--------|-------|--------|
| AUTH-001-01 | ✅ | 2 | abc123 |
| AUTH-008-01 | ✅ | 3 | def456 |
| AUTH-010-01 | ❌ Failed | - | - |
| ... | ... | ... | ... |

**Integration Verification:**
- Tests: 47/47 passing ✅
- Lint: Clean ✅
- TypeScript: No errors ✅

**Newly Unblocked Tasks:**
| Task ID | Was Blocked By | Now Ready |
|---------|----------------|-----------|
| AUTH-001-02 | AUTH-001-01 ✅ | ✅ Ready |
| AUTH-001-03 | AUTH-001-02 | ⏸️ Still blocked |
```

---

## Step 5: Epic Checkpoint

When ALL tasks in an Epic are complete, provide summary and **ASK to continue**:

```
## ✅ EPIC 1 COMPLETE: Backend Passkey Plugin

### Tasks Completed
| Task ID | Title | Status |
|---------|-------|--------|
| AUTH-001-01 | Install dependency | ✅ |
| AUTH-001-02 | Configure env vars | ✅ |
| AUTH-001-03 | Add plugin config | ✅ |
| AUTH-001-04 | Run migration | ✅ |
| AUTH-001-05 | Add rate limiting | ✅ |

### Verification
- All 5 tasks passing
- Integration tests: Green
- No lint errors

### Overall Progress
| Epic | Status | Tasks |
|------|--------|-------|
| ✅ Epic 1: Backend Plugin | Complete | 5/5 |
| 🔄 Epic 2: Error Handling | In Progress | 3/8 |
| ⏸️ Epic 3: Infrastructure | Blocked | 0/7 |

**Continue to remaining tasks?** (Y/n)
```

**WAIT for user confirmation before dispatching next batch.**

---

## Step 6: Repeat Until All Tasks Complete

Loop:
1. Find all independent tasks (no unmet dependencies)
2. Dispatch ALL of them in parallel
3. Collect results
4. At epic boundaries: summarize and ask to continue
5. Repeat until no tasks remain

---

## Step 7: Feature Complete

When ALL tasks are done:

```
## 🎉 FEATURE IMPLEMENTATION COMPLETE

**Feature:** [Name]
**Total Tasks:** [X]

### Final Verification
- Tests: X/Y passing ✅
- Lint: Clean ✅
- TypeScript: No errors ✅

### Summary by Epic
| Epic | Tasks | Status |
|------|-------|--------|
| Epic 1: Backend Plugin | 5 | ✅ |
| Epic 2: Error Handling | 8 | ✅ |
| Epic 3: Infrastructure | 7 | ✅ |

### Next Steps
1. `/agile:qa` - Run quality assurance
2. Create PR for review
```

---

## Error Handling

### If a sub-agent fails:
1. Note the failure in batch results
2. Continue with other tasks (don't block the batch)
3. After batch: ask "Retry failed tasks?" or "Skip and continue?"

### If integration tests fail:
1. Identify which task broke tests
2. Dispatch fix sub-agent
3. Re-verify before continuing

---

## Key Principles

1. **Maximum parallelism** - ALL independent tasks run simultaneously
2. **Dependency-aware** - Only dispatch tasks with met dependencies
3. **Epic checkpoints** - Pause and summarize at epic boundaries
4. **Context7 mandatory** - All sub-agents fetch library docs first
5. **TDD enforced** - All sub-agents follow red-green-refactor
6. **User confirmation** - Wait for approval between epics