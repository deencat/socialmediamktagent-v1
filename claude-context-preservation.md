# Context Preservation for Claude

Claude does not have the ability to detect when it's approaching token limits. As we work together, it's important to periodically save our progress to maintain context across sessions.

## When to Preserve Context

Watch for these signs that we're approaching token limits:
- Responses becoming slower
- Answers getting shorter or more summarized
- Less awareness of earlier parts of our conversation
- Direct mentions of memory constraints

## Context Preservation Prompt

When you notice these signs, copy and paste this prompt:

```
Before we finish today's session, please:

1. Summarize what we've accomplished in this conversation
2. Note any key decisions, challenges solved, or open questions
3. Create memory entries for any new components/features we've discussed
4. Save the most important context from our discussion

I'm concerned we might be approaching token limits, so please prioritize saving our most important work.
```

## Memory Storage

The memory system is running at:
- Memory service: http://localhost:3100
- Memory viewer UI: http://localhost:3000/memory

## Context Documentation

After Claude responds to the preservation prompt:
1. Copy Claude's summary
2. Complete the session template in docs/memory/ChatSessionSummary.md
3. Update the Project Management Document as needed

## Automatic Startup

The memory service starts automatically when you log in, but you can:
- Check status: ./check-memory-status.sh
- Start manually: ./start-memory-service.sh
- Save context: ./save-session-context.sh 