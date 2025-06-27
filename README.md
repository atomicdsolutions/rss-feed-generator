# PEAS Stack Media RSS Feed Generator

A modern SaaS application for generating Media RSS feeds from various sources, with AI-powered content generation and workflow management.

## Tech Stack

- **P**ostgreSQL (via Supabase) - Database & Authentication
- **E**xpress.js - Backend API
- **A**ngular - Frontend Framework
- **S**upabase - Backend as a Service

## Features

- Media file management with Google Drive integration
- AI-powered caption and image generation
- RSS 2.0 feed generation
- Content approval workflow
- User tier management (Basic/Premium)
- n8n integration support

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm or yarn
- Supabase account
- Google Cloud Platform account (for OAuth and Drive API)
- OpenAI API key (for AI features)

### Installation

1. Clone the repository
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

### Configuration

1. Copy `.env.example` to `.env` in both backend and frontend directories
2. Configure environment variables:
   - Supabase credentials
   - Google OAuth credentials
   - AI service API keys
   - JWT secrets

### Development

1. Start backend server:
   ```bash
   cd backend
   npm run dev
   ```
2. Start frontend development server:
   ```bash
   cd frontend
   npm start
   ```

## Project Structure

```
.
├── backend/              # Express.js backend
├── frontend/             # Angular frontend
├── shared/               # Shared types and utilities
├── docs/                # Documentation
├── scripts/             # Utility scripts
└── infrastructure/      # Infrastructure configuration
```

## Documentation

- [API Documentation](./docs/api/README.md)
- [Development Guide](./docs/development/README.md)
- [Deployment Guide](./docs/deployment/README.md)
- [User Guide](./docs/user/README.md)

## License

[MIT License](LICENSE)