#!/usr/bin/env python3
"""
Context Tracking Hook (PostToolUse on Read/Grep)

Enforces SKILL.md principle: "Context Budgeting: 40% task + 35% code + 15% docs + 10% history"

Tracks approximate context usage and warns when approaching limits.
Categorizes reads into: code, docs, task files, other.

Output is logged to ~/.claude/context-cache/<session>-budget.json
"""

import json
import sys
import os
from pathlib import Path
from datetime import datetime

# Approximate token estimation (rough: 4 chars = 1 token)
CHARS_PER_TOKEN = 4

# Budget thresholds (approximate, based on ~100k context window)
TOTAL_BUDGET_TOKENS = 80000  # Leave headroom
BUDGET = {
    "task": 0.40,   # 40% for task descriptions, requirements
    "code": 0.35,   # 35% for source code
    "docs": 0.15,   # 15% for documentation
    "history": 0.10 # 10% for conversation history (not tracked here)
}

def get_budget_path(session_id: str) -> Path:
    cache_dir = Path.home() / ".claude" / "context-cache"
    cache_dir.mkdir(parents=True, exist_ok=True)
    return cache_dir / f"{session_id}-budget.json"

def load_budget(session_id: str) -> dict:
    budget_path = get_budget_path(session_id)
    if budget_path.exists():
        try:
            return json.loads(budget_path.read_text())
        except:
            pass
    return {
        "task": {"tokens": 0, "files": []},
        "code": {"tokens": 0, "files": []},
        "docs": {"tokens": 0, "files": []},
        "other": {"tokens": 0, "files": []}
    }

def save_budget(session_id: str, budget: dict):
    budget_path = get_budget_path(session_id)
    budget_path.write_text(json.dumps(budget, indent=2))

def categorize_file(file_path: str) -> str:
    """Categorize a file into budget categories."""
    path_lower = file_path.lower()

    # Task/requirement files
    if any(p in path_lower for p in [
        "docs/agile/tasks", "docs/agile/stories", "docs/agile/prds",
        "docs/agile/plans", "-tasks.md", "-stories.md", "-prd.md"
    ]):
        return "task"

    # Documentation
    if any(p in path_lower for p in [
        "readme", "docs/", ".md", "changelog", "license",
        "agents.md", "claude.md"
    ]):
        return "docs"

    # Source code
    if any(path_lower.endswith(ext) for ext in [
        ".ts", ".tsx", ".js", ".jsx", ".py", ".go", ".rs",
        ".java", ".swift", ".kt", ".vue", ".svelte"
    ]):
        return "code"

    return "other"

def estimate_tokens(content_length: int) -> int:
    """Rough token estimation."""
    return content_length // CHARS_PER_TOKEN

def main():
    try:
        data = json.load(sys.stdin)
    except:
        sys.exit(0)

    tool_name = data.get("tool_name", "")
    tool_input = data.get("tool_input", {})
    tool_response = data.get("tool_response", {})
    session_id = data.get("session_id", "unknown")

    # Only track Read and Grep
    if tool_name not in ["Read", "Grep"]:
        sys.exit(0)

    # Get file path and estimate content size
    file_path = tool_input.get("file_path", "") or tool_input.get("path", "")

    # Estimate tokens from response (if available)
    response_str = str(tool_response)
    tokens_used = estimate_tokens(len(response_str))

    if not file_path and tokens_used < 100:
        sys.exit(0)

    # Load and update budget
    budget = load_budget(session_id)
    category = categorize_file(file_path) if file_path else "other"

    budget[category]["tokens"] += tokens_used
    if file_path and file_path not in budget[category]["files"]:
        budget[category]["files"].append(file_path)

    save_budget(session_id, budget)

    # Calculate totals and check thresholds
    total_used = sum(b["tokens"] for b in budget.values())

    warnings = []
    for cat, allocation in BUDGET.items():
        if cat == "history":
            continue
        cat_budget = int(TOTAL_BUDGET_TOKENS * allocation)
        cat_used = budget.get(cat, {}).get("tokens", 0)
        usage_pct = (cat_used / cat_budget * 100) if cat_budget > 0 else 0

        if usage_pct > 80:
            warnings.append(f"  - {cat.upper()}: {usage_pct:.0f}% of budget ({cat_used:,} / {cat_budget:,} tokens)")

    # Only show warning if over 80% in any category or 70% total
    total_pct = (total_used / TOTAL_BUDGET_TOKENS * 100)

    if warnings or total_pct > 70:
        budget_status = f"""📊 CONTEXT BUDGET STATUS

Total: {total_pct:.0f}% ({total_used:,} / {TOTAL_BUDGET_TOKENS:,} tokens)

Categories approaching limit:
{chr(10).join(warnings) if warnings else "  - All categories within budget"}

💡 Tips to reduce context:
  - Use Grep with specific patterns instead of Read
  - Use Read with offset/limit for large files
  - Consider if you really need to re-read files
"""
        print(json.dumps({"systemMessage": budget_status}))

    sys.exit(0)

if __name__ == "__main__":
    main()