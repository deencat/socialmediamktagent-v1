#!/usr/bin/env node

/**
 * This script ensures the memory server is running
 * It checks if there's something listening on port 3100
 * If not, it starts the memory server
 */

const { execSync, spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// ANSI color codes for pretty output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m'
};

// Check if memory server is running
function isMemoryServerRunning() {
  try {
    // Check if anything is listening on port 3100
    const result = execSync('lsof -i :3100').toString();
    return result.includes('LISTEN');
  } catch (error) {
    // If lsof command fails or returns empty, the port is free
    return false;
  }
}

// Start memory server
function startMemoryServer() {
  console.log(`${colors.yellow}Starting memory server...${colors.reset}`);
  
  try {
    // Start the memory stub server as a detached process
    const serverProcess = spawn('node', ['scripts/memory/memory-stub.js'], {
      detached: true,
      stdio: 'ignore'
    });
    
    // Unref the child process so parent can exit independently
    serverProcess.unref();
    
    // Wait a moment for the server to start
    execSync('sleep 2');
    
    // Verify server is now running
    if (isMemoryServerRunning()) {
      console.log(`${colors.green}Memory server started successfully${colors.reset}`);
      console.log(`${colors.blue}Running at http://localhost:3100${colors.reset}`);
      return true;
    } else {
      console.log(`${colors.red}Failed to start memory server${colors.reset}`);
      return false;
    }
  } catch (error) {
    console.error(`${colors.red}Error starting memory server:${colors.reset}`, error.message);
    return false;
  }
}

// Main function
function ensureMemoryServerRunning() {
  console.log(`${colors.blue}Checking memory server status...${colors.reset}`);
  
  if (isMemoryServerRunning()) {
    console.log(`${colors.green}Memory server is already running on port 3100${colors.reset}`);
    return true;
  } else {
    return startMemoryServer();
  }
}

// Run the check
const isRunning = ensureMemoryServerRunning();

// Exit with appropriate code
process.exit(isRunning ? 0 : 1); 