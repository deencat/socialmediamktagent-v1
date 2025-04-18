/**
 * Memory Client - Simple interface for interacting with the memory system
 */

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

class MemoryClient {
  constructor(serverUrl = 'http://localhost:3100') {
    this.serverUrl = serverUrl;
  }

  /**
   * Initialize the connection to the memory server
   */
  async initialize() {
    try {
      const response = await this.callRpc('initialize', {
        client: {
          name: 'MemoryClient',
          version: '1.0.0'
        },
        capabilities: {}
      });
      
      return { success: true, message: 'Connected to memory server' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Get all entities from memory
   */
  async getAllEntities() {
    try {
      const response = await this.callRpc('memory/entities', {});
      return response.entities || [];
    } catch (error) {
      console.error('Failed to fetch entities:', error);
      return [];
    }
  }

  /**
   * Create a new entity in memory
   */
  async createEntity(entity) {
    if (!entity.name) {
      throw new Error('Entity must have a name');
    }
    
    try {
      const response = await this.callRpc('memory/create_entities', {
        entities: [entity]
      });
      
      return { success: true, message: 'Entity created successfully' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Create a relation between entities
   */
  async createRelation(from, to, relationType) {
    try {
      const response = await this.callRpc('memory/create_relations', {
        relations: [{ from, to, relationType }]
      });
      
      return { success: true, message: 'Relation created successfully' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Find entities by type
   */
  async findEntitiesByType(entityType) {
    try {
      const allEntities = await this.getAllEntities();
      return allEntities.filter(entity => entity.entityType === entityType);
    } catch (error) {
      console.error('Failed to find entities by type:', error);
      return [];
    }
  }

  /**
   * Find entity by name
   */
  async findEntityByName(name) {
    try {
      const allEntities = await this.getAllEntities();
      return allEntities.find(entity => entity.name === name);
    } catch (error) {
      console.error('Failed to find entity by name:', error);
      return null;
    }
  }

  /**
   * Delete an entity by name
   */
  async deleteEntity(name) {
    if (!name) {
      throw new Error('Entity name is required');
    }
    
    try {
      const response = await this.callRpc('memory/delete_entity', {
        name: name
      });
      
      return { success: true, message: `Entity '${name}' deleted successfully` };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  /**
   * Delete the most recently created entity
   */
  async deleteLatestEntity() {
    try {
      // Get all entities
      const entities = await this.getAllEntities();
      
      if (entities.length === 0) {
        return { success: false, error: 'No entities found to delete' };
      }
      
      // Find the most recently added entity
      // Note: Since we don't have creation timestamps, we'll use the last entity in the array
      // This assumes that entities are stored in insertion order
      const latestEntity = entities[entities.length - 1];
      
      // Delete the entity
      return await this.deleteEntity(latestEntity.name);
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  /**
   * Delete a relation between entities
   */
  async deleteRelation(from, to, relationType) {
    if (!from || !to) {
      throw new Error('Both from and to entity names are required');
    }
    
    try {
      const response = await this.callRpc('memory/delete_relation', {
        from: from,
        to: to,
        relationType: relationType || undefined
      });
      
      return { success: true, message: 'Relation deleted successfully' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Helper method to make RPC calls to the memory server
   */
  async callRpc(method, params) {
    const requestData = {
      jsonrpc: '2.0',
      id: Date.now().toString(),
      method,
      params
    };
    
    const response = await fetch(this.serverUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(requestData)
    });
    
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }
    
    const jsonResponse = await response.json();
    
    if (jsonResponse.error) {
      throw new Error(`RPC Error: ${jsonResponse.error.message}`);
    }
    
    return jsonResponse.result;
  }
}

module.exports = MemoryClient; 