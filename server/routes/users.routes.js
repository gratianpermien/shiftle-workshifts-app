import express from "express";

import {
  getUsers,
  findUser,
  postUser,
  updateUser,
  deleteUser,
} from "../controllers/users.controller.js";

const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:userId", findUser);
router.post("/users", postUser);
router.put("/users/:userId", updateUser);
router.delete("/users/:userId", deleteUser);

export default router;
