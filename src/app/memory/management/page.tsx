"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Plus, Search, AlertCircle, Check, FileText, Tag, Link as LinkIcon } from "lucide-react";
import { Toast, ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

// Mock data for the memory entities
const mockMemoryEntities = [
  {
    id: "memory-1",
    name: "Project Kickoff Meeting",
    type: "Conversation",
    content: "Initial discussion about project scope and requirements. Key decisions: timeline set for 3 months, budget approved.",
    tags: ["project", "meeting", "planning"],
    createdAt: "2023-05-15T10:30:00Z",
  },
  {
    id: "memory-2",
    name: "User Persona Research",
    type: "Document",
    content: "Analysis of target user demographics and behavior patterns. Identified 3 primary user personas with different needs.",
    tags: ["research", "users", "analysis"],
    createdAt: "2023-05-20T14:45:00Z",
  },
  {
    id: "memory-3",
    name: "Design System Components",
    type: "Component",
    content: "Approved design system components including color palette, typography, and common UI elements.",
    tags: ["design", "ui", "components"],
    createdAt: "2023-05-25T09:15:00Z",
  },
  {
    id: "memory-4",
    name: "Social Media Management Workflow",
    type: "Process",
    content: "Defined content creation, approval, scheduling, and analysis workflow for social media management.",
    tags: ["workflow", "social", "process"],
    createdAt: "2023-06-02T11:20:00Z",
  }
];

// Mock relation types
const relationTypes = [
  "references",
  "is_part_of",
  "depends_on",
  "similar_to",
  "follows"
];

// Mock relations between entities
const mockRelations = [
  {
    id: "relation-1",
    source: "memory-1",
    target: "memory-3",
    type: "references"
  },
  {
    id: "relation-2",
    source: "memory-2",
    target: "memory-4",
    type: "depends_on"
  }
];

export default function MemoryManagementPage() {
  const [memoryEntities, setMemoryEntities] = useState(mockMemoryEntities);
  const [filteredEntities, setFilteredEntities] = useState(mockMemoryEntities);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEntity, setSelectedEntity] = useState<any>(null);
  const [relations, setRelations] = useState(mockRelations);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRelationModalOpen, setIsRelationModalOpen] = useState(false);
  const [newRelation, setNewRelation] = useState({
    source: "",
    target: "",
    type: "references"
  });
  const [newMemory, setNewMemory] = useState({
    name: "",
    type: "Conversation",
    content: "",
    tags: [] as string[]
  });
  const [newTag, setNewTag] = useState("");
  const { toast } = useToast();

  // Filter entities based on search term
  useEffect(() => {
    setFilteredEntities(
      memoryEntities.filter(entity => 
        entity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entity.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entity.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    );
  }, [searchTerm, memoryEntities]);

  // Get entity by ID
  const getEntityById = (id: string) => {
    return memoryEntities.find(entity => entity.id === id);
  };

  // Get related entities for the selected entity
  const getRelatedEntities = (entityId: string) => {
    const relatedRelations = relations.filter(
      relation => relation.source === entityId || relation.target === entityId
    );

    return relatedRelations.map(relation => {
      const isSource = relation.source === entityId;
      const relatedEntityId = isSource ? relation.target : relation.source;
      const relatedEntity = getEntityById(relatedEntityId);

      return {
        ...relation,
        relatedEntity,
        direction: isSource ? "outgoing" : "incoming"
      };
    });
  };

  // Handle creating a new memory entity
  const handleCreateMemory = () => {
    if (!newMemory.name.trim() || !newMemory.content.trim()) {
      toast({
        title: "Validation Error",
        description: "Name and content are required fields",
        variant: "destructive"
      });
      return;
    }

    const newEntity = {
      id: `memory-${Date.now()}`,
      name: newMemory.name,
      type: newMemory.type,
      content: newMemory.content,
      tags: newMemory.tags,
      createdAt: new Date().toISOString()
    };

    setMemoryEntities([...memoryEntities, newEntity]);
    setIsCreateModalOpen(false);
    setNewMemory({
      name: "",
      type: "Conversation",
      content: "",
      tags: []
    });

    toast({
      title: "Success",
      description: "Memory entity created successfully",
      variant: "default"
    });
  };

  // Handle updating a memory entity
  const handleUpdateMemory = () => {
    if (!selectedEntity || !selectedEntity.name.trim() || !selectedEntity.content.trim()) {
      toast({
        title: "Validation Error",
        description: "Name and content are required fields",
        variant: "destructive"
      });
      return;
    }

    setMemoryEntities(memoryEntities.map(entity => 
      entity.id === selectedEntity.id ? selectedEntity : entity
    ));
    setIsEditModalOpen(false);

    toast({
      title: "Success",
      description: "Memory entity updated successfully",
      variant: "default"
    });
  };

  // Handle deleting a memory entity
  const handleDeleteMemory = () => {
    if (!selectedEntity) return;
    
    setMemoryEntities(memoryEntities.filter(entity => entity.id !== selectedEntity.id));
    setRelations(relations.filter(relation => 
      relation.source !== selectedEntity.id && relation.target !== selectedEntity.id
    ));
    setSelectedEntity(null);

    toast({
      title: "Success",
      description: "Memory entity deleted successfully",
      variant: "default"
    });
  };

  // Handle creating a relation between entities
  const handleCreateRelation = () => {
    if (!selectedEntity || !newRelation.target || !newRelation.type) {
      toast({
        title: "Validation Error",
        description: "Please select a target entity and relation type",
        variant: "destructive"
      });
      return;
    }

    const newRelationObj = {
      id: `relation-${Date.now()}`,
      source: selectedEntity.id,
      target: newRelation.target,
      type: newRelation.type
    };

    setRelations([...relations, newRelationObj]);
    setIsRelationModalOpen(false);

    toast({
      title: "Success",
      description: "Relation created successfully",
      variant: "default"
    });
  };

  // Add a tag to new memory
  const handleAddTag = () => {
    if (!newTag.trim() || newMemory.tags.includes(newTag.trim())) return;
    setNewMemory({
      ...newMemory,
      tags: [...newMemory.tags, newTag.trim()]
    });
    setNewTag("");
  };

  // Remove a tag from new memory
  const handleRemoveTag = (tag: string) => {
    setNewMemory({
      ...newMemory,
      tags: newMemory.tags.filter(t => t !== tag)
    });
  };

  // Add a tag to selected memory
  const handleAddTagToSelected = () => {
    if (!newTag.trim() || selectedEntity.tags.includes(newTag.trim()) || !selectedEntity) return;
    setSelectedEntity({
      ...selectedEntity,
      tags: [...selectedEntity.tags, newTag.trim()]
    });
    setNewTag("");
  };

  // Remove a tag from selected memory
  const handleRemoveTagFromSelected = (tag: string) => {
    if (!selectedEntity) return;
    setSelectedEntity({
      ...selectedEntity,
      tags: selectedEntity.tags.filter((t: string) => t !== tag)
    });
  };

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Memory Management</h1>
        <Button 
          onClick={() => setIsCreateModalOpen(true)}
          data-testid="create-memory-button"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Memory
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - Memory List */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Memory Entities</CardTitle>
              <CardDescription>Browse and search stored memories</CardDescription>
              <div className="mt-2 relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search memories..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  data-testid="memory-search-input"
                />
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1.5 h-6 w-6"
                    onClick={() => setSearchTerm("")}
                    data-testid="memory-search-clear"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
                <Button 
                  className="mt-2 w-full"
                  variant="outline"
                  onClick={() => {}}
                  data-testid="memory-search-button"
                >
                  Search
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div 
                className="space-y-2 max-h-[500px] overflow-y-auto"
                data-testid="memory-list"
              >
                {filteredEntities.length > 0 ? (
                  filteredEntities.map((entity) => (
                    <div
                      key={entity.id}
                      className={`p-3 border rounded-md cursor-pointer hover:bg-muted transition-colors ${selectedEntity?.id === entity.id ? 'bg-muted' : ''}`}
                      onClick={() => setSelectedEntity(entity)}
                      data-testid="memory-list-item"
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{entity.name}</h3>
                        <Badge variant="outline">{entity.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {entity.content}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {entity.tags.map((tag: string) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="mx-auto h-8 w-8 mb-2 opacity-50" />
                    <p>No memory entities found</p>
                    {searchTerm && (
                      <p className="text-sm mt-1">Try a different search term</p>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column - Memory Details */}
        <div className="md:col-span-2">
          {selectedEntity ? (
            <div data-testid="memory-detail-view">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{selectedEntity.name}</CardTitle>
                      <CardDescription>
                        {selectedEntity.type} • Created on {new Date(selectedEntity.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditModalOpen(true)}
                        data-testid="edit-memory-button"
                      >
                        Edit
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="sm"
                            data-testid="delete-memory-button"
                          >
                            Delete
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Confirm Deletion</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete this memory entity? This action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => {}}>Cancel</Button>
                            <Button variant="destructive" onClick={handleDeleteMemory}>
                              Confirm
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="content">
                    <TabsList className="mb-4">
                      <TabsTrigger value="content">Content</TabsTrigger>
                      <TabsTrigger value="relations">Relations</TabsTrigger>
                      <TabsTrigger value="metadata">Metadata</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="content">
                      <div 
                        className="p-4 border rounded-md whitespace-pre-wrap"
                        data-testid="memory-content"
                      >
                        {selectedEntity.content}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="relations">
                      <div 
                        className="space-y-4"
                        data-testid="related-entities-section"
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Related Entities</h3>
                          <Button
                            size="sm"
                            onClick={() => setIsRelationModalOpen(true)}
                            data-testid="create-relation-button"
                          >
                            <Plus className="mr-2 h-3 w-3" />
                            Create Relation
                          </Button>
                        </div>
                        
                        {getRelatedEntities(selectedEntity.id).length > 0 ? (
                          <div className="space-y-2">
                            {getRelatedEntities(selectedEntity.id).map((relation: any) => (
                              <div key={relation.id} className="p-3 border rounded-md">
                                <div className="flex items-center gap-2">
                                  <LinkIcon className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm font-medium">
                                    {relation.direction === "outgoing" ? "→" : "←"} {relation.relatedEntity?.name}
                                  </span>
                                </div>
                                <div className="mt-1 flex justify-between">
                                  <Badge variant="outline">{relation.type}</Badge>
                                  <Button variant="ghost" size="sm" className="h-6 text-xs">
                                    View
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-6 text-muted-foreground">
                            <p>No related entities found</p>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="metadata">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium mb-2">Tags</h3>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {selectedEntity.tags.map((tag: string) => (
                              <Badge key={tag} className="flex items-center gap-1">
                                {tag}
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="h-4 w-4 p-0"
                                  onClick={() => handleRemoveTagFromSelected(tag)}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </Badge>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <Input
                              placeholder="Add tag"
                              value={newTag}
                              onChange={(e) => setNewTag(e.target.value)}
                              className="flex-1"
                            />
                            <Button onClick={handleAddTagToSelected} size="sm">Add</Button>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-medium mb-2">Created</h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date(selectedEntity.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="rounded-full bg-muted p-3 mb-4">
                  <FileText className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-1">No Memory Selected</h3>
                <p className="text-sm text-muted-foreground text-center max-w-md">
                  Select a memory entity from the list to view its details or create a new one to get started.
                </p>
                <Button
                  className="mt-4"
                  onClick={() => setIsCreateModalOpen(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Memory
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Create Memory Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Memory Entity</DialogTitle>
            <DialogDescription>
              Add a new memory entity to your knowledge base
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="memory-name">Name</Label>
              <Input
                id="memory-name"
                value={newMemory.name}
                onChange={(e) => setNewMemory({...newMemory, name: e.target.value})}
                placeholder="Enter a descriptive name"
                data-testid="memory-name-input"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="memory-type">Type</Label>
              <Select
                value={newMemory.type}
                onValueChange={(value) => setNewMemory({...newMemory, type: value})}
                data-testid="memory-type-select"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Conversation">Conversation</SelectItem>
                  <SelectItem value="Document">Document</SelectItem>
                  <SelectItem value="Component">Component</SelectItem>
                  <SelectItem value="Process">Process</SelectItem>
                  <SelectItem value="Decision">Decision</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="memory-content">Content</Label>
              <Textarea
                id="memory-content"
                value={newMemory.content}
                onChange={(e) => setNewMemory({...newMemory, content: e.target.value})}
                placeholder="Enter memory content"
                rows={6}
                data-testid="memory-content-input"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="memory-tags">Tags</Label>
              <div className="flex flex-wrap gap-2 mb-3">
                {newMemory.tags.map((tag) => (
                  <Badge key={tag} className="flex items-center gap-1">
                    {tag}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  id="memory-tags"
                  placeholder="Add tag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="flex-1"
                  data-testid="memory-tag-input"
                />
                <Button onClick={handleAddTag} size="sm" type="button">
                  Add Tag
                </Button>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateMemory} data-testid="save-memory-button">
              Create Memory
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Memory Modal */}
      {selectedEntity && (
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Memory Entity</DialogTitle>
              <DialogDescription>
                Update the content and metadata of this memory entity
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-memory-name">Name</Label>
                <Input
                  id="edit-memory-name"
                  value={selectedEntity.name}
                  onChange={(e) => setSelectedEntity({...selectedEntity, name: e.target.value})}
                  placeholder="Enter a descriptive name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-memory-type">Type</Label>
                <Select
                  value={selectedEntity.type}
                  onValueChange={(value) => setSelectedEntity({...selectedEntity, type: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Conversation">Conversation</SelectItem>
                    <SelectItem value="Document">Document</SelectItem>
                    <SelectItem value="Component">Component</SelectItem>
                    <SelectItem value="Process">Process</SelectItem>
                    <SelectItem value="Decision">Decision</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-memory-content">Content</Label>
                <Textarea
                  id="edit-memory-content"
                  value={selectedEntity.content}
                  onChange={(e) => setSelectedEntity({...selectedEntity, content: e.target.value})}
                  placeholder="Enter memory content"
                  rows={6}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateMemory} data-testid="save-memory-button">
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Create Relation Modal */}
      {selectedEntity && (
        <Dialog open={isRelationModalOpen} onOpenChange={setIsRelationModalOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create Relation</DialogTitle>
              <DialogDescription>
                Create a relationship between "{selectedEntity.name}" and another entity
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="relation-source">Source</Label>
                <Input
                  id="relation-source"
                  value={selectedEntity.name}
                  disabled
                  className="bg-muted"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="relation-target">Target</Label>
                <Select
                  value={newRelation.target}
                  onValueChange={(value) => setNewRelation({...newRelation, target: value})}
                  data-testid="relation-target-select"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select target entity" />
                  </SelectTrigger>
                  <SelectContent>
                    {memoryEntities.filter(entity => entity.id !== selectedEntity.id).map((entity) => (
                      <SelectItem key={entity.id} value={entity.id}>
                        {entity.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="relation-type">Relation Type</Label>
                <Select
                  value={newRelation.type}
                  onValueChange={(value) => setNewRelation({...newRelation, type: value})}
                  data-testid="relation-type-select"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select relation type" />
                  </SelectTrigger>
                  <SelectContent>
                    {relationTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type.replace('_', ' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsRelationModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateRelation} data-testid="save-relation-button">
                Create Relation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
} 