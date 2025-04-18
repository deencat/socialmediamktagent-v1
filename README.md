# Social Media Marketing Agent

AI-powered social media growth platform for Hong Kong SMEs, automating content creation, supercharging engagement, and providing actionable analytics.

## Project Overview

This platform helps SMEs grow their social media presence through:
- AI-powered content creation and scheduling
- Engagement marketplace with rewards system
- Analytics and performance insights
- Multi-platform support (Instagram, Threads, etc.)

## Development Mode

Currently, this project is in **prototyping mode**:
- Frontend-only development with mocked data
- No backend connections
- Focus on UI/UX and user flows

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone [repository-url]

# Navigate to the project directory
cd social-media-marketing-agent

# Install dependencies
npm install
# or
yarn install
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Testing

This project uses Playwright for end-to-end testing.

```bash
# Run tests
npm run test
# or
yarn test

# View test report
npm run test:report
# or
yarn test:report
```

## Project Structure

```
├── src/
│   ├── app/             # Next.js App Router pages
│   ├── components/      # React components
│   ├── lib/             # Utility functions and hooks
│   └── styles/          # Global styles
├── tests/               # Playwright tests
└── public/              # Static assets
```

## Chat Session Memory Management

To maintain context across chat sessions with token limitations:

1. Review `docs/memory/ChatSessionSummary.md` at the start of each new session
2. Follow the guidance in `docs/memory/ContextLoader.md` for loading context
3. Update the session summary at the end of productive sessions

## Memory System

This project includes a memory system that maintains context between sessions:

### Memory Server

```bash
# Start the memory server manually
npm run memory-stub
```

The memory server runs on port 3100 and provides:
- Persistent storage of project information
- Entity and relationship management
- Memory API for accessing stored data

### Memory System Commands

This project provides several commands to manage the memory system:

#### Service Management
```bash
# Start the memory server
npm run memory-stub

# Initialize project memory with default entities
npm run memory-init

# Check memory service health
./check-memory-status.sh

# Start/restart the memory service
./start-memory-service.sh
```

#### Memory Operations
```bash
# Show latest memory entity details
npm run memory-get-latest

# Add a new conversation entry to memory
npm run memory-add-conversation

# Delete the most recent memory entity
npm run memory-remove

# Run example script demonstrating memory usage
npm run memory-example
```

All memory entries are stored in `memory.json` in the project root directory.

### Auto-Start Configuration

The memory server is configured to start automatically when you log in:
- Uses macOS LaunchAgent to run on startup
- Auto-checks every 2 hours to ensure the service is running
- See `MEMORY-AUTOSTART.md` for details and troubleshooting

### Memory Management UI

A web interface for managing memory entities is available at:
- [http://localhost:3000/memory](http://localhost:3000/memory)

## User Roles

- **SME Admin**: Business owners looking to grow their social media presence
- **Service Provider**: Users who engage with SME content to earn rewards
- **Platform Admin**: Manages the platform, users, and system health

## Demo Credentials

For testing purposes, you can use these credentials:

- **SME User**:
  - Email: sme@example.com
  - Password: password

- **Service Provider**:
  - Email: provider@example.com
  - Password: password

## Contributing

1. Make sure to follow the design mode guidelines in `Design Mode.md`
2. Create or update components as needed
3. Add tests for new features
4. Ensure all tests pass before submitting changes
5. Update the session summary in `docs/memory/ChatSessionSummary.md` after significant changes

## License

[License information]