# MCP Memory Integration

This project uses the ModelContextProtocol (MCP) memory server to maintain conversation context across chat sessions. This allows Claude to remember project details, decisions, and progress even when token limits are reached.

## Setup

1. Install the MCP memory server:
   ```bash
   npm run setup-mcp
   ```

2. This will:
   - Install the @modelcontextprotocol/server-memory package
   - Create the claude_desktop_config.json file
   - Set up memory persistence using ./memory.json

## Usage

1. Start Claude Desktop

2. Create a new conversation

3. Use the system prompt from `docs/memory/SystemPrompt.md` in your Claude settings:
   - Go to Claude settings
   - Paste the content of SystemPrompt.md into Custom Instructions
   - Start your conversation

4. At the beginning of each conversation, Claude will retrieve relevant context from the previous sessions

## How It Works

The MCP memory server provides:

1. **Entity Management**: Stores information about project components, features, and technical decisions
2. **Relation Tracking**: Maintains connections between different project elements
3. **Observation Storage**: Keeps track of facts and information about each entity

The system prompt instructs Claude to:
- Retrieve relevant memory at the start of each conversation
- Update the memory with new information during the session
- Summarize key information at the end of each session

## Manual Updates

You can update the ChatSessionSummary.md file manually as needed to ensure critical information is preserved.

For more details on the MCP memory server, see: 
https://github.com/modelcontextprotocol/servers/tree/main/src/memory 