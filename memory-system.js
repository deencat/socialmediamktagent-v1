// Simple memory system for Social Media Marketing Agent
const fs = require('fs');
const path = require('path');

class MemorySystem {
  constructor(filePath = 'memory.json') {
    this.filePath = filePath;
    this.memory = this.loadMemory();
  }

  // Load memory from file or initialize if it doesn't exist
  loadMemory() {
    try {
      if (fs.existsSync(this.filePath)) {
        const data = fs.readFileSync(this.filePath, 'utf8');
        return JSON.parse(data);
      } else {
        // Initialize with empty structures
        const initialMemory = {
          entities: {},
          relations: []
        };
        this.saveMemory(initialMemory);
        return initialMemory;
      }
    } catch (error) {
      console.error(`Error loading memory: ${error.message}`);
      // Return empty memory on error
      return { entities: {}, relations: [] };
    }
  }

  // Save memory to file
  saveMemory(memory = this.memory) {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(memory, null, 2));
      return true;
    } catch (error) {
      console.error(`Error saving memory: ${error.message}`);
      return false;
    }
  }

  // Create or update an entity
  upsertEntity(name, entityType, observations = []) {
    if (!name || !entityType) {
      throw new Error('Entity name and type are required');
    }

    const entity = this.memory.entities[name] || {
      name,
      entityType,
      observations: [],
      createdAt: new Date().toISOString()
    };

    // Add new observations, avoiding duplicates
    observations.forEach(obs => {
      if (!entity.observations.includes(obs)) {
        entity.observations.push(obs);
      }
    });

    entity.updatedAt = new Date().toISOString();
    this.memory.entities[name] = entity;
    this.saveMemory();
    return entity;
  }

  // Create a relation between entities
  createRelation(from, to, relationType) {
    if (!from || !to || !relationType) {
      throw new Error('From, to, and relationType are required');
    }

    // Check if entities exist
    if (!this.memory.entities[from]) {
      throw new Error(`Entity '${from}' does not exist`);
    }
    if (!this.memory.entities[to]) {
      throw new Error(`Entity '${to}' does not exist`);
    }

    // Check for duplicate relation
    const exists = this.memory.relations.some(r => 
      r.from === from && r.to === to && r.relationType === relationType
    );

    if (!exists) {
      const relation = {
        from,
        to,
        relationType,
        createdAt: new Date().toISOString()
      };
      this.memory.relations.push(relation);
      this.saveMemory();
      return relation;
    }
    
    return null; // Return null if relation already exists
  }

  // Delete an entity and its relations
  deleteEntity(name) {
    if (this.memory.entities[name]) {
      delete this.memory.entities[name];
      // Remove all relations involving this entity
      this.memory.relations = this.memory.relations.filter(
        r => r.from !== name && r.to !== name
      );
      this.saveMemory();
      return true;
    }
    return false;
  }

  // Delete a relation
  deleteRelation(from, to, relationType) {
    const initialLength = this.memory.relations.length;
    this.memory.relations = this.memory.relations.filter(
      r => !(r.from === from && r.to === to && r.relationType === relationType)
    );
    
    if (initialLength !== this.memory.relations.length) {
      this.saveMemory();
      return true;
    }
    return false;
  }

  // Search entities by name, type, or observations
  searchEntities(query) {
    if (!query) return [];
    
    const lowerQuery = query.toLowerCase();
    return Object.values(this.memory.entities).filter(entity => {
      // Check name, type, and observations
      if (entity.name.toLowerCase().includes(lowerQuery)) return true;
      if (entity.entityType.toLowerCase().includes(lowerQuery)) return true;
      
      // Check observations
      return entity.observations.some(obs => 
        obs.toLowerCase().includes(lowerQuery)
      );
    });
  }

  // Get all entities of a specific type
  getEntitiesByType(entityType) {
    return Object.values(this.memory.entities).filter(
      entity => entity.entityType === entityType
    );
  }

  // Get all relations involving an entity
  getRelationsForEntity(entityName) {
    return this.memory.relations.filter(
      relation => relation.from === entityName || relation.to === entityName
    );
  }

  // Initialize with project information
  initializeProjectMemory() {
    // Project entity
    this.upsertEntity('Project', 'project', [
      'Social Media Marketing Agent',
      'Next.js web application',
      'Uses Tailwind CSS for styling',
      'Uses Shadcn UI for components'
    ]);

    // Current phase
    this.upsertEntity('CurrentPhase', 'project_phase', [
      'Phase 2: SME Dashboard & Content Management',
      'Sprint 2: Dashboard Framework & Widgets',
      'Development Mode: Prototyping (frontend-only with mocked data)'
    ]);

    // Completed work
    this.upsertEntity('CompletedWork', 'milestone', [
      'Completed Sprint 1 and Phase 1 (Core UI Framework & Authentication Flow)',
      'Updated project management documents',
      'Setup authentication UI and navigation shell'
    ]);

    // Current focus
    this.upsertEntity('CurrentFocus', 'task_group', [
      'Dashboard layout with widget grid',
      'Widget container component implementation',
      'Drag-and-drop functionality for widgets',
      'Core widgets: Analytics, Content Calendar, Quick Actions, Recent Activity'
    ]);

    // Create relations
    this.createRelation('Project', 'CurrentPhase', 'is_in');
    this.createRelation('Project', 'CompletedWork', 'has_achieved');
    this.createRelation('Project', 'CurrentFocus', 'is_working_on');

    console.log('Project memory initialized successfully');
    return true;
  }
}

// Export as a singleton
const memorySystem = new MemorySystem();
module.exports = memorySystem;

// If called directly, initialize the memory
if (require.main === module) {
  memorySystem.initializeProjectMemory();
} 