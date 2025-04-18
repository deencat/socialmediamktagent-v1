import { MemoryViewer } from '@/components/memory/MemoryViewer';

export const metadata = {
  title: 'Memory System - Social Media Marketing Agent',
  description: 'View and manage entities in the memory system',
};

export default function MemoryPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Memory System Management</h1>
      <MemoryViewer />
    </div>
  );
} 