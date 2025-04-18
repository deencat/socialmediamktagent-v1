// Simple Memory API for Social Media Marketing Agent
const express = require('express');
const bodyParser = require('body-parser');
const memory = require('./memory-system');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3100;

// Middleware
app.use(bodyParser.json());

// API Routes

// Get all entities
app.get('/memory/entities', (req, res) => {
  res.json(Object.values(memory.memory.entities));
});

// Get entity by name
app.get('/memory/entities/:name', (req, res) => {
  const entity = memory.memory.entities[req.params.name];
  if (entity) {
    res.json(entity);
  } else {
    res.status(404).json({ error: 'Entity not found' });
  }
});

// Create or update entity
app.post('/memory/entities', (req, res) => {
  try {
    const { name, entityType, observations } = req.body;
    const entity = memory.upsertEntity(name, entityType, observations);
    res.status(201).json(entity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete entity
app.delete('/memory/entities/:name', (req, res) => {
  const result = memory.deleteEntity(req.params.name);
  if (result) {
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Entity not found' });
  }
});

// Get all relations
app.get('/memory/relations', (req, res) => {
  res.json(memory.memory.relations);
});

// Create relation
app.post('/memory/relations', (req, res) => {
  try {
    const { from, to, relationType } = req.body;
    const relation = memory.createRelation(from, to, relationType);
    if (relation) {
      res.status(201).json(relation);
    } else {
      res.status(409).json({ error: 'Relation already exists' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete relation
app.delete('/memory/relations', (req, res) => {
  try {
    const { from, to, relationType } = req.body;
    const result = memory.deleteRelation(from, to, relationType);
    if (result) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Relation not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Search entities
app.get('/memory/search', (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }
  const results = memory.searchEntities(query);
  res.json(results);
});

// Get entities by type
app.get('/memory/entityType/:type', (req, res) => {
  const entities = memory.getEntitiesByType(req.params.type);
  res.json(entities);
});

// Get relations for entity
app.get('/memory/entityRelations/:name', (req, res) => {
  const relations = memory.getRelationsForEntity(req.params.name);
  res.json(relations);
});

// Initialize memory
app.post('/memory/initialize', (req, res) => {
  try {
    memory.initializeProjectMemory();
    res.status(200).json({ message: 'Memory initialized successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get full memory
app.get('/memory', (req, res) => {
  res.json(memory.memory);
});

// Start server
app.listen(PORT, () => {
  console.log(`Memory API server running on port ${PORT}`);
});

// Export for testing
module.exports = app; 