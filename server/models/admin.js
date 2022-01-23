import mongoose from "mongoose";

const adminDataSchema = new mongoose.Schema({
  presenceWindowMins: Number,
  presenceParallel: Number,
  shiftBufferHandoverMins: Number,
  shiftBufferReturnMins: Number,
  shiftReminderHrs: Number,
  durationDreamerHrs: Number,
  durationAdventurerHrs: Number,
  durationTravelerHrs: Number,
  adminEmail: String,
  versionKey: false,
});

const adminData = mongoose.model("adminData", adminDataSchema, "admin_test");

export { adminData };
