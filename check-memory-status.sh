#!/bin/bash

# ANSI color codes for colored output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Configuration
MEMORY_PORT=3100
MEMORY_PID_FILE="$HOME/.memory-service.pid"
API_ENDPOINT="/mcp/memory/entities"

echo -e "${BOLD}Memory Service Status Check${NC}"
echo "=============================="
echo ""

# Check 1: Check if PID file exists
echo -e "${BLUE}1. Checking PID file${NC}"
if [ -f "$MEMORY_PID_FILE" ]; then
  pid=$(cat "$MEMORY_PID_FILE")
  echo -e "   PID file found: ${GREEN}✓${NC} (PID: $pid)"
else
  echo -e "   PID file not found: ${RED}✗${NC}"
fi
echo ""

# Check 2: Check if process is running
echo -e "${BLUE}2. Checking process status${NC}"
memory_process=$(ps aux | grep "memory-stub" | grep -v grep)
if [ -n "$memory_process" ]; then
  pid=$(echo "$memory_process" | awk '{print $2}')
  echo -e "   Memory process running: ${GREEN}✓${NC} (PID: $pid)"
  
  # Check CPU and memory usage
  cpu=$(ps -p $pid -o %cpu | tail -n 1 | tr -d ' ')
  mem=$(ps -p $pid -o %mem | tail -n 1 | tr -d ' ')
  runtime=$(ps -p $pid -o etime | tail -n 1 | tr -d ' ')
  echo "   CPU usage: $cpu%"
  echo "   Memory usage: $mem%"
  echo "   Running time: $runtime"
else
  echo -e "   Memory process not running: ${RED}✗${NC}"
fi
echo ""

# Check 3: Check if port is in use
echo -e "${BLUE}3. Checking port $MEMORY_PORT${NC}"
port_check=$(lsof -i :$MEMORY_PORT -sTCP:LISTEN)
if [ -n "$port_check" ]; then
  pid=$(echo "$port_check" | tail -n 1 | awk '{print $2}')
  echo -e "   Port $MEMORY_PORT is active: ${GREEN}✓${NC} (PID: $pid)"
else
  echo -e "   Port $MEMORY_PORT is not active: ${RED}✗${NC}"
fi
echo ""

# Check 4: Test HTTP connection
echo -e "${BLUE}4. Testing HTTP connection${NC}"
http_response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:$MEMORY_PORT)
if [ "$http_response" = "200" ]; then
  echo -e "   HTTP connection successful: ${GREEN}✓${NC} (Status: $http_response)"
  
  # Get server message
  server_message=$(curl -s http://localhost:$MEMORY_PORT)
  echo "   Server message: $server_message"
else
  echo -e "   HTTP connection failed: ${RED}✗${NC} (Status: $http_response)"
fi
echo ""

# Check 5: Test API endpoint
echo -e "${BLUE}5. Testing API endpoint${NC}"
api_response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:$MEMORY_PORT$API_ENDPOINT)
if [ "$api_response" = "200" ]; then
  echo -e "   API endpoint accessible: ${GREEN}✓${NC} (Status: $api_response)"
  
  # Count entities
  entities_json=$(curl -s http://localhost:$MEMORY_PORT$API_ENDPOINT)
  entity_count=$(echo "$entities_json" | grep -o '"name"' | wc -l | tr -d ' ')
  echo "   Entity count: $entity_count"
  
  # List first few entities
  if [ "$entity_count" -gt 0 ]; then
    echo "   Entity names (up to 5):"
    entities=$(echo "$entities_json" | grep -o '"name":"[^"]*"' | cut -d':' -f2 | tr -d '"' | head -n 5)
    while IFS= read -r entity; do
      echo "     - $entity"
    done <<< "$entities"
  fi
else
  echo -e "   API endpoint not accessible: ${RED}✗${NC} (Status: $api_response)"
fi
echo ""

# Check 6: Check LaunchAgent status
echo -e "${BLUE}6. Checking LaunchAgent status${NC}"
launchctl_status=$(launchctl list | grep "com.cursor.memory-service")
if [ -n "$launchctl_status" ]; then
  echo -e "   LaunchAgent loaded: ${GREEN}✓${NC}"
  echo "   Status: $launchctl_status"
else
  echo -e "   LaunchAgent not loaded: ${RED}✗${NC}"
fi
echo ""

# Check 7: Check logs
echo -e "${BLUE}7. Recent log entries${NC}"
if [ -f "$HOME/memory-service.log" ]; then
  echo -e "   Log file exists: ${GREEN}✓${NC}"
  echo "   Recent entries:"
  tail -n 5 "$HOME/memory-service.log" | while IFS= read -r line; do
    echo "     $line"
  done
else
  echo -e "   Log file not found: ${RED}✗${NC}"
fi
echo ""

# Summary
echo -e "${BOLD}Summary${NC}"
echo "========"

# Count successful checks
success_count=0
total_checks=6  # Not counting logs

[ -f "$MEMORY_PID_FILE" ] && ((success_count++))
[ -n "$memory_process" ] && ((success_count++))
[ -n "$port_check" ] && ((success_count++))
[ "$http_response" = "200" ] && ((success_count++))
[ "$api_response" = "200" ] && ((success_count++))
[ -n "$launchctl_status" ] && ((success_count++))

# Calculate health percentage
health_percent=$((success_count * 100 / total_checks))

# Display health status
if [ $health_percent -eq 100 ]; then
  echo -e "${GREEN}Memory service is healthy (100%)${NC}"
  echo "Web interface available at: http://localhost:3000/memory"
elif [ $health_percent -ge 60 ]; then
  echo -e "${YELLOW}Memory service is partially healthy ($health_percent%)${NC}"
  echo "Consider restarting with: ./start-memory-service.sh"
else
  echo -e "${RED}Memory service is unhealthy ($health_percent%)${NC}"
  echo "Please restart with: ./start-memory-service.sh"
fi 