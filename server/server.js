import path from "path";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import {
  getAdminData,
  updateAdminData,
} from "./controllers/admin.controller.js";
import {
  getShifts,
  findShift,
  postShift,
  updateShift,
  deleteShift,
} from "./controllers/shifts.controller.js";
import {
  getUsers,
  findUser,
  postUser,
  updateUser,
  deleteUser,
} from "./controllers/users.controller.js";
import dotenv from "dotenv";
dotenv.config();

const __dirname = process.cwd();
const serverPort = process.env.PORT || 4000;

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;

const connectionString = `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`;
mongoose.connect(connectionString);

const server = express();
server.use(cors());
server.use(express.json());
server.use(express.static(path.join(__dirname, "./client/dist")));

//Routes: Admin Interactions
server.get("/admin", getAdminData);
server.put("/admin/:adminDataId", updateAdminData);

//Routes: Shift Interactions
server.get("/shifts", getShifts);
server.get("/shifts/:shiftId", findShift);
server.post("/shifts", postShift);
server.put("/shifts/:shiftId", updateShift);
server.delete("/shifts/:shiftId", deleteShift);

//Routes: User Interactions
server.get("/users", getUsers);
server.get("/users/:userId", findUser);
server.post("/users", postUser);
server.put("/users/:userId", updateUser);
server.delete("/users/:userId", deleteUser);

//Routes: Test und Auslieferung dist
server.get("/test", (req, res) => {
  res.json({ message: "Hi, express server is present" });
});
server.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/dist", "index.html"));
});

server.listen(serverPort, () =>
  console.log(`Server running on port ${serverPort}`)
);
