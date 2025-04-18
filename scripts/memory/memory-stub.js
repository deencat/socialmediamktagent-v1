/**
 * MCP Server Stub - Simple local JSON storage replacement
 * 
 * This module provides a drop-in replacement for MCP server functionality
 * using a local JSON file instead. This avoids dependencies on the 
 * external MCP server while maintaining basic memory capabilities.
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

// Configuration
const MEMORY_FILE = path.join(__dirname, 'memory.json');
const SERVER_PORT = 3100;  // Same port as MCP would use

// Initialize memory storage
let memoryStore = {
  entities: {},
  relations: []
};

// Load existing memory if available
function loadMemory() {
  try {
    if (fs.existsSync(MEMORY_FILE)) {
      const data = fs.readFileSync(MEMORY_FILE, 'utf8');
      memoryStore = JSON.parse(data);
      console.log('Memory loaded from file');
    }
  } catch (error) {
    console.error('Error loading memory:', error.message);
  }
}

// Save memory to file
function saveMemory() {
  try {
    fs.writeFileSync(MEMORY_FILE, JSON.stringify(memoryStore, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving memory:', error.message);
  }
}

// Handle RPC-style methods
function handleRpcMethod(method, params) {
  switch (method) {
    case 'initialize':
      return { status: 'ok', message: 'Stub server initialized' };
    
    case 'memory/create_entities':
      if (!params.entities || !Array.isArray(params.entities)) {
        return { error: 'Invalid entities format' };
      }
      
      params.entities.forEach(entity => {
        if (!entity.name) return;
        memoryStore.entities[entity.name] = entity;
      });
      
      saveMemory();
      return { status: 'ok', created: params.entities.length };
    
    case 'memory/create_relations':
      if (!params.relations || !Array.isArray(params.relations)) {
        return { error: 'Invalid relations format' };
      }
      
      params.relations.forEach(relation => {
        memoryStore.relations.push(relation);
      });
      
      saveMemory();
      return { status: 'ok', created: params.relations.length };
    
    case 'memory/entities':
      return { entities: Object.values(memoryStore.entities) };
    
    case 'memory/delete_entity':
      if (!params.name) {
        return { error: 'Entity name is required' };
      }
      
      const entityName = params.name;
      if (memoryStore.entities[entityName]) {
        // Delete entity
        delete memoryStore.entities[entityName];
        
        // Also delete all relations involving this entity
        memoryStore.relations = memoryStore.relations.filter(relation => 
          relation.from !== entityName && relation.to !== entityName
        );
        
        saveMemory();
        return { status: 'ok', message: `Entity '${entityName}' deleted successfully` };
      } else {
        return { error: `Entity '${entityName}' not found` };
      }
    
    case 'memory/delete_relation':
      if (!params.from || !params.to) {
        return { error: 'Both from and to entity names are required' };
      }
      
      const originalLength = memoryStore.relations.length;
      
      // Filter relations based on from, to, and optionally relationType
      memoryStore.relations = memoryStore.relations.filter(relation => {
        if (relation.from !== params.from || relation.to !== params.to) {
          return true; // Keep relations that don't match the from/to
        }
        
        // If relationType is specified, only remove relations with that type
        if (params.relationType && relation.relationType !== params.relationType) {
          return true; // Keep relations with different types
        }
        
        return false; // Remove matching relations
      });
      
      const deleted = originalLength - memoryStore.relations.length;
      
      if (deleted > 0) {
        saveMemory();
        return { status: 'ok', deleted: deleted };
      } else {
        return { error: 'No matching relations found' };
      }
    
    default:
      return { error: 'Method not implemented' };
  }
}

// Start HTTP server
function startServer() {
  loadMemory();
  
  const server = http.createServer((req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      res.statusCode = 204;
      res.end();
      return;
    }
    
    // Handle POST requests (RPC calls)
    if (req.method === 'POST') {
      let body = '';
      
      req.on('data', chunk => {
        body += chunk.toString();
      });
      
      req.on('end', () => {
        try {
          const request = JSON.parse(body);
          const result = handleRpcMethod(request.method, request.params);
          
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 200;
          res.end(JSON.stringify({
            jsonrpc: '2.0',
            id: request.id,
            result: result
          }));
        } catch (error) {
          res.statusCode = 400;
          res.end(JSON.stringify({
            jsonrpc: '2.0',
            id: null,
            error: { message: error.message }
          }));
        }
      });
      
      return;
    }
    
    // Handle GET requests (basic server check)
    if (req.method === 'GET') {
      if (req.url === '/mcp/memory/entities') {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end(JSON.stringify({ entities: Object.values(memoryStore.entities) }));
        return;
      }
      
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Memory stub server running');
      return;
    }
    
    // Default response for other methods
    res.statusCode = 404;
    res.end();
  });
  
  server.listen(SERVER_PORT, () => {
    console.log(`Memory stub server running at http://localhost:${SERVER_PORT}`);
    console.log('This is a replacement for the MCP server using local JSON storage');
  });
  
  return server;
}

// Export functions
module.exports = {
  startServer,
  loadMemory,
  saveMemory
};

// Auto-start server if run directly
if (require.main === module) {
  startServer();
} 