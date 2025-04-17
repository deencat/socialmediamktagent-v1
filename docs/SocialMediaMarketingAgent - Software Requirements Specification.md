Software Requirements Specification
System Design
•	Goal: Deliver a scalable, secure, and real-time social media engagement platform for SMEs and service providers.
•	Key Features: Modular dashboard, real-time engagement/task updates, secure third-party integrations, gamified rewards, and robust analytics.
•	Separation of Concerns: 
o	Frontend: User interface, state management, and real-time updates
o	Backend: Business logic, API endpoints, data processing, and integrations
o	Database: Persistent storage, real-time sync, and analytics
________________________________________
Architecture Pattern
Pattern:
•	Frontend: Component-based SPA/MPA (React + Next.js)
•	Backend: Serverless microservices (Vercel Functions)
•	Database: Cloud-native, real-time (Supabase/Postgres)
•	API Gateway: RESTful endpoints, optional GraphQL for complex queries
•	Authentication: Clerk Auth for user/session management
•	External Integrations: Stripe, Instagram/Threads OAuth, LLM APIs
Diagram: High-Level Architecture
+-------------------+        +-------------------+        +-------------------+
|    User Devices   | <----> |   Next.js Frontend| <----> |  Vercel Functions |
| (Web/Mobile)      |        | (React, Tailwind) |        |  (API Layer)      |
+-------------------+        +-------------------+        +-------------------+
                                                           |  |  |  |  |  |  |
                                                           v  v  v  v  v  v  v
                                                      +------------------------+
                                                      |     Supabase DB        |
                                                      +------------------------+
                                                      |   Stripe, Clerk Auth   |
                                                      |   Instagram/Threads    |
                                                      |   LLM APIs             |
                                                      +------------------------+
________________________________________
State Management
•	Client-side: 
o	React Context API for global state (user, theme, notifications)
o	Zustand for complex or shared state (dashboard widgets, task feed)
•	Server-side: 
o	Supabase for persistent state and real-time sync (subscriptions)
•	UI State: 
o	Managed via React hooks and context
o	Sonner Toast for notifications and feedback
Diagram: State Management Flow
[User Action] --> [React Component] --> [Context/Zustand] --> [API Call]
      ^                                                    |
      |                                                    v
[Supabase Subscription] <--- [Backend/DB Update] <--- [API Endpoint]
________________________________________
Data Flow
•	User actions (e.g., task completion, content creation) trigger API calls to backend.
•	Backend processes, validates, and updates Supabase database.
•	Supabase pushes real-time updates to subscribed clients.
•	Frontend reflects changes instantly; notifications via Sonner Toast.
Diagram: Data Flow Example (Task Completion)
[Service Provider clicks "Complete Task"]
        |
        v
[Frontend API Call: POST /api/tasks/complete]
        |
        v
[Backend: Validate, update TaskCompletion, adjust points]
        |
        v
[Supabase: Update Task, TaskCompletion, ServiceProviderProfile]
        |
        v
[Supabase Subscription triggers UI update]
        |
        v
[Frontend: Show updated points, task status, Sonner Toast]
________________________________________
Technical Stack
•	Frontend: 
o	React, Next.js (App Router)
o	Tailwind CSS, Shadcn UI
o	Lucide Icons, Sonner Toast
•	Backend: 
o	Vercel serverless functions
o	Prisma ORM
o	Supabase (Postgres)
•	Authentication: 
o	Clerk Auth (OAuth, email, social logins)
•	Payments: 
o	Stripe
•	APIs: 
o	Instagram/Threads (OAuth)
o	Optional LLM APIs (Deepseek, OpenAI, etc.)
•	Deployment: 
o	Vercel (CI/CD, preview deployments, serverless scaling)
•	Monitoring & Logging: 
o	Vercel Analytics, Supabase logs, Sentry (optional)
________________________________________
Authentication Process
•	User Registration/Login: 
o	Handled by Clerk Auth (supports email, social logins, 2FA)
•	Role Assignment: 
o	Onboarding flow assigns role (SME, Service Provider, Admin)
•	Session Management: 
o	JWT-based, managed by Clerk
•	Social Account Linking: 
o	OAuth flow for Instagram/Threads; tokens stored securely in Supabase
•	Route Protection: 
o	Middleware checks for authentication and role-based access on all protected routes
Diagram: Auth Flow
[User] --> [Clerk Auth UI] --> [Clerk Backend] --> [JWT Issued]
      |                                         |
      v                                         v
[Frontend] <-------------------[Session/Role Info] 
      |
      v
[OAuth Flow for Social Linking] --> [Instagram/Threads] --> [Token stored in DB]
________________________________________
Route Design
•	/ – Landing/dashboard (role-based content)
•	/onboarding – Guided onboarding flow
•	/campaigns – Campaign/task management
•	/tasks – Task feed for Service Providers
•	/rewards – Points wallet and redemption
•	/analytics – Analytics and reports
•	/community – Forums/chat
•	/admin – Admin panel (user/campaign management)
•	/settings – Profile, account, and privacy settings
Route Protection Example:
•	/admin – Only accessible by users with Admin role
•	/tasks – Only accessible by Service Providers
________________________________________
API Design
•	RESTful endpoints (optionally GraphQL for complex queries) 
o	POST /api/content – Create/generate content (LLM API integration)
o	GET /api/tasks – Fetch available tasks (with filters)
o	POST /api/tasks/complete – Submit task completion (with verification)
o	GET /api/rewards – List available rewards
o	POST /api/rewards/redeem – Redeem points for rewards
o	GET /api/analytics – Fetch analytics data (role-based)
o	POST /api/auth/social-link – Link/unlink social accounts (OAuth)
o	POST /api/payments/stripe – Handle Stripe payments and webhooks
o	GET /api/admin/users – Admin user management (pagination, search)
o	GET /api/community – Fetch community posts/discussions
API Security:
•	All endpoints require JWT authentication
•	Role-based access enforced at API layer
•	Rate limiting and input validation on all endpoints
________________________________________
Database Design ERD
Text-based ERD:
[User] <1---n> [SMEProfile]
[User] <1---n> [ServiceProviderProfile]
[User] <1---n> [Payment]
[User] <1---n> [Redemption]

[SMEProfile] <1---n> [Task]
[Task] <1---n> [TaskCompletion]
[ServiceProviderProfile] <1---n> [TaskCompletion]
[ServiceProviderProfile] <1---n> [Redemption]
[Reward] <1---n> [Redemption]
[SMEProfile] <1---n> [Analytics]

Entities:
---------
User
- id (PK)
- email
- role (SME, Service Provider, Admin)
- profile data
- auth provider
- created_at

SMEProfile
- id (PK)
- user_id (FK)
- brand settings
- connected_accounts
- subscription_status

ServiceProviderProfile
- id (PK)
- user_id (FK)
- social_accounts
- quality_score
- points_balance

Task
- id (PK)
- sme_id (FK)
- type (like, comment, share, etc.)
- content_id (FK)
- reward_points
- status
- created_at

TaskCompletion
- id (PK)
- task_id (FK)
- provider_id (FK)
- completed_at
- verification_status

Reward
- id (PK)
- type (coupon, voucher, crypto, etc.)
- value
- available_quantity

Redemption
- id (PK)
- provider_id (FK)
- reward_id (FK)
- redeemed_at

Analytics
- id (PK)
- sme_id (FK)
- metrics (JSONB)
- period

Payment
- id (PK)
- user_id (FK)
- amount
- method
- status
- created_at
ERD Diagram (ASCII):
+------------------+      +---------------------+      +------------------+
|      User        |<-----|    SMEProfile       |<-----|      Task        |
+------------------+      +---------------------+      +------------------+
| id (PK)          |      | id (PK)             |      | id (PK)          |
| email            |      | user_id (FK)        |      | sme_id (FK)      |
| role             |      | ...                 |      | ...              |
+------------------+      +---------------------+      +------------------+
        ^                          ^                          |
        |                          |                          |
        |                          |                          v
        |                          |                  +----------------------+
        |                          |                  |   TaskCompletion     |
        |                          |                  +----------------------+
        |                          |                  | id (PK)              |
        |                          |                  | task_id (FK)         |
        |                          |                  | provider_id (FK)     |
        |                          |                  | ...                  |
        |                          |                  +----------------------+
        |                          |                          ^
        |                          |                          |
        |                          |                          |
        |                          |                  +----------------------+
        |                          |                  | ServiceProviderProfile|
        |                          |                  +----------------------+
        |                          |                  | id (PK)              |
        |                          |                  | user_id (FK)         |
        |                          |                  | ...                  |
        |                          |                  +----------------------+
        |                          |                          |
        |                          |                          v
        |                          |                  +----------------------+
        |                          |                  |    Redemption        |
        |                          |                  +----------------------+
        |                          |                  | id (PK)              |
        |                          |                  | provider_id (FK)     |
        |                          |                  | reward_id (FK)       |
        |                          |                  | ...                  |
        |                          |                  +----------------------+
        |                          |                          ^
        |                          |                          |
        |                          |                  +----------------------+
        |                          |                  |      Reward          |
        |                          |                  +----------------------+
        |                          |                  | id (PK)              |
        |                          |                  | ...                  |
        |                          |                  +----------------------+
        |                          |
        |                          v
        |                  +----------------------+
        |                  |     Analytics        |
        |                  +----------------------+
        |                  | id (PK)              |
        |                  | sme_id (FK)          |
        |                  | ...                  |
        |                  +----------------------+
        |
        v
+------------------+
|     Payment      |
+------------------+
| id (PK)          |
| user_id (FK)     |
| ...              |
+------------------+
________________________________________
Let me know if you need further breakdowns (e.g., microservice boundaries, deployment diagrams, or sequence diagrams for specific flows) or if you want this document in a different format!

