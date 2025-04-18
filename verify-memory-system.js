/**
 * Memory System Verification Script
 * 
 * This script verifies that the memory system is functioning correctly
 * by testing the connection, CRUD operations, and overall health.
 */

const MemoryClient = require('./memory-client');
const memorySystem = require('./memory-system');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Configuration
const MEMORY_FILE = path.join(__dirname, 'memory.json');
const STUB_SERVER_PORT = 3100;

// Color output helper
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

// Log with color
function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

// Main verification function
async function verifyMemorySystem() {
  log('🔍 Verifying Memory System...', colors.cyan);
  log('═════════════════════════════\n');

  // Step 1: Check if memory file exists and is valid
  verifyMemoryFile();
  
  // Step 2: Check if memory server stub is running
  const serverRunning = await checkServerConnection();
  
  // Step 3: Test memory client operations
  if (serverRunning) {
    await testMemoryClient();
  }
  
  // Step 4: Test direct memory system operations
  testLocalMemorySystem();

  log('\n═════════════════════════════', colors.cyan);
  log('✅ Memory System Verification Complete', colors.green);
}

// Verify memory file existence and structure
function verifyMemoryFile() {
  log('📄 Checking memory file...', colors.blue);
  
  try {
    if (fs.existsSync(MEMORY_FILE)) {
      const data = fs.readFileSync(MEMORY_FILE, 'utf8');
      try {
        const memory = JSON.parse(data);
        
        if (memory.entities && memory.relations) {
          log(`✓ Memory file exists and has valid structure at: ${MEMORY_FILE}`, colors.green);
          log(`  - Contains ${Object.keys(memory.entities).length} entities`);
          log(`  - Contains ${memory.relations.length} relations`);
        } else {
          log(`⚠ Memory file exists but has invalid structure`, colors.yellow);
        }
      } catch (error) {
        log(`✗ Memory file exists but is not valid JSON: ${error.message}`, colors.red);
      }
    } else {
      log(`ℹ Memory file does not exist at ${MEMORY_FILE} (will be created when needed)`, colors.blue);
    }
  } catch (error) {
    log(`✗ Error checking memory file: ${error.message}`, colors.red);
  }
}

// Check if memory server is running
async function checkServerConnection() {
  log('\n🔌 Checking memory server connection...', colors.blue);
  
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:${STUB_SERVER_PORT}`, (res) => {
      if (res.statusCode === 200) {
        log(`✓ Memory server is running on port ${STUB_SERVER_PORT}`, colors.green);
        
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          log(`  Response: ${data}`);
          resolve(true);
        });
      } else {
        log(`⚠ Memory server returned unexpected status: ${res.statusCode}`, colors.yellow);
        resolve(false);
      }
    });
    
    req.on('error', (error) => {
      log(`✗ Unable to connect to memory server: ${error.message}`, colors.red);
      log('  To start the server, run: node memory-stub.js', colors.yellow);
      resolve(false);
    });
    
    req.end();
  });
}

// Test memory client operations
async function testMemoryClient() {
  log('\n🧪 Testing memory client operations...', colors.blue);
  
  const client = new MemoryClient(`http://localhost:${STUB_SERVER_PORT}`);
  
  try {
    // Step 1: Initialize connection
    log('  Testing connection initialization...');
    const initResult = await client.initialize();
    
    if (initResult.success) {
      log(`  ✓ Connection initialized: ${initResult.message}`, colors.green);
    } else {
      log(`  ✗ Connection failed: ${initResult.error}`, colors.red);
      return;
    }
    
    // Step 2: Create test entity
    log('  Testing entity creation...');
    const testEntity = {
      name: 'TestEntity',
      entityType: 'test',
      observations: ['Created for verification test', `Timestamp: ${new Date().toISOString()}`]
    };
    
    const createResult = await client.createEntity(testEntity);
    
    if (createResult.success) {
      log(`  ✓ Test entity created successfully`, colors.green);
    } else {
      log(`  ✗ Failed to create test entity: ${createResult.error}`, colors.red);
    }
    
    // Step 3: Fetch all entities
    log('  Testing entity retrieval...');
    const entities = await client.getAllEntities();
    
    if (entities.length > 0) {
      log(`  ✓ Retrieved ${entities.length} entities`, colors.green);
    } else {
      log(`  ⚠ No entities found in memory`, colors.yellow);
    }
    
    // Step 4: Find specific entity
    log('  Testing entity lookup...');
    const foundEntity = await client.findEntityByName('TestEntity');
    
    if (foundEntity) {
      log(`  ✓ Found test entity by name`, colors.green);
    } else {
      log(`  ✗ Could not find test entity by name`, colors.red);
    }
    
    // Step 5: Delete test entity
    log('  Testing entity deletion...');
    const deleteResult = await client.deleteEntity('TestEntity');
    
    if (deleteResult.success) {
      log(`  ✓ Test entity deleted successfully`, colors.green);
    } else {
      log(`  ✗ Failed to delete test entity: ${deleteResult.error}`, colors.red);
    }
    
  } catch (error) {
    log(`  ✗ Error during memory client tests: ${error.message}`, colors.red);
  }
}

// Test local memory system operations
function testLocalMemorySystem() {
  log('\n📝 Testing local memory system operations...', colors.blue);
  
  try {
    // Step 1: Check memory system initialization
    log('  Testing memory system initialization...');
    if (memorySystem.memory && memorySystem.memory.entities && memorySystem.memory.relations) {
      log(`  ✓ Memory system initialized correctly`, colors.green);
    } else {
      log(`  ✗ Memory system initialization issue`, colors.red);
      return;
    }
    
    // Step 2: Create test entity
    log('  Testing local entity creation...');
    const testEntity = memorySystem.upsertEntity(
      'LocalTestEntity',
      'local_test',
      ['Created for local verification test', `Timestamp: ${new Date().toISOString()}`]
    );
    
    if (testEntity && testEntity.name === 'LocalTestEntity') {
      log(`  ✓ Local test entity created successfully`, colors.green);
    } else {
      log(`  ✗ Failed to create local test entity`, colors.red);
    }
    
    // Step 3: Create another entity for relation testing
    const relatedEntity = memorySystem.upsertEntity(
      'RelatedEntity',
      'related_test',
      ['Created for relation testing']
    );
    
    // Step 4: Create relation between entities
    log('  Testing relation creation...');
    const relation = memorySystem.createRelation(
      'LocalTestEntity',
      'RelatedEntity',
      'test_relation'
    );
    
    if (relation) {
      log(`  ✓ Relation created successfully`, colors.green);
    } else {
      log(`  ⚠ Could not create relation (possibly already exists)`, colors.yellow);
    }
    
    // Step 5: Get relations for entity
    log('  Testing relation retrieval...');
    const relations = memorySystem.getRelationsForEntity('LocalTestEntity');
    
    if (relations.length > 0) {
      log(`  ✓ Retrieved ${relations.length} relations for test entity`, colors.green);
    } else {
      log(`  ✗ No relations found for test entity`, colors.red);
    }
    
    // Step 6: Delete test entities and relations
    log('  Testing entity deletion...');
    const deleteResult1 = memorySystem.deleteEntity('LocalTestEntity');
    const deleteResult2 = memorySystem.deleteEntity('RelatedEntity');
    
    if (deleteResult1 && deleteResult2) {
      log(`  ✓ Test entities deleted successfully`, colors.green);
    } else {
      log(`  ✗ Failed to delete one or more test entities`, colors.red);
    }
    
  } catch (error) {
    log(`  ✗ Error during local memory system tests: ${error.message}`, colors.red);
  }
}

// Run the verification if called directly
if (require.main === module) {
  verifyMemorySystem().then(() => {
    log('\nℹ To use this memory system in your application:', colors.blue);
    log('  1. Import the memory client: const MemoryClient = require(\'./memory-client\');');
    log('  2. Create a client instance: const client = new MemoryClient();');
    log('  3. Initialize the connection: await client.initialize();');
    log('  4. Use the client methods for CRUD operations on entities and relations');
  });
} 