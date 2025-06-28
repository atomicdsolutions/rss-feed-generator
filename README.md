# RSS Feed Generator Backend

This project aims to create a robust RSS feed server with API endpoints for managing and serving RSS feed items, including video and photo content.

## Architecture

The backend is built with Node.js and Express. All media content will be stored locally on the host and served directly by the Node.js application. Nginx acts as a reverse proxy, exposing the backend services and media files to the internet while providing an additional layer of protection.

- **Backend:** Node.js (Express)
- **Database:** SQLite (development), PostgreSQL (production)
- **Proxy:** Nginx

## Getting Started (Phase 0: Project Setup & Hello World)

To get the basic "Hello World" server up and running, follow these steps:

1.  **Navigate to the project root:**
    ```bash
    cd /Users/peugebenjamin/Library/CloudStorage/SynologyDrive-mydrive/Projects/Rss 6.0/
    ```

2.  **Build and run the Docker containers:**
    ```bash
    docker-compose up --build
    ```

3.  **Verify the "Hello World" endpoint:**
    Open your web browser and navigate to `http://localhost/`.
    You should see the message "Hello World from Backend!".

## Database Setup (Phase 1: Database Integration)

This project uses Knex.js for database migrations. SQLite is used for development, and PostgreSQL for production.

### Running Migrations

To apply database migrations (e.g., create tables), navigate to the `backend` directory and run:

```bash
npx knex migrate:latest
```

## Project Plan

Refer to `plan.md` for the detailed development roadmap.
