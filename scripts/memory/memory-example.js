/**
 * Memory System Usage Example
 * 
 * This example demonstrates how to use the memory system in your application.
 * Make sure the memory-stub server is running (npm run memory-stub) before running this example.
 */

const MemoryClient = require('./memory-client');

// Create an async function to work with the memory system
async function memoryExample() {
  console.log('Memory System Example');
  console.log('---------------------');
  
  // Create a new memory client
  const memory = new MemoryClient();
  
  // Initialize the connection
  const initResult = await memory.initialize();
  if (!initResult.success) {
    console.error('Failed to connect to memory server:', initResult.error);
    console.log('Make sure the memory server is running (npm run memory-stub)');
    return;
  }
  
  console.log('✅ Connected to memory server');
  
  // Example 1: Create a new entity for a social media post
  const postEntity = {
    name: 'social-post-1',
    entityType: 'post',
    observations: [
      'Created for Instagram',
      'Topic: Summer fashion trends',
      'Contains carousel of images',
      'Scheduled for posting on June 15, 2023'
    ]
  };
  
  console.log('\nCreating post entity...');
  const createResult = await memory.createEntity(postEntity);
  if (createResult.success) {
    console.log('✅ Post entity created successfully');
  } else {
    console.error('❌ Failed to create post entity:', createResult.error);
  }
  
  // Example 2: Create a marketing campaign entity
  const campaignEntity = {
    name: 'summer-campaign-2023',
    entityType: 'campaign',
    observations: [
      'Summer 2023 marketing campaign',
      'Target audience: 18-35 year olds',
      'Focuses on beachwear and accessories',
      'Duration: June 1 - August 31, 2023'
    ]
  };
  
  console.log('\nCreating campaign entity...');
  await memory.createEntity(campaignEntity);
  
  // Example 3: Create a relation between the post and campaign
  console.log('\nCreating relation between post and campaign...');
  const relationResult = await memory.createRelation(
    'social-post-1',
    'summer-campaign-2023',
    'part_of'
  );
  
  if (relationResult.success) {
    console.log('✅ Relation created successfully');
  } else {
    console.error('❌ Failed to create relation:', relationResult.error);
  }
  
  // Example 4: Retrieve all entities
  console.log('\nRetrieving all entities from memory...');
  const allEntities = await memory.getAllEntities();
  console.log(`Found ${allEntities.length} entities in memory.`);
  
  // Example 5: Find entities by type
  console.log('\nFinding all campaign entities...');
  const campaigns = await memory.findEntitiesByType('campaign');
  console.log(`Found ${campaigns.length} campaign(s):`);
  campaigns.forEach(campaign => {
    console.log(`- ${campaign.name}: ${campaign.observations[0]}`);
  });
  
  // Example 6: Find entity by name
  console.log('\nFinding post by name...');
  const post = await memory.findEntityByName('social-post-1');
  if (post) {
    console.log('Post details:');
    console.log(`- Name: ${post.name}`);
    console.log(`- Type: ${post.entityType}`);
    console.log('- Observations:');
    post.observations.forEach(obs => console.log(`  * ${obs}`));
  } else {
    console.log('Post not found');
  }
  
  console.log('\nMemory system example completed.');
}

// Run the example
memoryExample().catch(error => {
  console.error('Error running memory example:', error);
}); 