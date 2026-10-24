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
    console.error("Failed to read the file", err);
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
            res.StatusCode = 200;
            res.end(JSON.stringify(user));
          } else {
            res.StatusCode = 404;
            res.end(JSON.stringify({ error: "User not found" }));
          }
        } else {
          res.StatusCode = 200;
          res.end(JSON.stringify(userData));
        }
      } else {
        res.StatusCode = 500;
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
            res.StatusCode = 200;
            res.end(JSON.stringify(post));
          } else {
            res.StatusCode = 404;
            res.end(JSON.stringify({ error: "Post not found" }));
          }
        } else {
          res.StatusCode = 200;
          res.end(JSON.stringify(postData));
        }
      } else {
        res.StatusCode = 500;
        res.end(JSON.stringify({ error: "Could not retrieve post data" }));
      }
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
