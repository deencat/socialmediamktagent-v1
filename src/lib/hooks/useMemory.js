import { useState, useCallback } from 'react';

/**
 * React hook for accessing the memory system
 */
export function useMemory() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  /**
   * Get all entities from the memory system
   */
  const getAllEntities = useCallback(async (type = null) => {
    setLoading(true);
    setError(null);
    
    try {
      const url = type 
        ? `/api/memory?type=${encodeURIComponent(type)}`
        : '/api/memory';
        
      const response = await fetch(url);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch entities');
      }
      
      return data.entities;
    } catch (error) {
      setError(error.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);
  
  /**
   * Get a specific entity by name
   */
  const getEntityByName = useCallback(async (name) => {
    setLoading(true);
    setError(null);
    
    try {
      const url = `/api/memory?name=${encodeURIComponent(name)}`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch entity');
      }
      
      return data.entities[0] || null;
    } catch (error) {
      setError(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);
  
  /**
   * Create a new entity
   */
  const createEntity = useCallback(async (entity) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/memory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'create_entity',
          entity
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create entity');
      }
      
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, []);
  
  /**
   * Create a relation between entities
   */
  const createRelation = useCallback(async (from, to, relationType) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/memory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'create_relation',
          from,
          to,
          relationType
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create relation');
      }
      
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, []);
  
  /**
   * Delete an entity by name
   */
  const deleteEntity = useCallback(async (name) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/memory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'delete_entity',
          name
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete entity');
      }
      
      return { success: true, message: `Entity '${name}' deleted successfully` };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, []);
  
  /**
   * Delete the most recently added entity
   */
  const deleteLatestEntity = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/memory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'delete_latest'
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete latest entity');
      }
      
      return { 
        success: true, 
        message: `Latest entity deleted successfully`,
        entity: data.entity 
      };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, []);
  
  return {
    loading,
    error,
    getAllEntities,
    getEntityByName,
    createEntity,
    createRelation,
    deleteEntity,
    deleteLatestEntity
  };
} 