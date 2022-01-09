import { dirname } from "./lib/pathHelpers.js";
import path from "path";
import express from "express";
import cors from "cors";

const __dirname = dirname(import.meta.url);

const server = express();
const port = process.env.PORT || 4000;

server.use(cors());
server.use(express.json());

server.get("/api", (req, res) => {
  res.json({ message: "Hi, express server is present" });
});

server.use(express.static(path.join(__dirname, "../client/dist/")));

server.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/dist/", "index.html"));
});

server.listen(port, () => console.log(`Server running on port ${port}`));
