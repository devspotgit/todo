// src/layout.js
function layout({ title, description, data }) {
  return `   
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="description" content="${description}">
            <link rel="stylesheet" href="/main.css">
            <title>${title}</title>
        </head>
        <body>
            <div id="root"></div>
            <script>
                const __data = ${JSON.stringify(data)}
            </script>
            <script src="/main.js" type="module"></script>
        </body>
        </html>
    `;
}

// build/index.js
import express2 from "express";
import path from "path";
import { fileURLToPath } from "url";

// src/api.js
import express from "express";
var api = express.Router();
var api_default = api;

// build/index.js
import dotenv from "dotenv";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var app = express2();
dotenv.config();
app.use(express2.static(path.join(__dirname, "..", "dist", "public")));
app.use("/api", api_default);
app.use((req, res) => {
  const params = {
    title: "Todo",
    description: "My awesome todo app",
    data: { username: "Patrick" }
  };
  res.send(layout(params));
});
app.listen(process.env.PORT, () => console.log("server listening on port " + process.env.PORT));
