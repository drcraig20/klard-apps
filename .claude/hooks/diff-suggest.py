#!/usr/bin/env python3
"""
Diff-Based Updates Hook (PreToolUse on Read)

Enforces SKILL.md principle: "After first read, track only changes via git diff"

When a file is re-read in the same session:
1. Warns that the file was already read
2. Suggests using `git diff` instead
3. Shows what changed since last read

This reduces context bloat from repeatedly reading the same large files.
"""

import json
import sys
import os
from pathlib import Path

# Track reads in a session-specific file
def get_session_log_path(session_id: str) -> Path:
    cache_dir = Path.home() / ".claude" / "context-cache"
    cache_dir.mkdir(parents=True, exist_ok=True)
    return cache_dir / f"{session_id}-reads.json"

def load_read_log(session_id: str) -> dict:
    log_path = get_session_log_path(session_id)
    if log_path.exists():
        try:
            return json.loads(log_path.read_text())
        except:
            return {}
    return {}

def save_read_log(session_id: str, log: dict):
    log_path = get_session_log_path(session_id)
    log_path.write_text(json.dumps(log, indent=2))

def main():
    # Read hook input from stdin
    try:
        data = json.load(sys.stdin)
    except:
        sys.exit(0)  # Non-blocking error

    tool_name = data.get("tool_name", "")
    tool_input = data.get("tool_input", {})
    session_id = data.get("session_id", "unknown")

    # Only process Read tool
    if tool_name != "Read":
        sys.exit(0)

    file_path = tool_input.get("file_path", "")
    if not file_path:
        sys.exit(0)

    # Normalize path
    file_path = os.path.abspath(file_path)

    # Load read log
    read_log = load_read_log(session_id)

    # Check if file was already read
    if file_path in read_log:
        read_count = read_log[file_path].get("count", 0)

        # Allow re-read but warn
        warning = f"""⚠️ CONTEXT EFFICIENCY WARNING

File already read {read_count} time(s) this session: {os.path.basename(file_path)}

Consider using git diff instead:
  git diff HEAD -- "{file_path}"

Or use sectional read with offset/limit if you need specific lines.

Proceeding with read..."""

        # Update count
        read_log[file_path]["count"] = read_count + 1
        save_read_log(session_id, read_log)

        # Return with system message (non-blocking)
        print(json.dumps({
            "systemMessage": warning
        }))
        sys.exit(0)
    else:
        # First read - log it
        read_log[file_path] = {
            "count": 1,
            "first_read": True
        }
        save_read_log(session_id, read_log)
        sys.exit(0)

if __name__ == "__main__":
    main()