/**
 * Add Conversation Memory Script
 * 
 * This script adds a new memory entity for the conversation about 
 * memory system implementation and verification.
 */

const MemoryClient = require('./memory-client');

async function addConversationMemory() {
  console.log('Adding conversation memory entry...');
  
  // Create a new memory client
  const memory = new MemoryClient();
  
  // Initialize the connection
  const initResult = await memory.initialize();
  if (!initResult.success) {
    console.error(`Failed to connect to memory server: ${initResult.error}`);
    console.log('Make sure the memory server is running (npm run memory-stub)');
    return;
  }
  
  console.log('✅ Connected to memory server');
  
  // Create a memory entity for the conversation
  const conversationEntity = {
    name: 'memory-system-conversation-' + Date.now(),
    entityType: 'conversation',
    observations: [
      'Discussed memory system implementation for the Social Media Marketing Agent',
      'Created verification script to test memory system functionality',
      'Implemented CRUD operations for memory entities and relations',
      'Verified connections, data storage, and retrieval mechanisms',
      'Added methods to retrieve latest memory entities',
      'Memory system uses a client-server architecture with local JSON storage',
      'Memory system provides persistence between sessions',
      'Created scripts for checking memory status, retrieving and removing entries',
      'Date of conversation: ' + new Date().toISOString().split('T')[0]
    ]
  };
  
  // Create the entity
  console.log('Creating conversation memory entry...');
  const createResult = await memory.createEntity(conversationEntity);
  
  if (createResult.success) {
    console.log('✅ Memory entry created successfully');
    
    // Try to relate this to other relevant entities if they exist
    try {
      // Check if 'Project' entity exists
      const projectEntity = await memory.findEntityByName('Project');
      
      if (projectEntity) {
        // Create a relation between the conversation and the project
        console.log('Creating relation to project...');
        await memory.createRelation(
          conversationEntity.name,
          'Project',
          'relates_to'
        );
        console.log('✅ Relation created successfully');
      }
      
      // Check if there's a development entity
      const devEntities = await memory.findEntitiesByType('development');
      if (devEntities && devEntities.length > 0) {
        // Create relation to the first development entity found
        console.log(`Creating relation to development entity '${devEntities[0].name}'...`);
        await memory.createRelation(
          conversationEntity.name,
          devEntities[0].name,
          'part_of'
        );
        console.log('✅ Relation created successfully');
      }
    } catch (error) {
      console.log('Note: Optional relations could not be created:', error.message);
    }
    
    // Show success message with the entity name
    console.log(`
Memory entry created with name: ${conversationEntity.name}
You can view this entry using: npm run memory-get-latest
    `);
  } else {
    console.error(`❌ Failed to create memory entry: ${createResult.error}`);
  }
}

// Run the function if called directly
if (require.main === module) {
  addConversationMemory().catch(error => {
    console.error('Error:', error.message);
  });
} 