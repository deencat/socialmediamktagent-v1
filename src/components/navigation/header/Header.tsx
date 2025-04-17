import UserMenu from './UserMenu';
import NotificationCenter from './NotificationCenter';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm py-2 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Social Media Marketing Agent</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <NotificationCenter />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}