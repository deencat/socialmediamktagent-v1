// Setup script for MCP memory server
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Setting up MCP memory server...');

// Install the MCP memory server
try {
  console.log('Installing @modelcontextprotocol/server-memory...');
  execSync('npm install -g @modelcontextprotocol/server-memory', { stdio: 'inherit' });
  console.log('MCP memory server installed successfully!');
} catch (error) {
  console.error('Failed to install MCP memory server:', error);
  process.exit(1);
}

// Create initial entities for the project
console.log('Creating initial project entities...');

// Check if claude_desktop_config.json exists
if (!fs.existsSync('./claude_desktop_config.json')) {
  console.log('Creating claude_desktop_config.json...');
  const config = {
    "mcpServers": {
      "memory": {
        "command": "npx",
        "args": [
          "-y",
          "@modelcontextprotocol/server-memory"
        ],
        "env": {
          "MEMORY_FILE_PATH": "./memory.json"
        }
      }
    }
  };
  fs.writeFileSync('./claude_desktop_config.json', JSON.stringify(config, null, 2));
}

console.log('Setup complete! You can now use the MCP memory server with Claude.');
console.log('');
console.log('To use in your Claude conversations:');
console.log('1. Start Claude Desktop');
console.log('2. Use the system prompt in docs/memory/SystemPrompt.md');
console.log('3. Begin your conversation with Claude to utilize persistent memory'); 