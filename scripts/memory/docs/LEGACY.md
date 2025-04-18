# Legacy Memory System Files

This document identifies files from the previous Model Context Protocol (MCP) memory implementation that have been kept for reference but are no longer actively used in the current memory system.

## Legacy Files in docs/memory/

1. **SystemPrompt.md**
   - Description: Instructions for Claude on how to use the old MCP memory system
   - Status: Obsolete - refers to commands and workflow specific to MCP
   - Recommendation: Keep for reference only

2. **ContextLoader.md**
   - Description: Guide for loading context at the beginning of chat sessions
   - Status: Partially valid - general principles still apply
   - Recommendation: Update to reference current memory system implementation

3. **InitialMemory.js**
   - Description: Script to initialize the MCP knowledge graph with project information
   - Status: Obsolete - uses MCP-specific API
   - Recommendation: Replace with reference to current `memory-init` script

## Differences Between Current and Legacy Systems

| Feature | Legacy MCP | Current Implementation |
|---------|-----------|------------------------|
| Storage | MCP Server | Local JSON file |
| API | MCP-specific RPC | Simple HTTP JSON RPC |
| Entities | Same structure | Same structure (maintained for compatibility) |
| Relations | Same structure | Same structure (maintained for compatibility) |
| Commands | `read_graph`, `search_nodes` | Client library methods |
| Deployment | Requires external MCP package | Self-contained in project |

## Migration Notes

The current memory system was designed to maintain the same entity and relation structure as the MCP implementation, allowing for a seamless transition. All functionality has been preserved while removing external dependencies.

If you need to reference how the old system worked, these legacy files provide that documentation, but for current development, please refer to the scripts in the `scripts/memory/` directory and the README.md file in this directory. 