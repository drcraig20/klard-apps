---
name: qa
description: Run quality assurance process and generate QA report
arguments:
  - name: feature
    description: Feature name (auto-detects if omitted)
    required: false
model: sonnet
---

# Quality Assurance

## Load Context

Gather all artifacts:
1. PRD from `docs/agile/prds/`
2. Stories from `docs/agile/stories/`
3. Test plan from `docs/agile/tests/`
4. Task board from `docs/agile/boards/`

## Automated Testing

### Run Test Suite
```bash
# Run all tests with coverage
npm test -- --coverage

# Or for specific feature
npm test -- --grep "<feature>"
```

### Capture Results
| Suite | Passed | Failed | Skipped | Coverage |
|-------|--------|--------|---------|----------|
| Unit | | | | |
| Integration | | | | |
| E2E | | | | |

### Coverage Analysis
- Identify uncovered code paths
- Note any coverage gaps
- Flag if below 80% threshold

## Manual Testing

### Acceptance Criteria Verification

For each story, verify each acceptance criterion:

| Story | AC# | Criteria | Status | Notes |
|-------|-----|----------|--------|-------|
| STORY-001 | 1 | [criteria] | ✅/❌/⚠️ | |
| STORY-001 | 2 | [criteria] | ✅/❌/⚠️ | |

Status:
- ✅ Pass - Works as expected
- ❌ Fail - Does not work
- ⚠️ Minor - Works with issues

### Exploratory Testing

Test beyond the specs:
- Edge cases
- Unusual inputs
- Rapid interactions
- Different browsers/devices

## Code Review Checklist

### Functionality
- [ ] All acceptance criteria met
- [ ] Edge cases handled
- [ ] Error handling appropriate
- [ ] No regressions

### Code Quality
- [ ] Follows team conventions
- [ ] No unnecessary complexity
- [ ] DRY principles followed
- [ ] SOLID principles followed
- [ ] No obvious code smells

### Testing
- [ ] Unit tests cover new code
- [ ] Integration tests for APIs
- [ ] Coverage meets threshold
- [ ] Tests are meaningful

### Performance
- [ ] No obvious bottlenecks
- [ ] Database queries optimized
- [ ] No N+1 queries
- [ ] Appropriate caching

### Security
- [ ] Input validation present
- [ ] No sensitive data logged
- [ ] Auth/authz correct
- [ ] No injection vulnerabilities

### Documentation
- [ ] Code comments where needed
- [ ] API docs updated
- [ ] README updated if needed

## Bug Tracking

If issues found, document:

### BUG-XXX: [Title]
**Severity**: Critical | Major | Minor
**Status**: Open
**Found in**: [Component]

**Steps to Reproduce**:
1. Step 1
2. Step 2

**Expected**: [What should happen]
**Actual**: [What happens]

**Screenshot/Video**: [if applicable]

## Environment Testing

| Environment | Status | Notes |
|-------------|--------|-------|
| Local | ✅/❌ | |
| Dev | ✅/❌ | |
| Staging | ✅/❌ | |

## Performance Check

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Page Load | <2.5s | | |
| API Response (p95) | <200ms | | |
| Bundle Size | <500KB | | |

## QA Summary

### Overall Status: ✅ PASS / ❌ FAIL

| Category | Status |
|----------|--------|
| Automated Tests | ✅/❌ |
| Manual Testing | ✅/❌ |
| Code Review | ✅/❌ |
| Performance | ✅/❌ |
| Security | ✅/❌ |

### Blockers
- [List any blocking issues]

### Recommendations
- [Suggestions for improvement]

## Output

Save to: `docs/agile/qa/YYYY-MM-DD-<feature>-qa-report.md`

## Next Phase

If PASS:
"✅ QA complete. Run `/release <version>` to prepare release."

If FAIL:
"❌ QA found issues. Fix the following before release:
- [Issue 1]
- [Issue 2]

Run `/qa` again after fixes."
