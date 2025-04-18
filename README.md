# Social Media Marketing Agent

AI-powered social media growth platform for Hong Kong SMEs, automating content creation, supercharging engagement, and providing actionable analytics.

## Project Overview

This platform helps SMEs grow their social media presence through:
- AI-powered content creation and scheduling
- Engagement marketplace with rewards system
- Analytics and performance insights
- Multi-platform support (Instagram, Threads, etc.)

## Development Status

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
```

### Running the Development Server

```bash
# Start the memory system first
npm run memory-stub

# In a new terminal, start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
├── app/              # Next.js App Router pages
├── components/       # React components
├── lib/              # Utility functions and hooks
├── styles/           # Global styles
├── docs/             # Project documentation
├── scripts/          # Utility scripts
│   └── memory/       # Memory system implementation
├── tests/            # Playwright tests
└── public/           # Static assets
```

## Documentation

Comprehensive documentation is available in the `docs` directory:

### Project Management

- [Product Management Plan](./docs/Product_Management_Plan.md) - Overall development approach
- [Project Management Document](./docs/Project_Management_Document.md) - Project tracking
- [Sprint Planning](./docs/Sprint_Planning.md) - Sprint schedule and tasks

### Technical Documentation

- [Project Setup Guide](./docs/Project_Setup_Guide.md) - Development environment setup
- [Component Library Plan](./docs/Component_Library_Plan.md) - UI components
- [Testing Strategy](./docs/Testing_Strategy.md) - Testing approach

## Memory System

This project includes a local memory system that maintains context between sessions:

### Memory Server

```bash
# Start the memory server
npm run memory-stub
```

The memory server runs on port 3100 and provides:
- Persistent storage of project information in memory.json
- Entity and relationship management
- Memory API for accessing stored data

### Memory System Commands

#### Service Management
```bash
# Start the memory server
npm run memory-stub

# Initialize project memory with default entities
npm run memory-init

# Check memory service health
./scripts/memory/check-memory-status.sh

# Start/restart the memory service
./scripts/memory/start-memory-service.sh
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

### Memory Architecture

The memory system consists of:
1. **Local Memory Storage** - Uses a JSON file to store entities and relations
2. **Memory Server** - Simple HTTP server that provides the memory API
3. **Client Library** - JavaScript client for interacting with the memory system

Core components:
- `memory-stub.js`: Local memory server implementation
- `memory-client.js`: Client library for accessing memory
- `memory-system.js`: Direct file-based memory system
- `memory.json`: Storage file for all memory data

## Testing

This project uses Playwright for end-to-end testing.

```bash
# Run tests
npm run test

# View test report
npm run test:report
```

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

1. Make sure to follow the design mode guidelines
2. Start the memory server before development (npm run memory-stub)
3. Create or update components as needed
4. Add tests for new features
5. Ensure all tests pass before submitting changes

## Development Approach

The project follows a prototype-first approach:

1. **Phased Development:** Breaking down the project into manageable phases
2. **Component-Based Architecture:** Building reusable UI components
3. **Comprehensive Testing:** Using Playwright for automated testing
4. **Responsive Design:** Ensuring the application works on all device sizes
5. **Documentation-Driven:** Maintaining up-to-date documentation

## License

[License information]