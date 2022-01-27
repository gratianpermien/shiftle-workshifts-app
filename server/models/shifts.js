import mongoose from "mongoose";

const shiftSchema = new mongoose.Schema({
  monday_id: Number,
  timestamp_creation: { type: Date, default: Date.now },
  timestamp_start_rk: Number,
  timestamp_ende_rk: Number,
  timestamp_start_uek: Number,
  timestamp_ende_uek: Number,
  presence_slices: Array,
  rk: String,
  uek: String,
  client: { type: String, required: true },
  kombidatum_start: Date,
  kombidatum_ende: Date,
  zusatz_1: String,
  zusatz_2: String,
  zusatz_3: String,
  zusatz_4: String,
  zusatz_5: String,
  zusatz_6: String,
  zusatz_7: String,
  zusatz_8: String,
  zusatz_9: String,
  zusatz_10: String,
  fahrzeug: String,
  kennzeichen: { type: String, required: true },
  bemerkung: String,
  versionKey: false,
});

const shift = mongoose.model("shift", shiftSchema, "bookings_test");

export { shift };
