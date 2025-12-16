#!/bin/bash
#
# Session Context Loader Hook (SessionStart)
#
# Enforces SKILL.md principle: "Session Summaries, Decision Logs, Progressive Handoff"
#
# On session start, loads relevant context from docs/agile/context/ to provide
# continuity from previous sessions.
#

# Find most recent feature context
CONTEXT_DIR="docs/agile/context"

if [ ! -d "$CONTEXT_DIR" ]; then
    exit 0
fi

# Find most recent summary file
LATEST_SUMMARY=$(ls -t "$CONTEXT_DIR"/*-summary.md 2>/dev/null | head -1)
LATEST_DECISIONS=$(ls -t "$CONTEXT_DIR"/*-decisions.md 2>/dev/null | head -1)

OUTPUT=""

if [ -n "$LATEST_SUMMARY" ] || [ -n "$LATEST_DECISIONS" ]; then
    OUTPUT="📂 AGILE CONTEXT LOADED

"

    if [ -n "$LATEST_SUMMARY" ]; then
        FEATURE=$(basename "$LATEST_SUMMARY" | sed 's/-[^-]*-summary.md//')
        PHASE=$(basename "$LATEST_SUMMARY" | sed 's/.*-\([^-]*\)-summary.md/\1/')
        OUTPUT+="**Latest Session:** $FEATURE ($PHASE phase)
"

        # Extract key info from summary (first 20 lines)
        SUMMARY_PREVIEW=$(head -20 "$LATEST_SUMMARY" 2>/dev/null)
        if [ -n "$SUMMARY_PREVIEW" ]; then
            OUTPUT+="
\`\`\`
$(echo "$SUMMARY_PREVIEW" | head -15)
...
\`\`\`
"
        fi
    fi

    if [ -n "$LATEST_DECISIONS" ]; then
        # Count decisions
        DECISION_COUNT=$(grep -c "^|" "$LATEST_DECISIONS" 2>/dev/null || echo "0")
        OUTPUT+="
**Decisions logged:** ~$DECISION_COUNT entries in $(basename "$LATEST_DECISIONS")
"
    fi

    OUTPUT+="
💡 Run \`/agile:status\` to see full workflow progress.
"
fi

if [ -n "$OUTPUT" ]; then
    echo "$OUTPUT"
fi

exit 0