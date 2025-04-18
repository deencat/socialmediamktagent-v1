# Memory System Documentation

## Overview

The memory system is a crucial component of the Social Media Marketing Agent project. It provides persistence between chat sessions by storing important project information in a structured format.

## Features

- **Entity-based storage**: Information is stored as entities with observations
- **Relation support**: Entities can be connected through relations
- **JSON persistence**: Data is stored in a local JSON file
- **HTTP API**: Access the memory system through a simple HTTP API

## Architecture

The memory system consists of:

1. **Memory Server**: A lightweight HTTP server (port 3100) that handles RPC requests
2. **Memory Client**: A JavaScript client for interacting with the memory server
3. **Memory System**: Core logic for managing entities and relations
4. **Utility Scripts**: Helper scripts for common tasks

## Getting Started

### Starting the Memory Server

The memory server must be running for the memory system to work. Use:

```bash
npm run memory-ensure
```

This will check if the server is running and start it if needed.

### Quick Status Check

To quickly check the memory system status:

```bash
./scripts/memory/check-memory-status.sh
```

This will:
- Ensure the memory server is running
- Show the latest memory entity
- Verify the memory system functionality

### Adding Information to Memory

After important events or decisions, add them to memory:

```bash
npm run memory-add-conversation -- "Title" "Description with key points"
```

### Retrieving Information

To get the latest memory entity:

```bash
npm run memory-get-latest
```

## Use in Development

When working on the project:

1. **Start each session** by running `./scripts/memory/check-memory-status.sh`
2. **End each session** by adding important information to memory

This ensures continuity between development sessions and helps maintain context about the project's progress.

## Memory Structure

### Entities

Entities represent distinct pieces of information:

```javascript
{
  name: "unique-entity-name",
  entityType: "conversation",
  observations: [
    "Observation 1",
    "Observation 2",
    "..."
  ]
}
```

### Relations

Relations connect entities:

```javascript
{
  from: "entity-name-1",
  to: "entity-name-2",
  relationType: "relates-to"
}
```

## Integration with Tools

The memory system can be integrated with development tools through the `MemoryClient` class:

```javascript
const MemoryClient = require('./scripts/memory/memory-client');

async function example() {
  const client = new MemoryClient();
  await client.initialize();
  
  // Get all entities
  const entities = await client.getAllEntities();
  
  // Create a new entity
  await client.createEntity({
    name: "example-entity",
    entityType: "example",
    observations: ["Example observation"]
  });
}
```

## Why Memory Matters

The memory system allows for:

1. **Continuity**: Maintain context between development sessions
2. **Consistency**: Keep track of decisions and their rationales
3. **Documentation**: Automatically document important project events
4. **Collaboration**: Share project knowledge across team members

Always use the memory system when making significant changes or decisions in the project. 