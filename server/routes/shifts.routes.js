import express from "express";

import {
  getShifts,
  findShift,
  postShift,
  updateShift,
  updateShifts,
  deleteShift,
  exportShifts,
} from "../controllers/shifts.controller.js";

const router = express.Router();

router.get("/shifts", getShifts);
router.get("/shifts/:shiftId", findShift);
router.get("/export", exportShifts);
router.post("/shifts", postShift);
router.put("/shifts/:shiftId", updateShift);
router.put("/shifts", updateShifts);
router.delete("/shifts/:shiftId", deleteShift);

export default router;
