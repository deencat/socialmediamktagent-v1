# Memory System Directive

## IMPORTANT: Memory Retrieval Protocol

At the START of every conversation:
1. Run the memory system check script:
   ```
   ./scripts/memory/check-memory-status.sh
   ```
   
   This script will:
   - Ensure the memory server is running
   - Show the latest memory entity
   - Verify the memory system functionality

2. Retrieve additional context if needed:
   ```
   npm run memory-example
   ```

3. Include memory findings in your reasoning with: "Memory shows: [key findings]"

## MEMORY UPDATE PROTOCOL:

Update memory after:
1. Learning important project information
2. Implementing new components
3. Making design decisions
4. Discovering inconsistencies
5. When the user shares new requirements

## MEMORY COMMANDS:

```bash
# Full memory system status check
./scripts/memory/check-memory-status.sh

# Ensure memory server is running
npm run memory-ensure

# View latest memory entity
npm run memory-get-latest

# Add a new conversation to memory
npm run memory-add-conversation -- "Title of conversation" "Brief description with key points"

# Run full memory example
npm run memory-example

# Verify memory system functionality
npm run memory-verify
```

## Remember

1. Always ensure the memory server is running:
   ```bash
   npm run memory-ensure
   ```

2. Check if memory server is running if operations fail:
   ```bash
   lsof -i :3100
   ```

3. ALWAYS conclude productive sessions by recording key information in memory:
   ```bash
   npm run memory-add-conversation -- "Title" "Details"
   ```

Memory is critical for maintaining project context between chat sessions. 