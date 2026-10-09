const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const booksFilePath = path.join(__dirname, "books.json");
const booksRoute = "/api/books";
const port = 3000;

const server = http.createServer((request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const requestUrl = new URL(request.url, "http://localhost:3000");

  if (requestUrl.pathname === booksRoute && request.method === "OPTIONS") {
    response.writeHead(204);
    response.end();
    return;
  }

  if (requestUrl.pathname !== booksRoute || request.method !== "GET") {
    response.writeHead(404, {
      "Content-Type": "application/json; charset=utf-8",
    });
    response.end(JSON.stringify({ error: "Маршрут або метод не знайдено." }));
    return;
  }

  fs.readFile(booksFilePath, "utf8", (error, data) => {
    if (error) {
      response.writeHead(500, {
        "Content-Type": "application/json; charset=utf-8",
      });
      response.end(
        JSON.stringify({ error: "Не вдалося прочитати файл із книжками." }),
      );
      return;
    }

    try {
      JSON.parse(data);
    } catch {
      response.writeHead(500, {
        "Content-Type": "application/json; charset=utf-8",
      });
      response.end(
        JSON.stringify({ error: "Файл із книжками містить некоректний JSON." }),
      );
      return;
    }

    response.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8",
    });
    response.end(data);
  });
});

server.listen(port, () => {
  console.log(`Books API server is listening at http://localhost:${port}`);
});
