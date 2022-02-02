import mongoose from "mongoose";

const shiftSchema = new mongoose.Schema({
  monday_id: Number,
  timestamp_creation: { type: Date, default: Date.now },
  modified: Boolean,
  presence_slices: [Number],
  rk: { type: String, default: "" },
  uek: { type: String, default: "" },
  client: { type: String, required: true },
  kombidatum_start: Date,
  kombidatum_ende: Date,
  zusatz_1: { type: String, default: "-" },
  zusatz_2: { type: String, default: "-" },
  zusatz_3: { type: String, default: "-" },
  zusatz_4: { type: String, default: "-" },
  zusatz_5: { type: String, default: "-" },
  zusatz_6: { type: String, default: "-" },
  zusatz_7: { type: String, default: "-" },
  zusatz_8: { type: String, default: "-" },
  zusatz_9: { type: String, default: "-" },
  zusatz_10: { type: String, default: "-" },
  fahrzeug: String,
  kennzeichen: { type: String, required: true },
  bemerkung: { type: String, default: "-" },
  versionKey: false,
});

const shift = mongoose.model("shift", shiftSchema, "bookings_test");

export { shift };
