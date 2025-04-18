import { redirect } from 'next/navigation';

export default function MemoryPage() {
  redirect('/memory/management');
  return null;
} 