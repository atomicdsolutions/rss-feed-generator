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

## Media Storage & Serving (Phase 2: Media Storage & Serving)

Media files (videos and photos) are stored locally within the `backend/uploads/` directory. The Node.js Express server is configured to serve these files statically, and Nginx proxies requests to make them accessible via the internet.

### Media Upload Endpoint

To upload media, send a `POST` request to `/api/v1/media/upload` with a `multipart/form-data` body containing the file under the field name `media`.

**Example using `curl`:**

```bash
curl -X POST -F "media=@/path/to/your/file.jpg" http://localhost/api/v1/media/upload
```

The response will include the `url` and `media_id` for the uploaded media. The `media_id` should be used when creating an RSS item.

## RSS Feed API Endpoints (Phase 3: RSS Feed API Endpoints)

This phase introduces API endpoints for managing RSS feed items and generating the RSS 2.0 XML feed.

### Add RSS Item

- **Endpoint:** `POST /api/v1/rss/items`
- **Description:** Adds a new RSS feed item by linking to an already uploaded media file.
- **Request Body (JSON):**
  ```json
  {
    "media_id": 1, 
    "title": "My Awesome New Content",
    "caption": "This is a description of my awesome new content."
  }
  ```
- **Example using `curl`:**
  ```bash
  curl -X POST -H "Content-Type: application/json" \
       -d '{"media_id": 1, "title": "My New Video", "caption": "This is a test video."}' \
       http://localhost/api/v1/rss/items
  ```

### Get All RSS Items

- **Endpoint:** `GET /api/v1/rss/items`
- **Description:** Retrieves all RSS feed items from the database.
- **Example using `curl`:**
  ```bash
  curl http://localhost/api/v1/rss/items
  ```

### Generate RSS 2.0 Feed

- **Endpoint:** `GET /api/v1/rss/feed.xml`
- **Description:** Generates and serves the RSS 2.0 XML feed based on the items in the database.
- **Example:** Open your web browser and navigate to `http://localhost/api/v1/rss/feed.xml`.


## Enhancements & Refinements (Phase 4: Enhancements & Refinements)

This phase focuses on improving the robustness of the API with comprehensive error handling and input validation.

### Error Handling

Global error handling middleware is implemented to catch and process errors consistently across the application, providing meaningful error responses.

### Input Validation

API endpoints, particularly for adding RSS items, now include input validation using `express-validator` to ensure data integrity and provide clear feedback on invalid inputs.

## Project Plan

Refer to `plan.md` for the detailed development roadmap.
