"use client";

import { useState, useEffect } from 'react';
import { useMemory } from '@/lib/hooks/useMemory';

export function MemoryViewer() {
  const { loading, error, getAllEntities, createEntity, deleteEntity, deleteLatestEntity } = useMemory();
  const [entities, setEntities] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [newEntity, setNewEntity] = useState({
    name: '',
    entityType: '',
    observations: ['']
  });
  const [message, setMessage] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  const entityTypes = [
    'project',
    'project_phase',
    'task_group',
    'component',
    'feature',
    'milestone',
    'post',
    'campaign',
    'reference'
  ];
  
  // Load entities on mount and when selectedType changes
  useEffect(() => {
    const loadEntities = async () => {
      const data = await getAllEntities(selectedType || null);
      setEntities(data);
    };
    
    loadEntities();
  }, [getAllEntities, selectedType]);
  
  // Handle observation input changes
  const handleObservationChange = (index, value) => {
    const updatedObservations = [...newEntity.observations];
    updatedObservations[index] = value;
    
    setNewEntity({
      ...newEntity,
      observations: updatedObservations
    });
  };
  
  // Add new observation field
  const addObservation = () => {
    setNewEntity({
      ...newEntity,
      observations: [...newEntity.observations, '']
    });
  };
  
  // Remove observation field
  const removeObservation = (index) => {
    const updatedObservations = [...newEntity.observations];
    updatedObservations.splice(index, 1);
    
    setNewEntity({
      ...newEntity,
      observations: updatedObservations.length ? updatedObservations : ['']
    });
  };
  
  // Handle form submission to create new entity
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!newEntity.name || !newEntity.entityType) {
      setMessage('Name and entity type are required');
      return;
    }
    
    // Filter out empty observations
    const filteredObservations = newEntity.observations.filter(obs => obs.trim());
    if (!filteredObservations.length) {
      setMessage('At least one observation is required');
      return;
    }
    
    // Create entity with filtered observations
    const result = await createEntity({
      ...newEntity,
      observations: filteredObservations
    });
    
    if (result.success) {
      setMessage('Entity created successfully');
      
      // Reset form
      setNewEntity({
        name: '',
        entityType: '',
        observations: ['']
      });
      
      // Reload entities
      const data = await getAllEntities(selectedType || null);
      setEntities(data);
    } else {
      setMessage(`Error: ${result.error}`);
    }
  };
  
  // Handle removing the latest entity
  const handleRemoveLatest = async () => {
    setIsDeleting(true);
    
    try {
      const result = await deleteLatestEntity();
      
      if (result.success) {
        setMessage(`Successfully removed entity: ${result.entity.name}`);
        
        // Reload entities
        const data = await getAllEntities(selectedType || null);
        setEntities(data);
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsDeleting(false);
    }
  };
  
  // Handle removing a specific entity
  const handleRemoveEntity = async (name) => {
    setIsDeleting(true);
    
    try {
      const result = await deleteEntity(name);
      
      if (result.success) {
        setMessage(`Successfully removed entity: ${name}`);
        
        // Reload entities
        const data = await getAllEntities(selectedType || null);
        setEntities(data);
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsDeleting(false);
    }
  };
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Memory System</h2>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          {error}
        </div>
      )}
      
      {message && (
        <div className={`${message.includes('Error') ? 'bg-red-100 border-red-500 text-red-700' : 'bg-green-100 border-green-500 text-green-700'} border-l-4 p-4 mb-4`}>
          {message}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Entity List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <h3 className="text-lg font-semibold mr-4">Entities</h3>
              
              <select
                className="border rounded px-2 py-1"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="">All Types</option>
                {entityTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <button
              className="text-sm px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
              onClick={handleRemoveLatest}
              disabled={loading || isDeleting || entities.length === 0}
            >
              {isDeleting ? 'Removing...' : 'Remove Latest'}
            </button>
          </div>
          
          {loading ? (
            <p>Loading entities...</p>
          ) : entities.length === 0 ? (
            <p>No entities found</p>
          ) : (
            <div className="space-y-4">
              {entities.map(entity => (
                <div key={entity.name} className="border rounded p-4 relative">
                  <button
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveEntity(entity.name)}
                    disabled={isDeleting}
                    title="Delete entity"
                  >
                    ✕
                  </button>
                  
                  <h4 className="font-bold">{entity.name}</h4>
                  <p className="text-sm text-gray-500 mb-2">Type: {entity.entityType}</p>
                  
                  <h5 className="text-sm font-semibold mb-1">Observations:</h5>
                  <ul className="list-disc list-inside text-sm pl-2">
                    {entity.observations.map((obs, i) => (
                      <li key={i}>{obs}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Create Entity Form */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Create New Entity</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Name:
                <input
                  type="text"
                  className="mt-1 block w-full border rounded px-3 py-2"
                  value={newEntity.name}
                  onChange={(e) => setNewEntity({...newEntity, name: e.target.value})}
                  required
                />
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                Entity Type:
                <select
                  className="mt-1 block w-full border rounded px-3 py-2"
                  value={newEntity.entityType}
                  onChange={(e) => setNewEntity({...newEntity, entityType: e.target.value})}
                  required
                >
                  <option value="">Select Type</option>
                  {entityTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                Observations:
              </label>
              
              {newEntity.observations.map((observation, index) => (
                <div key={index} className="flex items-center mt-2">
                  <input
                    type="text"
                    className="flex-grow border rounded px-3 py-2"
                    value={observation}
                    onChange={(e) => handleObservationChange(index, e.target.value)}
                    placeholder={`Observation ${index + 1}`}
                    required
                  />
                  
                  <button
                    type="button"
                    onClick={() => removeObservation(index)}
                    className="ml-2 text-red-500"
                    disabled={newEntity.observations.length === 1}
                  >
                    Remove
                  </button>
                </div>
              ))}
              
              <button
                type="button"
                onClick={addObservation}
                className="mt-2 text-blue-500 text-sm"
              >
                + Add Observation
              </button>
            </div>
            
            <div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create Entity'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 