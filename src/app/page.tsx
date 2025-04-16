import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4 text-center">
      <h1 className="text-4xl font-bold mb-6">Social Media Marketing Agent</h1>
      <p className="text-xl mb-8 max-w-2xl">
        AI-powered social media growth platform for Hong Kong SMEs, automating content creation, 
        supercharging engagement, and providing actionable analytics.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          href="/login" 
          className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-600 transition-colors"
        >
          Login
        </Link>
        <Link 
          href="/register" 
          className="px-6 py-3 bg-white border border-primary text-primary rounded-md hover:bg-gray-50 transition-colors"
        >
          Register
        </Link>
      </div>
    </div>
  );
}