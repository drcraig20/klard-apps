---
name: release
description: Prepare release documentation and checklist
arguments:
  - name: version
    description: Version number (e.g., 1.2.0)
    required: true
model: haiku
---

# Release Preparation: v$ARGUMENTS.version

## Pre-Release Verification

Confirm before proceeding:
- [ ] QA report exists and shows PASS
- [ ] All tasks marked done in board
- [ ] No open blockers

## Generate Release Notes

### Load Completed Work

From stories and tasks:
- What features were added?
- What bugs were fixed?
- What improvements were made?
- Any breaking changes?

### Release Notes Format

```markdown
# v$ARGUMENTS.version - YYYY-MM-DD

## 🚀 New Features
- **[Feature]**: [User-facing description]

## 🐛 Bug Fixes
- Fixed [issue description]

## 💅 Improvements
- Improved [enhancement description]

## 🔧 Technical Changes
- [Internal change]

## ⚠️ Breaking Changes
- [Breaking change with migration path]

## 📝 Documentation
- Updated [docs]
```

## Update CHANGELOG.md

Add new version entry at the top of CHANGELOG.md following Keep a Changelog format.

## Version Bump

Update version in:
- package.json (Node.js)
- pom.xml (Java/Maven)
- build.gradle (Java/Gradle)
- pyproject.toml (Python)

## Deployment Checklist

### Pre-Deployment
- [ ] All tests passing on CI
- [ ] Code reviewed and approved
- [ ] QA sign-off received
- [ ] Documentation updated
- [ ] CHANGELOG updated
- [ ] Version bumped
- [ ] Feature flags configured
- [ ] Environment variables verified

### Database (if applicable)
- [ ] Migration scripts ready
- [ ] Migration tested on staging
- [ ] Rollback scripts ready

### Deployment
- [ ] Deployment pipeline ready
- [ ] Health checks configured
- [ ] Monitoring dashboards ready

## Rollback Plan

Document how to rollback if issues detected:
- Revert strategy (git revert, rollback deployment, etc.)
- Database rollback steps (if migrations involved)
- Communication plan

## Output

Save to: `docs/agile/releases/YYYY-MM-DD-v$ARGUMENTS.version-release.md`

---

## Suggested Git Operations

Once ready to release, you may want to:

```bash
# Tag the release
git tag -a v$ARGUMENTS.version -m "Release v$ARGUMENTS.version"
git push origin v$ARGUMENTS.version

# Or create a release branch (if using GitFlow)
git checkout -b release/v$ARGUMENTS.version
git push -u origin release/v$ARGUMENTS.version
```

---

## Next Steps

"✅ Release v$ARGUMENTS.version prepared.

Next: Execute your deployment process and tag the release."
