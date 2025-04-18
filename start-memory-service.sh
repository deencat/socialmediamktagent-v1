#!/bin/bash

# Config
MEMORY_PORT=3100
MEMORY_LOG_FILE="$HOME/memory-service.log"
MEMORY_PID_FILE="$HOME/.memory-service.pid"
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Functions
log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$MEMORY_LOG_FILE"
  echo "$1"
}

is_server_running() {
  # Check if process exists
  if [ -f "$MEMORY_PID_FILE" ]; then
    pid=$(cat "$MEMORY_PID_FILE")
    if ps -p "$pid" > /dev/null; then
      # Double-check port is actually in use by our process
      if lsof -i:$MEMORY_PORT -sTCP:LISTEN -t | grep -q "$pid"; then
        return 0 # Yes, server is running
      fi
    fi
  fi
  
  # Also check if any process is using the port
  if lsof -i:$MEMORY_PORT -sTCP:LISTEN > /dev/null; then
    # Port is in use by some process
    log "Warning: Port $MEMORY_PORT is in use by another process"
    return 0
  fi
  
  return 1 # Server is not running
}

start_server() {
  cd "$PROJECT_DIR" || exit 1
  
  log "Starting memory service..."
  
  # Start the memory stub server
  nohup node memory-stub.js > "$MEMORY_LOG_FILE" 2>&1 &
  pid=$!
  
  # Save the PID
  echo $pid > "$MEMORY_PID_FILE"
  
  # Wait a moment to ensure it starts
  sleep 2
  
  # Verify it's running
  if ps -p "$pid" > /dev/null; then
    log "Memory service started with PID: $pid"
    return 0
  else
    log "Failed to start memory service"
    return 1
  fi
}

# Main script
log "Checking memory service..."

if is_server_running; then
  log "Memory service is already running"
else
  log "Memory service is not running"
  start_server
fi

# Test connection
log "Testing memory service connection..."
curl -s http://localhost:$MEMORY_PORT > /dev/null
if [ $? -eq 0 ]; then
  log "Memory service is responding"
else
  log "Warning: Memory service is not responding"
fi 