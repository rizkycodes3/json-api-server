const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const port = 3000;
const usersDataPath = path.join(__dirname, "data", "users.json");
const postsDataPath = path.join(__dirname, "data", "posts.json");

const readJsonFile = (filePath) => {
  try {
    return fs.readFileSync(filePath, { encoding: "utf8" });
  } catch (err) {
    console.error(`Error reading file from disk: ${err}`);
    return null;
  }
};

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  const parsedUrl = url.parse(req.url, true);
  const pathName = parsedUrl.pathname;
  const trimmedPath = pathName.replace(/^\/+|\/+$/g, "");
  const queryParams = parsedUrl.query;

  switch (trimmedPath) {
    case "users":
      const userData = JSON.parse(readJsonFile(usersDataPath));
      if (userData) {
        if (queryParams.id) {
          const userId = parseInt(queryParams.id);
          const user = userData.find((x) => x.id === userId);
          if (user) {
            res.statusCode = 200;
            res.end(JSON.stringify(user));
          } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: "User not found" }));
          }
        } else {
          res.statusCode = 200;
          res.end(JSON.stringify(userData));
        }
      } else {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: "Could not retrieve user data" }));
      }
      break;
    case "posts":
      const postData = JSON.parse(readJsonFile(postsDataPath));
      if (postData) {
        if (queryParams.id) {
          const postId = parseInt(queryParams.id);
          const post = postData.find((x) => x.id === postId);
          if (post) {
            res.statusCode = 200;
            res.end(JSON.stringify(post));
          } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: "Post not found" }));
          }
        } else {
          res.statusCode = 200;
          res.end(JSON.stringify(postData));
        }
      } else {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: "Could not retrieve post data" }));
      }
      break;
    case "status":
      const uptime = process.uptime();
      const status = {
        status: "online",
        timestamp: new Date().toISOString(),
        uptime,
        memory: process.memoryUsage(),
        cpu: process.cpuUsage(),
        node_version: process.version,
        routes: ["/users", "/posts", "/status"],
      };
      res.statusCode = 200;
      res.end(JSON.stringify(status));
      break;
    default:
      const endPoints = {
        endpoint: [
          { path: "/users", description: "Get all users or a specific user by ID", method: "GET" },
          { path: "/posts", description: "Get all posts or a specific post by ID", method: "GET" },
          { path: "/status", description: "Get server status information", method: "GET" },
        ],
      };
      res.statusCode = 200;
      res.end(JSON.stringify(endPoints));
      break;
  }
});

server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
  console.log(`available routes:`);
  console.log(`-http://localhost:${port}/users`);
  console.log(`-http://localhost:${port}/posts`);
  console.log(`-http://localhost:${port}/status`);
});
