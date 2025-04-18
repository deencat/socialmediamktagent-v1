# Memory Integration

This project uses a simple memory system to maintain conversation context across chat sessions. This allows Claude to remember project details, decisions, and progress even when token limits are reached.

## Setup

1. Start the memory server:
```bash
npm run memory-stub
```

2. The memory server will start on port 3100 and store data in the memory.json file.

## Features

The memory server provides:
- Persistent memory storage across chat sessions
- Simple entity storage system
- Access to project information and history

## Memory Components

- `memory-stub.js`: Simple local memory server
- `memory-system.js`: Memory system initialization
- `memory-api.js`: API endpoints for memory access

## Documentation

- `SystemPrompt.md`: Memory system instructions for Claude
- `ChatSessionSummary.md`: Summary of recent development sessions
- `ContextLoader.md`: Guide for loading context efficiently

For more details on memory architecture, see the comments in each file. 