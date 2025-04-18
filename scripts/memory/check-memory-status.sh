#!/bin/bash

# ANSI color codes for pretty output
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}=======================================${NC}"
echo -e "${CYAN}     Memory System Status Check        ${NC}"
echo -e "${CYAN}=======================================${NC}"

# Step 1: Ensure memory server is running
echo -e "\n${BLUE}Step 1: Checking memory server${NC}"
npm run memory-ensure

# Exit if memory server check failed
if [ $? -ne 0 ]; then
  echo -e "${RED}Memory server check failed. Exiting.${NC}"
  exit 1
fi

# Step 2: Get latest memory entity
echo -e "\n${BLUE}Step 2: Retrieving latest memory entry${NC}"
npm run memory-get-latest

# Step 3: Show number of entities in memory
echo -e "\n${BLUE}Step 3: Running memory verification${NC}"

# Run verify script with limited output
node scripts/memory/verify-memory-system.js | grep -E "Retrieved|entities|relations"

echo -e "\n${CYAN}=======================================${NC}"
echo -e "${GREEN}Memory system is ready for use${NC}"
echo -e "${CYAN}=======================================${NC}"

echo -e "\n${YELLOW}Remember to add new information to memory:${NC}"
echo -e "${YELLOW}npm run memory-add-conversation -- \"Title\" \"Details\"${NC}" 