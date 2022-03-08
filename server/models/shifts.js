import mongoose from "mongoose";

const shiftSchema = new mongoose.Schema({
  monday_id: Number,
  timestamp_creation: { type: Date, default: Date.now },
  modified: Boolean,
  mails_meta: {
    time_oneday_rk: { type: Boolean, default: false },
    time_oneday_uek: { type: Boolean, default: false },
    time_sevendays: { type: Boolean, default: false },
    time_thirtydays: { type: Boolean, default: false },
    func_groupinfo: { type: Boolean, default: false },
    func_shiftconfirmation_rk: { type: Boolean, default: false },
    func_shiftconfirmation_uek: { type: Boolean, default: false },
    func_shiftchange: { type: Boolean, default: false },
  },
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
  letztes_update: Date,
  fahrzeug: String,
  kennzeichen: { type: String, required: true },
  bemerkung: { type: String, default: "-" },
  versionKey: false,
});

const shift = mongoose.model("shift", shiftSchema, "bookings_test");

export { shift };
