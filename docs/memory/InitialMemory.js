// Script to initialize the knowledge graph with project information
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Check if server is installed
try {
  execSync('npx -y @modelcontextprotocol/server-memory --version', { stdio: 'ignore' });
} catch (error) {
  console.error('MCP memory server not installed. Please run npm run setup-mcp first.');
  process.exit(1);
}

// Start the memory server in background
const server = require('child_process').spawn('npx', ['-y', '@modelcontextprotocol/server-memory', '--port', '3100'], {
  detached: true,
  stdio: 'ignore'
});

// Give the server time to start
console.log('Starting MCP memory server...');
setTimeout(() => {
  initializeMemory();
  // Don't kill the server as it needs to stay running
  console.log('Memory initialization complete. You can now use the MCP memory server.');
}, 5000);

async function initializeMemory() {
  console.log('Initializing project memory...');
  
  // Read chat session summary for initial data
  let summaryData = '';
  try {
    summaryData = fs.readFileSync(path.join(__dirname, 'ChatSessionSummary.md'), 'utf8');
  } catch (error) {
    console.warn('Could not read ChatSessionSummary.md:', error.message);
  }

  // Create initial entities
  const entities = [
    {
      name: 'Project',
      entityType: 'project',
      observations: [
        'Social Media Marketing Agent',
        'Next.js web application',
        'Uses Tailwind CSS for styling',
        'Uses Shadcn UI for components'
      ]
    },
    {
      name: 'CurrentPhase',
      entityType: 'project_phase',
      observations: [
        'Phase 2: SME Dashboard & Content Management',
        'Sprint 2: Dashboard Framework & Widgets',
        'Development Mode: Prototyping (frontend-only with mocked data)'
      ]
    },
    {
      name: 'CompletedWork',
      entityType: 'milestone',
      observations: [
        'Completed Sprint 1 and Phase 1 (Core UI Framework & Authentication Flow)',
        'Updated project management documents',
        'Setup authentication UI and navigation shell'
      ]
    },
    {
      name: 'CurrentFocus',
      entityType: 'task_group',
      observations: [
        'Dashboard layout with widget grid',
        'Widget container component implementation',
        'Drag-and-drop functionality for widgets',
        'Core widgets: Analytics, Content Calendar, Quick Actions, Recent Activity'
      ]
    }
  ];

  // Create relations
  const relations = [
    {
      from: 'Project',
      to: 'CurrentPhase',
      relationType: 'is_in'
    },
    {
      from: 'Project',
      to: 'CompletedWork',
      relationType: 'has_achieved'
    },
    {
      from: 'Project',
      to: 'CurrentFocus',
      relationType: 'is_working_on'
    }
  ];

  // Use fetch to call the MCP server API
  try {
    // Create entities
    const entitiesResponse = await fetch('http://localhost:3100/mcp/memory/create_entities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ entities })
    });
    
    if (!entitiesResponse.ok) {
      throw new Error(`Failed to create entities: ${entitiesResponse.statusText}`);
    }
    
    console.log('Created initial entities');
    
    // Create relations
    const relationsResponse = await fetch('http://localhost:3100/mcp/memory/create_relations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ relations })
    });
    
    if (!relationsResponse.ok) {
      throw new Error(`Failed to create relations: ${relationsResponse.statusText}`);
    }
    
    console.log('Created initial relations');
    
  } catch (error) {
    console.error('Error initializing memory:', error);
  }
} 