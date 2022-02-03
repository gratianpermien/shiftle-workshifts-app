import path from "path";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import adminRoutes from "./routes/admin.routes.js";
import shiftsRoutes from "./routes/shifts.routes.js";
import usersRoutes from "./routes/users.routes.js";
import mailsRoutes from "./routes/mails.routes.js";

import dotenv from "dotenv";
import nodemailer from "nodemailer";
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
server.use("/api", [adminRoutes, shiftsRoutes, usersRoutes, mailsRoutes]);
server.use(express.static(path.join(__dirname, "./client/dist")));

//Additional Routes for test and dist delivery
server.get("/test", (req, res) => {
  res.json({ message: "Hi, express server is present" });
});
server.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/dist", "index.html"));
});

//Mailing functionality test and credentials
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});
transporter.verify((err, success) => {
  err
    ? console.log(err)
    : console.log(`Server is ready to take messages: ${success}`);
});

server.listen(serverPort, () =>
  console.log(`Server running on port ${serverPort}`)
);
