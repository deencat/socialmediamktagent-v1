"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getCurrentUser } from '@/lib/data';

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const user = getCurrentUser();

  // Close the menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none"
        data-testid="user-menu-button"
      >
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          {user.avatar ? (
            <Image src={user.avatar} alt={user.name} width={32} height={32} className="w-full h-full object-cover" />
          ) : (
            <span className="text-sm font-medium text-gray-600">
              {user.name.charAt(0)}
            </span>
          )}
        </div>
        <span className="hidden md:inline text-sm font-medium">{user.name}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10" data-testid="user-menu-dropdown">
          <div className="px-4 py-2 border-b">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
          
          <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Profile
          </Link>
          
          <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Settings
          </Link>
          
          {user.role === 'sme' && (
            <Link href="/billing" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Billing
            </Link>
          )}
          
          <Link href="/help" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Help & Support
          </Link>
          
          <div className="border-t">
            <Link href="/login" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
              Sign out
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}