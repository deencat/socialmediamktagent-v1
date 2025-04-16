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

## License

[License information]