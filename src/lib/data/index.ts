import users from './users.json';
import notifications from './notifications.json';
import dashboard from './dashboard.json';

// Utility functions to simulate API calls

// User related functions
export const getCurrentUser = () => {
  // In a real app, this would get the currently logged in user
  // For now, just return the first user
  return users.users[0];
};

export const getUserById = (id: string) => {
  return users.users.find(user => user.id === id);
};

// Notification related functions
export const getUserNotifications = (userId: string) => {
  return notifications.notifications.filter(notification => notification.userId === userId);
};

export const getUnreadNotificationsCount = (userId: string) => {
  return notifications.notifications.filter(
    notification => notification.userId === userId && !notification.read
  ).length;
};

// Dashboard related functions
export const getDashboardData = () => {
  return dashboard;
};

export const getRecentActivity = () => {
  return dashboard.recentActivity;
};

export const getQuickActions = () => {
  return dashboard.quickActions;
};

// Mock authentication functions
export const loginUser = async (email: string, password: string) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real app, this would validate credentials
  const user = users.users.find(user => user.email === email);
  
  if (!user) {
    throw new Error('Invalid email or password');
  }
  
  return user;
};

export const registerUser = async (userData: any) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real app, this would create a new user
  // For now, just return a mock user
  return {
    id: `user-${Date.now()}`,
    email: userData.email,
    name: userData.fullName || userData.companyName,
    role: userData.role,
    companyName: userData.companyName,
    avatar: '/avatars/default.png',
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString()
  };
};