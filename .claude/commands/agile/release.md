---
name: agile:release
description: Prepare release documentation and checklist
arguments:
  - name: version
    description: Version number (e.g., 1.2.0)
    required: true
model: haiku
---

# Release Preparation: v$ARGUMENTS.version

## Mandatory Skill Activation

### Step 1 - EVALUATE

- `superpowers:finishing-a-development-branch` - YES - Structured completion options
- `superpowers:verification-before-completion` - YES - Verify before claiming done
- `superpowers:brainstorming` - CONDITIONAL - If release strategy needs discussion

### Step 2 - ACTIVATE

Use `Skill(superpowers:finishing-a-development-branch)` tool NOW.

### Step 3 - NO PARALLEL AGENTS

Release is sequential verification. Do NOT dispatch parallel agents.

### Step 4 - PROCEED

Only after activating skills, continue below.

---

## Your Role: Assistant (NOT Lead)

**The user is the lead Developer/PM.** You prepare release artifacts, but they:
- Approve release notes content
- Make the merge/PR/tag decision
- Verify deployment checklist items

---

## Pre-Release Verification

```
✅ PRE-RELEASE CHECK

Verifying prerequisites:

- [ ] QA report exists and shows PASS
- [ ] All tasks marked done in board
- [ ] No open blockers
- [ ] All tests passing: `pnpm test --run`
- [ ] Lint passing: `pnpm lint`
- [ ] TypeScript passing: `pnpm exec tsc --noEmit`

🎯 VERIFICATION RESULTS:
[Show actual command outputs]

All checks pass?
```

---

## Generate Release Notes

Load from stories and tasks to generate:

```markdown
# v$ARGUMENTS.version - YYYY-MM-DD

## 🚀 New Features
- **[Feature]**: [User-facing description]

## 🐛 Bug Fixes
- Fixed [issue description]

## 💅 Improvements
- Improved [enhancement description]

## ⚠️ Breaking Changes
- [Breaking change with migration path]
```

---

## Branch Completion Options

Following `superpowers:finishing-a-development-branch`:

```
🏁 RELEASE OPTIONS

**Option 1: Merge to main**
- Squash merge feature branch
- Delete feature branch after merge

**Option 2: Create Pull Request**
- Open PR for team review
- Wait for approval before merge

**Option 3: Tag only**
- Tag current state
- Keep branch for continued work

🎯 DEVELOPER DECISION:
Which approach for this release?
```

---

## Deployment Checklist

```
📋 DEPLOYMENT CHECKLIST

### Pre-Deployment
- [ ] All tests passing on CI
- [ ] Code reviewed and approved
- [ ] QA sign-off received
- [ ] CHANGELOG updated
- [ ] Version bumped

### Deployment
- [ ] Deploy to staging first
- [ ] Verify staging
- [ ] Deploy to production
- [ ] Verify production

🎯 DEVELOPER:
Ready for each step? (y/n)
```

---

## Output

Save to: `docs/agile/releases/YYYY-MM-DD-v$ARGUMENTS.version-release.md`

---

## Next Steps

"✅ Release v$ARGUMENTS.version prepared.

Execute deployment and tag the release:
```bash
git tag -a v$ARGUMENTS.version -m \"Release v$ARGUMENTS.version\"
git push origin v$ARGUMENTS.version
```
"