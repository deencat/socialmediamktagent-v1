#!/bin/bash

# ANSI color codes for colored output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[0;33m'
BOLD='\033[1m'
NC='\033[0m' # No Color

MEMORY_PORT=3100
SESSION_SUMMARY_FILE="docs/memory/ChatSessionSummary.md"
DESIGN_MODE_FILE=".cursor/notepad/Design Mode.md"
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")

# First check if memory service is running
echo -e "${BOLD}Session Context Preservation${NC}"
echo "============================="

# Check memory service
curl -s http://localhost:$MEMORY_PORT > /dev/null
if [ $? -ne 0 ]; then
    echo -e "${YELLOW}Memory service not responding. Starting it now...${NC}"
    ./start-memory-service.sh > /dev/null
    sleep 2
fi

# Show preservation prompt to copy
echo -e "\n${BOLD}Copy the following prompt to Claude before ending your session:${NC}\n"

cat <<EOF
${BLUE}Before we finish today's session, please:

1. Summarize what we've accomplished in this conversation
2. Note any key decisions, challenges solved, or open questions
3. Create memory entries for any new components/features we've discussed
4. Save the most important context from our discussion

I'm concerned we might be approaching token limits, so please prioritize saving our most important work.${NC}
EOF

# Update the session summary file with entry template
echo -e "\n${BOLD}Updating the session summary file with a new entry template...${NC}"

if [ -f "$SESSION_SUMMARY_FILE" ]; then
    cat <<EOF >> "$SESSION_SUMMARY_FILE"

## Session: $TIMESTAMP

### Key Accomplishments
- 

### Features/Components Discussed
- 

### Decisions Made
- 

### Open Questions/Tasks
- 

EOF
    echo -e "${GREEN}✓ Added new entry template to $SESSION_SUMMARY_FILE${NC}"
    echo -e "${YELLOW}Remember to complete this template with Claude's summary${NC}"
else
    echo -e "${YELLOW}Session summary file not found at $SESSION_SUMMARY_FILE${NC}"
    echo -e "Would you like to create this file? (y/n)"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        mkdir -p $(dirname "$SESSION_SUMMARY_FILE")
        cat <<EOF > "$SESSION_SUMMARY_FILE"
# Chat Session Summary

This document provides a summary of key information from chat sessions to maintain context across token limits.

## Session: $TIMESTAMP

### Key Accomplishments
- 

### Features/Components Discussed
- 

### Decisions Made
- 

### Open Questions/Tasks
- 

EOF
        echo -e "${GREEN}✓ Created session summary file at $SESSION_SUMMARY_FILE${NC}"
    fi
fi

# Add prompt to Design Mode notepad if it exists
if [ -f "$DESIGN_MODE_FILE" ]; then
    echo -e "\n${BOLD}Adding context preservation reminder to Design Mode notepad...${NC}"
    
    # Check if the reminder already exists
    if ! grep -q "CONTEXT PRESERVATION REMINDER" "$DESIGN_MODE_FILE"; then
        cat <<EOF >> "$DESIGN_MODE_FILE"

### CONTEXT PRESERVATION REMINDER
When approaching token limits, copy and paste this to Claude:
\`\`\`
Before we finish today's session, please:
1. Summarize what we've accomplished in this conversation
2. Note any key decisions, challenges solved, or open questions
3. Create memory entries for any new components/features we've discussed
4. Save the most important context from our discussion
\`\`\`
EOF
        echo -e "${GREEN}✓ Added reminder to Design Mode notepad${NC}"
    else
        echo -e "${YELLOW}Reminder already exists in Design Mode notepad${NC}"
    fi
fi

# Remind about the memory viewer UI
echo -e "\n${BOLD}Memory Viewer Available${NC}"
echo "You can also review and manage memory entries at: http://localhost:3000/memory"

# Offer to check token indicators
echo -e "\n${BOLD}Token Usage Indicators${NC}"
echo "To check for signs of approaching token limits:"
echo "1. Watch for slower response times from Claude"
echo "2. Notice if Claude starts summarizing or truncating responses"
echo "3. See if Claude mentions memory constraints"
echo "4. Check if responses become less contextually aware of earlier discussion"

echo -e "\n${BOLD}Project Management Update Reminder${NC}"
echo "Don't forget to update the Project Management Document with today's progress!"

echo -e "\n${GREEN}You're all set for context preservation!${NC}" 