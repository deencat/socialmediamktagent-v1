// Import required modules
const http = require('http');
const https = require('https');

// Enable detailed debugging
const DEBUG = true;

function debug(...args) {
  if (DEBUG) {
    console.log('[DEBUG]', ...args);
  }
}

// Function to make HTTP requests without external dependencies
function makeRequest(url, options = {}, data = null) {
  return new Promise((resolve, reject) => {
    const isHttps = url.startsWith('https');
    const lib = isHttps ? https : http;
    
    const urlObj = new URL(url);
    
    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port || (isHttps ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: options.headers || {}
    };
    
    debug('Making request to:', url);
    debug('Request options:', JSON.stringify(requestOptions));
    if (data) debug('Request data:', JSON.stringify(data));
    
    const req = lib.request(requestOptions, (res) => {
      debug('Response status:', res.statusCode, res.statusMessage);
      debug('Response headers:', JSON.stringify(res.headers));
      
      let responseBody = '';
      
      res.on('data', (chunk) => {
        responseBody += chunk;
      });
      
      res.on('end', () => {
        debug('Response body:', responseBody.substring(0, 500) + (responseBody.length > 500 ? '...' : ''));
        try {
          const parsedBody = responseBody ? JSON.parse(responseBody) : {};
          resolve({
            ok: res.statusCode >= 200 && res.statusCode < 300,
            status: res.statusCode,
            statusText: res.statusMessage,
            json: () => Promise.resolve(parsedBody),
            body: responseBody
          });
        } catch (e) {
          debug('Error parsing JSON:', e.message);
          resolve({
            ok: res.statusCode >= 200 && res.statusCode < 300,
            status: res.statusCode,
            statusText: res.statusMessage,
            body: responseBody
          });
        }
      });
    });
    
    req.on('error', (err) => {
      debug('Request error:', err.message);
      reject(err);
    });
    
    if (data) {
      req.write(typeof data === 'string' ? data : JSON.stringify(data));
    }
    
    req.end();
  });
}

// Try a simple connectivity check to the server
async function checkServerConnectivity() {
  try {
    console.log('Checking connectivity to MCP server...');
    const response = await makeRequest('http://localhost:3100', {
      method: 'GET'
    });
    console.log(`Server responded with status: ${response.status} ${response.statusText}`);
    return response.ok;
  } catch (error) {
    console.error('Failed to connect to MCP server:', error.message);
    return false;
  }
}

// Standard MCP RPC call helper
async function callMcpRpc(method, params) {
  const requestData = {
    jsonrpc: "2.0",
    id: Date.now().toString(),
    method: method,
    params: params
  };
  
  const response = await makeRequest('http://localhost:3100', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }, requestData);
  
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
  }
  
  const jsonResponse = await response.json();
  
  if (jsonResponse.error) {
    throw new Error(`RPC Error: ${jsonResponse.error.message}`);
  }
  
  return jsonResponse.result;
}

// Sample initial memory entries for social media marketing
const initialMemory = [
  {
    name: "social-media-platforms",
    entityType: "reference",
    observations: [
      "Major social media platforms include: Facebook, Instagram, Twitter/X, LinkedIn, TikTok, YouTube, Pinterest, and Snapchat."
    ]
  },
  {
    name: "marketing-best-practices",
    entityType: "reference",
    observations: [
      "Social media marketing best practices: consistent posting schedule, engaging with audience, using high-quality visuals, tracking metrics, and tailoring content to each platform."
    ]
  },
  {
    name: "content-strategy",
    entityType: "reference", 
    observations: [
      "Content strategy should focus on providing value, telling stories, and building community rather than solely promoting products."
    ]
  },
  {
    name: "Project",
    entityType: "project",
    observations: [
      "Social Media Marketing Agent",
      "Next.js web application",
      "Uses Tailwind CSS for styling",
      "Uses Shadcn UI for components"
    ]
  },
  {
    name: "CurrentPhase",
    entityType: "project_phase",
    observations: [
      "Phase 2: SME Dashboard & Content Management",
      "Sprint 2: Dashboard Framework & Widgets",
      "Development Mode: Prototyping (frontend-only with mocked data)"
    ]
  }
];

async function initializeMemory() {
  console.log('Initializing MCP memory with social media marketing knowledge...');
  
  try {
    // First check if server is responsive
    const isConnected = await checkServerConnectivity();
    if (!isConnected) {
      console.error('❌ Cannot connect to MCP server at http://localhost:3100');
      console.log('Please make sure the server is running with:');
      console.log('  npx -y @modelcontextprotocol/server-memory --port 3100');
      return;
    }
    
    // Try the MCP server initialize call
    try {
      // Initialize MCP with handshake
      await callMcpRpc("initialize", {
        client: {
          name: "InitialMemory",
          version: "1.0.0"
        },
        capabilities: {}
      });
      
      console.log('✅ Connected to MCP Server');
    } catch (error) {
      console.error('❌ Failed to initialize MCP connection:', error.message);
      console.log('Attempting direct entity creation as fallback...');
      
      // Try direct memory API approach
      await createEntitiesDirectly();
      return;
    }
    
    // Create entities using MCP RPC
    for (const entry of initialMemory) {
      try {
        await callMcpRpc("memory/create_entities", { 
          entities: [entry] 
        });
        console.log(`✅ Added memory entry: ${entry.name}`);
      } catch (error) {
        console.error(`❌ Failed to add memory entry ${entry.name}: ${error.message}`);
      }
    }
    
    // Setup relations
    const relations = [
      {
        from: "Project",
        to: "CurrentPhase",
        relationType: "is_in"
      },
      {
        from: "Project", 
        to: "marketing-best-practices",
        relationType: "follows"
      },
      {
        from: "Project",
        to: "content-strategy",
        relationType: "implements"
      }
    ];
    
    try {
      await callMcpRpc("memory/create_relations", { relations });
      console.log('✅ Added memory relations');
    } catch (error) {
      console.error(`❌ Failed to add relations: ${error.message}`);
    }
    
    console.log('Memory initialization complete!');
  } catch (error) {
    console.error('Error initializing memory:', error.message);
    console.log('Make sure the MCP memory server is running at http://localhost:3100');
  }
}

// Fallback method using direct API calls
async function createEntitiesDirectly() {
  console.log('Trying to create entities using direct API calls...');
  
  // Try different API paths that might work
  const possiblePaths = [
    '/entities',
    '/mcp/memory/entities',
    '/memory/entities',
    '/v1/memory/entities',
    '/api/entities'
  ];
  
  for (const path of possiblePaths) {
    try {
      console.log(`Attempting API path: ${path}`);
      const response = await makeRequest(`http://localhost:3100${path}`, {
        method: 'GET'
      });
      
      if (response.ok) {
        console.log(`✅ Found working API path: ${path}`);
        
        // Add entities
        for (const entry of initialMemory) {
          try {
            const createResponse = await makeRequest(`http://localhost:3100${path}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' }
            }, entry);
            
            if (createResponse.ok) {
              console.log(`✅ Added memory entry: ${entry.name}`);
            } else {
              console.error(`❌ Failed to add memory entry ${entry.name}`);
            }
          } catch (error) {
            console.error(`❌ Failed to add memory entry ${entry.name}: ${error.message}`);
          }
        }
        
        console.log('Memory initialization through direct API completed!');
        return;
      }
    } catch (error) {
      // Continue to next path
    }
  }
  
  console.error('❌ Could not find any working API paths');
}

initializeMemory();
