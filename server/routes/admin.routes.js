import express from "express";

import {
  getAdminData,
  updateAdminData,
} from "../controllers/admin.controller.js"

const router = express.Router();

router.get("/admin", getAdminData);
router.put("/admin/:adminDataId", updateAdminData);

export default router;
