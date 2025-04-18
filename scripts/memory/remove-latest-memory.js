/**
 * Utility script to delete the latest memory entry
 * 
 * This script will remove the most recently added entity from the memory system.
 * Run this if you want to undo a memory entry that was just added.
 */

const MemoryClient = require('./memory-client');
const fs = require('fs');
const path = require('path');

// Configuration
const MEMORY_FILE = path.join(__dirname, 'memory.json');

async function removeLatestMemory() {
  console.log('Memory Entry Removal Tool');
  console.log('========================');
  
  // Create a new memory client
  const memory = new MemoryClient();
  
  // Initialize connection
  console.log('Connecting to memory server...');
  const initResult = await memory.initialize();
  if (!initResult.success) {
    console.error(`❌ Failed to connect to memory server: ${initResult.error}`);
    console.log('Make sure the memory server is running (npm run memory-stub)');
    return;
  }
  
  // Get current entities
  console.log('Retrieving current memory entries...');
  const entities = await memory.getAllEntities();
  
  if (entities.length === 0) {
    console.log('ℹ️ No entities found in memory.');
    return;
  }
  
  // Show the entities that will be removed
  const latestEntity = entities[entities.length - 1];
  console.log('\nLatest memory entry:');
  console.log(`- Name: ${latestEntity.name}`);
  console.log(`- Type: ${latestEntity.entityType}`);
  console.log('- Observations:');
  latestEntity.observations.forEach(obs => console.log(`  * ${obs}`));
  
  // Ask for confirmation
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  readline.question('\nDo you want to remove this entry? (y/n): ', async (answer) => {
    if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
      // Delete the entity
      console.log(`\nDeleting entity '${latestEntity.name}'...`);
      const result = await memory.deleteEntity(latestEntity.name);
      
      if (result.success) {
        console.log(`✅ ${result.message}`);
        
        // Manually update the memory.json file to ensure changes persist
        try {
          console.log('Updating memory file...');
          
          // Read the current memory file
          const memoryData = JSON.parse(fs.readFileSync(MEMORY_FILE, 'utf8'));
          
          // Remove the entity from the memory data
          if (memoryData.entities && memoryData.entities[latestEntity.name]) {
            delete memoryData.entities[latestEntity.name];
            
            // Also remove any relations involving this entity
            if (memoryData.relations && Array.isArray(memoryData.relations)) {
              memoryData.relations = memoryData.relations.filter(
                relation => relation.from !== latestEntity.name && relation.to !== latestEntity.name
              );
            }
            
            // Write the updated memory data back to the file
            fs.writeFileSync(MEMORY_FILE, JSON.stringify(memoryData, null, 2));
            console.log('✅ Memory file updated successfully');
            
            // Restart the memory server to pick up changes
            console.log('Note: You may need to restart the memory server to see changes reflected in all tools');
          } else {
            console.log('⚠️ Entity not found in memory file. Changes may not persist.');
          }
        } catch (error) {
          console.error(`⚠️ Failed to update memory file: ${error.message}`);
          console.log('The entity was deleted via API but changes may not persist.');
        }
      } else {
        console.error(`❌ Failed to delete entity: ${result.error}`);
      }
    } else {
      console.log('Operation cancelled.');
    }
    
    readline.close();
  });
}

// Run the function
removeLatestMemory().catch(error => {
  console.error('Error:', error.message);
}); 