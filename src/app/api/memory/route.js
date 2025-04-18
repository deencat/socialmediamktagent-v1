import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

// Helper function to make RPC calls to the memory server
async function callMemoryApi(method, params) {
  try {
    const requestData = {
      jsonrpc: '2.0',
      id: Date.now().toString(),
      method,
      params
    };
    
    const response = await fetch('http://localhost:3100', {
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
  } catch (error) {
    console.error('Memory API error:', error);
    throw error;
  }
}

// GET handler for retrieving entities
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const entityType = searchParams.get('type');
    const entityName = searchParams.get('name');
    
    const result = await callMemoryApi('memory/entities', {});
    let entities = result.entities || [];
    
    // Filter by type if specified
    if (entityType) {
      entities = entities.filter(entity => entity.entityType === entityType);
    }
    
    // Filter by name if specified
    if (entityName) {
      entities = entities.filter(entity => entity.name === entityName);
    }
    
    return NextResponse.json({ entities });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// POST handler for creating entities
export async function POST(request) {
  try {
    const body = await request.json();
    
    if (body.action === 'create_entity') {
      if (!body.entity || !body.entity.name) {
        return NextResponse.json(
          { error: 'Entity must have a name' },
          { status: 400 }
        );
      }
      
      const result = await callMemoryApi('memory/create_entities', {
        entities: [body.entity]
      });
      
      return NextResponse.json({ success: true, result });
    }
    
    if (body.action === 'create_relation') {
      if (!body.from || !body.to || !body.relationType) {
        return NextResponse.json(
          { error: 'Relation must have from, to, and relationType' },
          { status: 400 }
        );
      }
      
      const result = await callMemoryApi('memory/create_relations', {
        relations: [{ 
          from: body.from, 
          to: body.to, 
          relationType: body.relationType 
        }]
      });
      
      return NextResponse.json({ success: true, result });
    }
    
    if (body.action === 'delete_entity') {
      if (!body.name) {
        return NextResponse.json(
          { error: 'Entity name is required' },
          { status: 400 }
        );
      }
      
      const result = await callMemoryApi('memory/delete_entity', {
        name: body.name
      });
      
      return NextResponse.json({ success: true, result });
    }
    
    if (body.action === 'delete_latest') {
      // First get all entities
      const entitiesResult = await callMemoryApi('memory/entities', {});
      const entities = entitiesResult.entities || [];
      
      if (entities.length === 0) {
        return NextResponse.json(
          { error: 'No entities found to delete' },
          { status: 404 }
        );
      }
      
      // Get the most recent entity (last in the array)
      const latestEntity = entities[entities.length - 1];
      
      // Delete it
      const result = await callMemoryApi('memory/delete_entity', {
        name: latestEntity.name
      });
      
      return NextResponse.json({ 
        success: true, 
        result,
        entity: latestEntity 
      });
    }
    
    return NextResponse.json(
      { error: 'Unknown action' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
} 