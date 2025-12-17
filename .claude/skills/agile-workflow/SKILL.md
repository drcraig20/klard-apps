---
name: agile-workflow
description: Spec-driven agile development workflow. Provides slash commands for feature planning, PRDs, architecture, user stories, tasks, TDD implementation, QA, and releases. Integrates with superpowers and feature-dev skills. User-led throughout.
---

# Agile Workflow

Spec-driven development lifecycle for building features from idea to release.

## Workflow

```
/agile:plan → /agile:prd → /agile:arch → /agile:stories → /agile:tasks → /agile:impl → /agile:qa → /agile:release
```

## Commands & Skill Integration

| Command | Model  | Purpose | Skills | Parallel Agents |
|---------|--------|---------|--------|-----------------|
| `/agile:plan <feature>` | opus   | Plan a new feature | `brainstorming` (conditional), `code-explorer` | ✅ explorer + docs research |
| `/agile:prd` | opus   | Generate PRD | `brainstorming` (conditional), `code-explorer` | ✅ codebase + requirements |
| `/agile:arch` | opus   | Design architecture | `code-architect`, `solid-design-principles`, `brainstorming` (conditional) | ✅ architect + explorer |
| `/agile:stories` | sonnet | Create user stories | `solid-design-principles`, `brainstorming` (conditional) | ✅ PRD + architecture analysis |
| `/agile:tasks` | sonnet | Break into tasks | `writing-plans`, `brainstorming` (conditional) | ✅ stories + code exploration |
| `/agile:impl [feature]` | sonnet | **Execute ALL tasks** with parallel sub-agents | `dispatching-parallel-agents`, `verification-before-completion` | ✅ **ALL independent tasks simultaneously** |
| `/agile:qa` | sonnet | Quality assurance | `requesting-code-review`, `verification-before-completion` | ✅ multiple reviewers |
| `/agile:release <version>` | haiku  | Prepare release | `finishing-a-development-branch` | ❌ sequential |
| `/agile:status` | haiku  | Show progress | - | ❌ |
| `/agile:board` | haiku  | Display task board | - | ❌ |
| `/agile:reflect` | opus   | End-of-phase analysis | - | ❌ sequential (analysis) |

## Mandatory Skill Activation

**EVERY command MUST start with:**

```
## Step 1 - SKILL EVALUATION

For each skill listed in the command's "Required Skills", evaluate:
[skill-name] - YES/NO/CONDITIONAL - [reason]

## Step 2 - SKILL ACTIVATION

IF any skills are YES → Use Skill(skill-name) tool for EACH skill NOW
IF CONDITIONAL → Evaluate if complexity warrants activation

## Step 3 - PARALLEL AGENT DISPATCH (if applicable)

IF command supports parallel agents → Dispatch via Task tool in single message

## Step 4 - PROCEED

Only after Steps 2-3, proceed with the command workflow.
```

## User-as-Lead Principle

**The user is the Architect, PM, and Developer. Claude is the assistant.**

- Present options, don't make decisions
- Ask questions before assuming
- Validate each section before proceeding
- Document the user's decisions with rationale
- Use `🎯 [ROLE] DECISION NEEDED:` prompts throughout

## Conditional Brainstorming

Activate `superpowers:brainstorming` when:
- Multiple valid approaches exist
- Design decisions need exploration
- User explicitly requests deeper analysis
- Complexity is non-trivial

Skip when:
- Single obvious approach
- User has already decided
- Simple/mechanical task

## Parallel Sub-Agent Dispatch

Use Task tool with multiple agents in single message when:
- Work is independent (no dependencies between agents)
- Different aspects can be explored simultaneously
- Code review can happen on separate file sets

NEVER use parallel for:
- Sequential approval workflows
- Tasks with unmet dependencies

### `/agile:impl` Parallel Execution

The `/agile:impl` command executes ALL tasks using parallel sub-agents:

```
/agile:impl
    │
    ▼
┌─────────────────────────────────────┐
│ 1. Load task document (auto-detect) │
│ 2. Build dependency graph           │
│ 3. Find ALL independent tasks       │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│ Dispatch ALL independent tasks      │
│ in parallel (single message)        │
│                                     │
│ Task 1 ─┬─► Sub-agent 1 (TDD)       │
│ Task 2 ─┼─► Sub-agent 2 (TDD)       │
│ Task 3 ─┼─► Sub-agent 3 (TDD)       │
│ ...     └─► Sub-agent N (TDD)       │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│ Collect results                     │
│ Find newly unblocked tasks          │
│ Dispatch next batch                 │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│ At epic boundary:                   │
│ Show summary, ask to continue       │
└─────────────────────────────────────┘
```

**Key behaviors:**
- Auto-detects task document (no argument needed)
- TDD happens WITHIN each sub-agent (sequential red-green-refactor)
- Sub-agents run IN PARALLEL (independent tasks)
- Checkpoints at epic boundaries for user review
- Each sub-agent must use Context7 for library docs

## Artifacts

All outputs go to `docs/agile/`:

```
docs/agile/
├── plans/
├── prds/
├── architecture/
├── stories/
├── tasks/
├── qa/
├── releases/
├── boards/
├── reflections/
└── context/           # Session summaries, decision logs, handoff data
    ├── <feature>-<phase>-summary.md
    ├── <feature>-decisions.md
    └── <feature>-handoff.json
```

## Principles

1. **User-led** — User makes all key decisions
2. **Spec-first** — Define before building
3. **Test-driven** — Tests before code
4. **Incremental** — Validate each phase
5. **Traceable** — Tasks → Stories → PRD → Plan
6. **Skill-activated** — Use relevant skills for each phase
7. **Parallel-aware** — Dispatch sub-agents for independent work
8. **Context-engineered** — Never read full files; use Grep and sectional reads
9. **Context7-first** — Fetch library docs via MCP before implementation
10. **Token-efficient** — Hierarchical loading, AST extraction, context budgeting
11. **Persistence-aware** — Session summaries, decision logs, progressive handoff

## Context Engineering Techniques

### Token Efficiency
- **Hierarchical Loading:** Level 1 (names) → Level 2 (signatures) → Level 3 (implementation)
- **AST Extraction:** Grep for signatures/types, skip implementation bodies
- **Context Budgeting:** 40% task + 35% code + 15% docs + 10% history
- **Diff-Based Updates:** After first read, track only changes via `git diff`

### Context Persistence
- **Session Summaries:** Save to `docs/agile/context/<feature>-<phase>-summary.md`
- **Decision Logs:** Save to `docs/agile/context/<feature>-decisions.md`
- **Progressive Handoff:** Pass `{task, decisions, files_touched, open_questions}`

## Hook-Based Enforcement

Context engineering principles are **automatically enforced** via Claude Code hooks in `.claude/settings.json`:

| Hook | Event | Purpose |
|------|-------|---------|
| `diff-suggest.py` | PreToolUse (Read) | Warns when re-reading files; suggests `git diff` instead |
| `context-tracker.py` | PostToolUse (Read/Grep) | Tracks context budget (40/35/15/10 split); warns at 80% |
| `session-context-loader.sh` | SessionStart | Loads prior context from `docs/agile/context/` |

### How It Works

1. **Diff-Based Updates**: When you read a file that was already read in this session, the hook warns and suggests using `git diff` to see only changes.

2. **Context Budgeting**: The tracker categorizes file reads into task/code/docs/other and tracks approximate token usage. Warns when any category exceeds 80% of its budget.

3. **Session Continuity**: On session start, automatically loads the most recent session summary and decision log, providing context from previous work.

### Cache Location

Hook state is stored in `~/.claude/context-cache/`:
- `<session-id>-reads.json` - Files read this session
- `<session-id>-budget.json` - Context budget tracking

---

## Context7 MCP Requirement

**BEFORE writing code that uses external libraries:**

1. Resolve library ID:
   ```
   mcp__context7__resolve-library-id: libraryName="next.js"
   ```

2. Fetch documentation:
   ```
   mcp__context7__get-library-docs: context7CompatibleLibraryID="/vercel/next.js" topic="app-router"
   ```

This ensures code follows the LATEST API patterns, not outdated training data.