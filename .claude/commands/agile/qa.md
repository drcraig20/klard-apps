---
name: agile:qa
description: Run quality assurance process and generate QA report
arguments:
  - name: feature
    description: Feature name (auto-detects if omitted)
    required: false
model: sonnet
---

# Quality Assurance

## Mandatory Skill Activation

### Step 1 - EVALUATE

- `superpowers:requesting-code-review` - YES - Dispatch code review agent
- `superpowers:verification-before-completion` - YES - Verify all claims
- `superpowers:brainstorming` - CONDITIONAL - If QA approach needs discussion

### Step 2 - ACTIVATE

Use `Skill(superpowers:requesting-code-review)` tool NOW.
Use `Skill(superpowers:verification-before-completion)` tool NOW.

### Step 3 - PARALLEL AGENT DISPATCH

Dispatch multiple code reviewers in parallel (single message with multiple Task tool calls):
```
Task 1: superpowers:code-reviewer - "Review frontend components for [feature]"
Task 2: superpowers:code-reviewer - "Review backend/API code for [feature]"
Task 3: superpowers:code-reviewer - "Review test coverage for [feature]"
```

### Step 4 - PROCEED

Only after activating skills and dispatching agents, continue below.

---

## Your Role: Assistant (NOT Lead)

**The user is the lead QA/PM.** You gather evidence and present findings, but they:
- Make the final PASS/FAIL decision
- Decide which issues are blockers vs nice-to-fix
- Approve the QA report before saving
- Determine if re-testing is needed

---

## Load Context

Gather all artifacts:
1. PRD from `docs/agile/prds/`
2. Stories from `docs/agile/stories/`
3. Architecture from `docs/agile/architecture/`
4. Task board from `docs/agile/boards/`

---

## Dispatch Parallel Code Review Agents

```
🔍 DISPATCHING PARALLEL CODE REVIEWERS

Agent 1: Review frontend code
- Scope: [frontend files]

Agent 2: Review backend code
- Scope: [backend files]

Agent 3: Review test coverage
- Scope: [test files]

Waiting for results...
```

Present combined review results for user decision.

---

## Automated Testing

```
🧪 AUTOMATED TESTS

Running test suite...

Run: `pnpm test -- --coverage`

🎯 RESULTS:
[Show actual output]

| Suite | Passed | Failed | Coverage |
|-------|--------|--------|----------|
| Unit | X | X | X% |
| Integration | X | X | X% |

Coverage threshold: 80%
Status: ✅/❌
```

---

## Acceptance Criteria Verification

```
📋 ACCEPTANCE CRITERIA CHECK

For each story, verify each criterion:

| Story | AC# | Criteria | Status | Evidence |
|-------|-----|----------|--------|----------|
| STORY-001 | 1 | [criteria] | ✅/❌ | [proof] |

🎯 PM DECISION:
Do all criteria pass? Any concerns?
```

---

## Code Review Results (from Parallel Agents)

Present combined code review findings:
```
🔍 CODE REVIEW SUMMARY (from parallel agents)

**Frontend Review:**
- [severity] [issue] in [file:line]

**Backend Review:**
- [severity] [issue] in [file:line]

**Test Coverage Review:**
- [severity] [issue] in [file:line]

Recommendations:
- [suggestion]

🎯 DEVELOPER DECISION:
Which issues must be fixed before release?
```

---

## SOLID Compliance Verification

```
✅ SOLID COMPLIANCE

| Principle | Status | Notes |
|-----------|--------|-------|
| SRP | ✅/⚠️/❌ | [notes] |
| OCP | ✅/⚠️/❌ | [notes] |
| LSP | ✅/⚠️/❌ | [notes] |
| ISP | ✅/⚠️/❌ | [notes] |
| DIP | ✅/⚠️/❌ | [notes] |
```

---

## QA Summary

```
📊 QA SUMMARY

| Category | Status |
|----------|--------|
| Automated Tests | ✅/❌ |
| Acceptance Criteria | ✅/❌ |
| Code Review | ✅/❌ |
| SOLID Compliance | ✅/❌ |

🎯 PM/ARCHITECT DECISION:
Overall status: PASS or FAIL?

If FAIL, what must be fixed?
```

---

## Output

Save to: `docs/agile/qa/YYYY-MM-DD-<feature>-qa-report.md`

---

## Context Persistence (MANDATORY)

Before proceeding to release, save context:

### 1. Decision Log
Append to `docs/agile/context/<feature>-decisions.md`:
```markdown
## QA Phase Decisions - [DATE]

| Decision | Options | Chosen | Rationale |
|----------|---------|--------|-----------|
| QA status | PASS/FAIL | [choice] | [user's reasoning] |
| Issues to fix | [list] | [chosen fixes] | [priority reasoning] |

**Code Review Summary:**
- Frontend: [status]
- Backend: [status]
- Tests: [status]

**SOLID Compliance:** [status]
```

### 2. Session Summary
Save to `docs/agile/context/<feature>-qa-summary.md`:
```markdown
# QA Phase Summary: <feature>

**Date:** [DATE]
**Phase:** QA
**Status:** PASS / FAIL

## Test Results
| Suite | Passed | Failed | Coverage |
|-------|--------|--------|----------|
| Unit | X | X | X% |
| Integration | X | X | X% |

## Code Review Findings
**Critical Issues:** [count]
**Warnings:** [count]
**Resolved:** [count]

## Acceptance Criteria Status
[X/Y criteria passed]

## Issues Deferred to Future
- [ ] [issue 1]
- [ ] [issue 2]

## Files Touched
- Created: `docs/agile/qa/[filename]`
- Updated: `docs/agile/context/<feature>-decisions.md`

## Handoff Context
```json
{
  "feature": "<feature>",
  "phase": "qa",
  "status": "PASS",
  "coverage": "85%",
  "issues_deferred": ["issue1"],
  "next_phase": "release"
}
```
```

---

## Next Phase

If user says PASS:
"✅ QA complete. Run `/agile:release <version>` to prepare release."

If user says FAIL:
"❌ QA found issues. Fix the following, then run `/agile:qa` again:
- [Issue list]"