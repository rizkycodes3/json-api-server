# Json Api Server

A simple JSON API server built with **Node.js** using its built-in `http`, `fs`, `path`, and `url` modules. The server reads user and post data from local JSON files and exposes endpoints to retrieve those records and inspect server status.

## Features

- **Users endpoint** — retrieve all users or a specific user by ID.
- **Posts endpoint** — retrieve all posts or a specific post by ID.
- **Status endpoint** — view server status, uptime, memory usage, CPU usage, and Node.js version.
- **JSON responses** — responses are sent with the `application/json` content type.
- **Endpoint overview** — the root route returns a list of the available endpoints.

## Tech Stack

- [Node.js](https://nodejs.org/) — JavaScript runtime.
- Built-in Node.js modules:
  - `http` — creates the HTTP server.
  - `fs` — reads local JSON data files.
  - `path` — builds file paths.
  - `url` — parses request URLs and query parameters.

## Project Structure

```text
project-root/
├── server.js
└── data/
    ├── users.json
    └── posts.json
```

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- The `data/users.json` and `data/posts.json` files created and populated with valid JSON data.

### Run the server

1. Clone or download this project.
2. Ensure the expected `data/` directory and JSON files exist.
3. Open a terminal in the project directory.
4. Start the server:

   ```bash
   node server.js
   ```

5. The server listens on port **3000** by default.

When it starts, the terminal prints the local server address and the main routes.

## API Endpoints

All endpoints use the `GET` method and return JSON.

| Method | Endpoint      | Description                                     |
| ------ | ------------- | ----------------------------------------------- |
| `GET`  | `/`           | Returns an overview of the available endpoints. |
| `GET`  | `/users`      | Returns all users.                              |
| `GET`  | `/users?id=1` | Returns the user whose `id` is `1`.             |
| `GET`  | `/posts`      | Returns all posts.                              |
| `GET`  | `/posts?id=1` | Returns the post whose `id` is `1`.             |
| `GET`  | `/status`     | Returns server status and runtime metrics.      |

Replace `1` in the query examples with an ID present in your JSON data.

### Example requests

You can test the API using a browser, `curl`, or an API client such as Postman.

```bash
curl http://localhost:3000/
curl http://localhost:3000/users
curl "http://localhost:3000/users?id=1"
curl http://localhost:3000/posts
curl "http://localhost:3000/posts?id=1"
curl http://localhost:3000/status
```

### Example response: `GET /status`

The response includes fields similar to the following. The actual uptime and resource metrics vary while the server runs.

```json
{
  "status": "online",
  "timestamp": "2026-01-01T00:00:00.000Z",
  "uptime": 12.34,
  "memory": {},
  "cpu": {},
  "node_version": "v22.x.x",
  "routes": ["/users", "/posts", "/status"]
}
```

The `memory` and `cpu` objects contain the values returned by Node.js. This is an illustrative response shape, not a live response.

## HTTP Status Codes

The current implementation uses these status codes:

- `200 OK` — successful response, including the endpoint overview.
- `404 Not Found` — the requested user or post ID does not exist.
- `500 Internal Server Error` — intended for data-retrieval failures.

## How It Works

1. The server creates an HTTP server with Node.js's built-in `http` module.
2. It parses the request URL and extracts the route and query parameters.
3. For `/users` and `/posts`, it reads the corresponding local JSON file and optionally searches for a record by `id`.
4. For `/status`, it collects runtime information from the Node.js `process` object.
5. It serializes the result to JSON and sends it as the HTTP response.

## Current Scope and Limitations

- This is a small, file-backed API server; it does not use a database.
- The provided implementation supports `GET` requests only.
- It does not currently implement create, update, or delete operations.
- The port is hard-coded to `3000`.
- The server does not include authentication or authorization.
- The implementation assumes the JSON files exist and contain valid JSON.

## Possible Improvements

- Add explicit handling for missing files and invalid JSON.
- Validate query parameter IDs and return a `400 Bad Request` response for invalid values.
- Add a `404 Not Found` response for unknown routes.
- Support a configurable port through an environment variable.
- Add automated tests for endpoints and error cases.
- Add request-method validation and structured error responses.
