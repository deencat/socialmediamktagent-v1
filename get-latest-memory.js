/**
 * Get Latest Memory Entity
 * 
 * This script retrieves and displays the most recent memory entity.
 */

const MemoryClient = require('./memory-client');
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  bold: '\x1b[1m'
};

async function getLatestMemory() {
  console.log(`${colors.cyan}${colors.bold}Memory System - Latest Entity${colors.reset}`);
  console.log('════════════════════════════════\n');

  // Create a new memory client
  const memory = new MemoryClient();
  
  try {
    // Step 1: Connect to memory server
    console.log(`${colors.blue}Connecting to memory server...${colors.reset}`);
    const initResult = await memory.initialize();
    
    if (!initResult.success) {
      console.error(`${colors.red}Failed to connect to memory server: ${initResult.error}${colors.reset}`);
      console.log(`${colors.yellow}Make sure the memory server is running (run: npm run memory-stub)${colors.reset}`);
      return;
    }
    
    console.log(`${colors.green}✓ Connected to memory server${colors.reset}`);
    
    // Step 2: Get all entities
    console.log(`\n${colors.blue}Retrieving entities...${colors.reset}`);
    const entities = await memory.getAllEntities();
    
    if (entities.length === 0) {
      console.log(`${colors.yellow}No entities found in memory.${colors.reset}`);
      return;
    }
    
    console.log(`${colors.green}✓ Retrieved ${entities.length} entities${colors.reset}`);
    
    // Step 3: Get the latest entity (last in the array)
    const latestEntity = entities[entities.length - 1];
    
    // Step 4: Display the entity details
    console.log(`\n${colors.magenta}${colors.bold}Latest Memory Entity:${colors.reset}`);
    console.log(`${colors.cyan}Name: ${colors.reset}${latestEntity.name}`);
    console.log(`${colors.cyan}Type: ${colors.reset}${latestEntity.entityType}`);
    console.log(`${colors.cyan}Observations:${colors.reset}`);
    
    latestEntity.observations.forEach((obs, index) => {
      console.log(`  ${index + 1}. ${obs}`);
    });
    
    // Step 5: Check for related entities (relations)
    console.log(`\n${colors.blue}Checking for relations...${colors.reset}`);
    
    // Find relations where this entity is the "from" or "to"
    const relatedEntities = [];
    
    for (const entity of entities) {
      if (entity.name !== latestEntity.name) {
        const relations = await memory.findRelations(latestEntity.name, entity.name);
        
        if (relations && relations.length > 0) {
          relatedEntities.push({
            entity: entity,
            relations: relations
          });
        }
      }
    }
    
    if (relatedEntities.length > 0) {
      console.log(`${colors.green}✓ Found ${relatedEntities.length} related entities${colors.reset}`);
      console.log(`\n${colors.magenta}${colors.bold}Related Entities:${colors.reset}`);
      
      relatedEntities.forEach(related => {
        console.log(`${colors.cyan}Related to: ${colors.reset}${related.entity.name} (${related.entity.entityType})`);
        related.relations.forEach(relation => {
          console.log(`  ${colors.cyan}Relation: ${colors.reset}${relation.relationType}`);
          console.log(`  ${colors.cyan}Direction: ${colors.reset}${relation.from === latestEntity.name ? 'Outgoing' : 'Incoming'}`);
        });
      });
    } else {
      console.log(`${colors.yellow}No relations found for this entity.${colors.reset}`);
    }
    
  } catch (error) {
    console.error(`${colors.red}Error: ${error.message}${colors.reset}`);
  }
}

// Helper function to find relations between two entities
MemoryClient.prototype.findRelations = async function(entity1, entity2) {
  try {
    // Call memory/relations RPC method to get relations
    // If this method doesn't exist, we'll need to call getAllRelations
    try {
      const response = await this.callRpc('memory/relations', {});
      const relations = response.relations || [];
      
      // Filter relations that connect these two entities
      return relations.filter(relation => 
        (relation.from === entity1 && relation.to === entity2) || 
        (relation.from === entity2 && relation.to === entity1)
      );
    } catch (error) {
      // Fallback: Try to get relations from memoryStore directly
      // The stub server may not expose relations directly via API
      console.log(`${colors.yellow}Note: Using fallback method to find relations${colors.reset}`);
      
      // Make a direct call to get entities
      const entitiesResponse = await this.callRpc('memory/entities', {});
      
      // Look for info that might contain relations
      let relations = [];
      
      // Check if relations might be in the result somehow
      if (entitiesResponse.relations) {
        relations = entitiesResponse.relations;
      }
      
      return relations.filter(relation => 
        (relation.from === entity1 && relation.to === entity2) || 
        (relation.from === entity2 && relation.to === entity1)
      );
    }
  } catch (error) {
    console.error('Failed to find relations:', error);
    return [];
  }
};

// Run the function if this script is executed directly
if (require.main === module) {
  getLatestMemory().catch(error => {
    console.error(`${colors.red}Unexpected error: ${error.message}${colors.reset}`);
  });
} 