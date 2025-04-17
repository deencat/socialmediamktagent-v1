# Context Loader Guide

## Purpose
This document provides instructions for loading context at the beginning of new chat sessions to maintain continuity despite token limitations.

## How to Use

When starting a new chat session, use one of these approaches:

### Basic Context Loading

Provide this prompt:

```
Please review the project context by checking:
1. docs/memory/ChatSessionSummary.md
2. docs/Product_Management_Plan.md
3. docs/Sprint_Planning.md

Then continue our work on [specific task].
```

### Detailed Context Loading

For more specific context, use:

```
Please load the following context:
1. Review docs/memory/ChatSessionSummary.md for our latest status
2. Check [specific file path] for details on [specific component/feature]
3. Continue our work on implementing [specific feature]
```

## Implementing a Memory Continuity Protocol (MCP) Server

For a more automated solution, consider implementing a simple MCP server:

1. **Technology Options:**
   - Node.js with Express
   - Python with Flask
   - Any lightweight server technology

2. **Core Features:**
   - API endpoint to store session summaries
   - API endpoint to retrieve relevant context
   - Simple database or file-based storage
   - Optional: Context relevance scoring

3. **Integration:**
   - At the end of each productive session, send a summary to the server
   - At the beginning of each new session, fetch relevant context
   - Implement as a simple REST API

4. **Example Implementation:**
   ```javascript
   // Simple Express.js MCP server
   const express = require('express');
   const bodyParser = require('body-parser');
   const fs = require('fs');
   const app = express();
   
   app.use(bodyParser.json());
   
   // Store context
   app.post('/context', (req, res) => {
     const { summary, projectState, decisions } = req.body;
     // Store in database or file
     fs.writeFileSync('context.json', JSON.stringify(req.body));
     res.send({ success: true });
   });
   
   // Retrieve context
   app.get('/context', (req, res) => {
     const context = JSON.parse(fs.readFileSync('context.json'));
     res.send(context);
   });
   
   app.listen(3001, () => {
     console.log('MCP Server running on port 3001');
   });
   ```

5. **Usage:**
   - Implement a simple client to interact with this server
   - Integrate with your chat interface
   - Use the stored context to prime new chat sessions