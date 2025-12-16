---
name: agile:reflect
description: Analyze the current phase conversation and provide recommendations for improvement
model: opus
---

# Phase Reflection & Analysis

## Purpose

Run this command at the END of any agile workflow phase to:
1. Analyze what went well in the conversation
2. Identify patterns that worked effectively
3. Surface recommendations for future phases
4. Capture insights to improve the workflow

---

## Your Role: Analyst (NOT Participant)

**Step back and analyze the conversation objectively.** You are reviewing your own performance and the collaborative process.

---

## Analysis Framework

### 1. Conversation Quality Analysis

```
📊 CONVERSATION QUALITY

**Communication Patterns:**
- How many clarification questions were needed?
- Were user decisions captured accurately?
- Did any misunderstandings occur? Why?

**Efficiency Metrics:**
- Tool usage: [appropriate | over-used | under-used]
- Context management: [efficient | context rot detected]
- Parallel agent usage: [effective | missed opportunities]

**User Engagement:**
- User-as-lead principle followed? [yes | partially | no]
- Decisions validated before proceeding? [yes | partially | no]
```

### 2. What Worked Well

```
✅ EFFECTIVE PATTERNS

Identify 3-5 specific moments that worked well:
1. [Specific example from conversation]
   - Why it worked: [reason]
   - Replicable pattern: [how to repeat]

2. [Specific example from conversation]
   - Why it worked: [reason]
   - Replicable pattern: [how to repeat]
```

### 3. What Could Improve

```
⚠️ IMPROVEMENT OPPORTUNITIES

Identify 2-3 areas for improvement:
1. [Specific area]
   - What happened: [description]
   - Better approach: [recommendation]
   - Applies to phase: [which phases]

2. [Specific area]
   - What happened: [description]
   - Better approach: [recommendation]
   - Applies to phase: [which phases]
```

### 4. Context Engineering Assessment

```
📁 CONTEXT ENGINEERING REVIEW

**File Reading Patterns:**
- Full file reads (avoid): [count] occurrences
- Grep-based searches (good): [count] occurrences
- Sectional reads (good): [count] occurrences

**Context Efficiency:**
- Did context rot occur? [yes | no]
- Were summaries used effectively? [yes | no]
- Parallel agent context gathering? [yes | no]

**Recommendations:**
- [Specific recommendation for better context management]
```

### 5. Skill & Agent Usage Review

```
🔧 SKILL & AGENT USAGE

**Skills Activated:**
| Skill | Activated | Effective | Notes |
|-------|-----------|-----------|-------|
| brainstorming | ✅/❌ | ✅/⚠️/❌ | [notes] |
| solid-design-principles | ✅/❌ | ✅/⚠️/❌ | [notes] |

**Parallel Agents Dispatched:**
| Phase | Agents Used | Effective | Notes |
|-------|-------------|-----------|-------|
| [phase] | [agents] | ✅/⚠️/❌ | [notes] |

**Missed Opportunities:**
- [skill/agent that could have been used but wasn't]
```

### 6. User-as-Lead Assessment

```
👤 USER-AS-LEAD COMPLIANCE

**Decision Points:**
| Decision | User Asked | User Decided | Notes |
|----------|------------|--------------|-------|
| [decision] | ✅/❌ | ✅/❌ | [notes] |

**Autonomy Balance:**
- Did Claude make any unilateral decisions? [yes | no]
- Were options presented with trade-offs? [yes | no]
- Was validation requested appropriately? [yes | no]

**Recommendations:**
- [Specific recommendation for better user-as-lead compliance]
```

---

## Context Persistence Checklist

Before ending reflection, save session context:

- [ ] Summary saved to `docs/agile/context/<feature>-<phase>-summary.md`
- [ ] Decision log saved to `docs/agile/context/<feature>-decisions.md`
- [ ] Key findings documented for future sessions
- [ ] Recommendations captured for next phase

**Context files enable:**
- Session continuity across multiple chat sessions
- Handoff information for PRD → Arch → Stories → Tasks phases
- Future reference without re-reading files

---

## Output Summary

```
📋 PHASE REFLECTION SUMMARY

**Phase Completed:** [phase name]
**Overall Rating:** ⭐⭐⭐⭐⭐ (1-5)

**Top 3 Insights:**
1. [Most important insight]
2. [Second insight]
3. [Third insight]

**Action Items for Next Phase:**
- [ ] [Specific action to improve]
- [ ] [Specific action to improve]

**Pattern to Replicate:**
> [Quote or describe the most effective pattern from this phase]
```

---

## Save Reflection

Save to: `docs/agile/reflections/YYYY-MM-DD-<phase>-reflection.md`

Include:
- Full analysis
- Recommendations
- Action items for improvement

---

## Command Update Proposal

Based on the reflection analysis, propose improvements to the agile commands:

```
🔧 COMMAND UPDATE PROPOSAL

Based on this reflection, I identified potential improvements to the agile workflow commands:

**Proposed Updates:**
1. [Command]: [Specific improvement]
   - Why: [Reasoning from reflection]
   - Change: [What to modify]

2. [Command]: [Specific improvement]
   - Why: [Reasoning from reflection]
   - Change: [What to modify]

🎯 ARCHITECT DECISION:
Should I update the commands based on these recommendations?

Options:
- **Yes, update now** - I'll modify the command files immediately
- **Yes, but review first** - I'll show you the exact changes before applying
- **No, just document** - Save recommendations for future consideration
- **Skip** - Continue without updating commands
```

If user approves updates:
1. Read the relevant command file using Grep (sectional)
2. Apply the recommended changes
3. Commit with message: `feat(agile): enhance [command] based on reflection insights`

---

## Prompt for Next Phase

"✅ Reflection complete.

Key insight: [most important takeaway]

Ready for next phase? Run the appropriate command:
- `/agile:plan` → `/agile:prd` → `/agile:arch` → `/agile:stories` → `/agile:tasks` → `/agile:impl` → `/agile:qa` → `/agile:release`"