**Project Plan: RSS Feed Backend Service**

**Phase 0: Project Setup & Hello World**
*   **Goal:** Establish basic Node.js Express server, verify Nginx proxy, and set up initial Git and README.
*   **Tasks:**
    *   Initialize Node.js project in `backend/`.
    *   Create a basic Express app with a `/` endpoint returning "Hello World!".
    *   Configure `backend/Dockerfile` for the Node.js app.
    *   Verify `docker-compose.yml` and Nginx configuration to ensure the "Hello World!" endpoint is accessible via Nginx.
    *   Update `README.md` with project overview, setup instructions, and initial architecture (Node.js, Express, Nginx).
    *   Initial Git commit: "Feat: Initial project setup and Hello World endpoint."

**Phase 1: Database Integration (SQLite Dev, PostgreSQL Prod)**
*   **Goal:** Integrate database, set up ORM/query builder, and handle environment-specific configurations.
*   **Tasks:**
    *   Choose and integrate a database library/ORM (e.g., Knex.js, Sequelize, Prisma).
    *   Configure database connection for SQLite in development.
    *   Configure database connection for PostgreSQL in production.
    *   Implement basic database schema for RSS feed items (e.g., `id`, `title`, `description`, `media_url`, `media_type`, `pub_date`).
    *   Update `README.md` with database setup details.
    *   Git commit: "Feat: Database integration with SQLite (dev) and PostgreSQL (prod)."

**Phase 2: Media Storage & Serving**
*   **Goal:** Implement local media storage and serving capabilities.
*   **Tasks:**
    *   Create a dedicated directory for storing uploaded media files (e.g., `backend/uploads/`).
    *   Implement an endpoint for uploading media files (e.g., `/api/v1/media/upload`).
    *   Implement logic to save uploaded files to the local storage.
    *   Configure Express to serve static files from the media storage directory.
    *   Ensure Nginx is configured to proxy requests for media files to the Node.js static file server.
    *   Update `README.md` with media storage and serving details.
    *   Git commit: "Feat: Local media storage and serving implementation."

**Phase 3: RSS Feed API Endpoints**
*   **Goal:** Develop API endpoints for managing RSS feed items and generating the RSS feed.
*   **Tasks:**
    *   Implement an API endpoint to add new RSS feed items (e.g., `/api/v1/rss/items`). This endpoint will receive title, description, and uploaded media details, storing them in the database.
    *   Implement an API endpoint to retrieve all RSS feed items.
    *   Implement an endpoint (e.g., `/rss.xml`) that dynamically generates the RSS 2.0 XML feed based on the stored items, ensuring `enclosure` URLs are correctly formed using the Nginx-exposed path.
    *   Update `README.md` with API endpoint documentation.
    *   Git commit: "Feat: RSS feed item management and XML generation API."

**Phase 4: Enhancements & Refinements**
*   **Goal:** Add error handling, validation, and potentially authentication.
*   **Tasks:**
    *   Implement robust error handling for all API endpoints.
    *   Add input validation for all incoming API requests.
    *   (Optional, if desired later) Implement basic authentication for adding RSS feed items.
    *   Review and refine existing code for best practices and maintainability.
    *   Update `README.md` with any new features or important notes.
    *   Git commit: "Refactor: Error handling, validation, and code refinements."