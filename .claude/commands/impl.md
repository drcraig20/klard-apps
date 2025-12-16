---
name: impl
description: Implement a task using Test-Driven Development (red-green-refactor)
arguments:
  - name: task_id
    description: Task ID to implement (e.g., AUTH-001-01)
    required: true
model: sonnet
---

# Implement Task: $ARGUMENTS.task_id

## Find Task Context

1. Search `docs/agile/tasks/` for task ID
2. Load task description, files, subtasks
3. Find related story and acceptance criteria from `docs/agile/stories/`
4. Check architecture notes from `docs/agile/architecture/`

## Pre-Implementation Checklist

- [ ] Task dependencies are complete
- [ ] Understand the acceptance criteria
- [ ] Know which files to modify/create
- [ ] Identify project's testing framework

---

## Detect Project Stack

Before writing tests, identify:
- **Language**: TypeScript, Java, Python, Go, Ruby, etc.
- **Test framework**: Jest, Vitest, JUnit, pytest, Go test, RSpec, etc.
- **Test location**: `__tests__/`, `src/**/*.test.*`, `test/`, etc.
- **Run command**: `npm test`, `./gradlew test`, `pytest`, `go test`, etc.

---

## TDD Cycle: Red → Green → Refactor

### 1. RED: Write Failing Tests

For each acceptance criterion, write tests FIRST.

**Adapt syntax to your stack:**

<details>
<summary>JavaScript/TypeScript (Jest/Vitest)</summary>

```typescript
describe('[ComponentName]', () => {
  it('should [behavior] when [condition]', () => {
    // Arrange → Act → Assert
  });
});
```
</details>

<details>
<summary>Java (JUnit)</summary>

```java
@Test
void should_behavior_when_condition() {
    // Arrange → Act → Assert
}
```
</details>

<details>
<summary>Python (pytest)</summary>

```python
def test_should_behavior_when_condition():
    # Arrange → Act → Assert
```
</details>

<details>
<summary>Go</summary>

```go
func TestShouldBehaviorWhenCondition(t *testing.T) {
    // Arrange → Act → Assert
}
```
</details>

**Run tests - they should FAIL**:
```bash
# Use your project's test command
npm test / ./gradlew test / pytest / go test ./...
```

### 2. GREEN: Write Minimum Code

Implement the simplest code that makes tests pass:
- Don't over-engineer
- Don't add unrequested features
- Focus ONLY on passing the failing tests
- It's okay if the code is ugly at this stage

**Run tests - they should PASS**:
```bash
npm test
```

### 3. REFACTOR: Clean Up

With tests passing, improve the code:
- Remove duplication (DRY)
- Improve naming
- Simplify logic
- Extract methods/functions
- Add comments where intent isn't obvious
- Follow project conventions

**Run tests again - must still PASS**:
```bash
npm test && npm run lint
```

---

## Edge Cases Checklist

Ensure tests cover:
- [ ] Empty/null inputs
- [ ] Boundary values (min/max)
- [ ] Invalid types
- [ ] Error conditions
- [ ] Loading/async states
- [ ] Concurrent operations (if applicable)

---

## Update Task Board

After implementation complete:

1. Open `docs/agile/boards/<feature>-board.md`
2. Move task from current section to "Done"
3. Change `- [ ]` to `- [x]`
4. Add completion marker: `✓`

Example:
```markdown
## Done
- [x] TASK-001: Create subscription endpoint ✓
```

---

## Commit Changes

Use conventional commit format:

```
<type>(<scope>): <description>

[Optional body - what and why]

Refs: $ARGUMENTS.task_id
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code restructure (no behavior change)
- `test`: Adding/updating tests
- `docs`: Documentation only
- `chore`: Maintenance tasks

**Example**:
```
feat(subscription): add subscription creation endpoint

Implement POST /api/subscriptions with:
- Input validation
- Stripe integration
- Error handling

Refs: SUB-001-03
```

---

## Subtask Progress

Mark subtasks as you complete them:
```markdown
Subtasks:
- [x] Write unit tests
- [x] Implement component
- [x] Write integration tests
- [ ] Update documentation  <- current
```

---

## Implementation Tips by Stack

### Frontend (React, Vue, Angular, Svelte)
1. Write component test first
2. Create component with typed props/interface
3. Implement UI logic
4. Add to routes/pages
5. Test manually in browser

### Backend (Spring, Express, Django, FastAPI, Go)
1. Write controller/handler test first
2. Define DTOs/models/structs
3. Implement handler → service → repository
4. Add validation
5. Test with curl/Postman/httpie

### Mobile (React Native, Flutter, Swift, Kotlin)
1. Write unit test for business logic
2. Create screen/widget with props
3. Implement UI and navigation
4. Test on simulator/emulator

### General Principles
- Follow existing patterns in codebase
- Check for reusable utilities
- Handle errors gracefully
- Consider loading/error/empty states
- Match the project's code style

---

## Next Steps

After completing this task:

1. **Check board** for next available task
2. **Consider dependencies** - what's unblocked now?
3. **Suggest next**: "Task complete. Next available: TASK-XXX"

Or if all tasks done:
"✅ All implementation complete! Run `/qa` to start quality assurance."

---

## Troubleshooting

### Tests won't pass
- Re-read acceptance criteria carefully
- Check test expectations match requirements
- Look for missed edge cases
- Verify mocks/stubs are correct

### Blocked by dependency
- Verify dependency is actually complete
- Use mocks/stubs as workarounds
- Flag blocker for standup

### Scope creep discovered
- Note new requirements separately
- Don't implement unplanned work in this task
- Add new stories/tasks to backlog
- Discuss with team before expanding scope

---

## Next Phase

After completing this task:

"✅ Task $ARGUMENTS.task_id complete. 

Next task: Run `/board` to see remaining tasks, then `/impl <task-id>` for the next one.

All tasks done? Run `/qa` to start quality assurance."
