import { shift } from "../models/shifts.js";
import fetchBookingDataFromMonday from "../lib/mondayFetch.js";

const getShifts = async (req, res) => {
  const filterDate = new Date();
  const allShifts = await shift.find({ kombidatum_ende: { $gte: filterDate } });
  res.json(allShifts);
};

const findShift = async (req, res) => {
  const shiftId = req.params.shiftId;
  const singleShift = await shift.findById(shiftId);
  res.json(singleShift);
};

const postShift = async (req, res) => {
  const newShift = new shift({
    monday_id: req.body.id,
    modified: req.body.taken_rk,
    presence_slices: req.body.presence_slices,
    mails_meta: req.body.mails_meta,
    client: req.body.client,
    kennzeichen: req.body.kennzeichen,
    fahrzeug: req.body.fahrzeug,
    kombidatum_start: req.body.kombidatum_start,
    kombidatum_ende: req.body.kombidatum_ende,
    bemerkung: req.body.bemerkung,
    zusatz_1: req.body.zusatz_1,
    zusatz_2: req.body.zusatz_2,
    zusatz_3: req.body.zusatz_3,
    zusatz_4: req.body.zusatz_4,
    zusatz_5: req.body.zusatz_5,
    zusatz_6: req.body.zusatz_6,
    zusatz_7: req.body.zusatz_7,
    zusatz_8: req.body.zusatz_8,
    zusatz_9: req.body.zusatz_9,
    zusatz_10: req.body.zusatz_10,
    rk: req.body.rk,
    uek: req.body.uek,
  });
  const result = await newShift.save();
  res.json(result);
};

const updateShift = async (req, res) => {
  const shiftId = req.params.shiftId;
  const data = req.body;
  const updatedShift = await shift.findByIdAndUpdate(shiftId, data, {
    returnDocument: "after",
  });
  res.json(updatedShift);
};

const deleteShift = async (req, res) => {
  const shiftId = req.params.shiftId;
  try {
    const deletedShift = await shift.findByIdAndDelete(shiftId);
    if (deletedShift) {
      res.json({ success: true, message: "Buchung gelöscht." });
    } else {
      res.json({ success: false, message: "Keine Buchung gefunden." });
    }
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
      message: "Fehler",
    });
  }
};

const updateShifts = async (req, res) => {
  const data = await fetchBookingDataFromMonday();
  const allUpdatedShifts = data.forEach(async (booking) => {
    const filter = { monday_id: booking.id };
    const update = {
      monday_id: booking.id,
      client: booking.name,
      mails_meta: booking.mails_meta,
      kennzeichen: booking.kennzeichen,
      fahrzeug: booking.fahrzeug,
      kombidatum_start: booking.kombidatum_start,
      kombidatum_ende: booking.kombidatum_ende,
      bemerkung: booking.bemerkung,
      zusatz_1: booking.zusatz_1,
      zusatz_2: booking.zusatz_2,
      zusatz_3: booking.zusatz_3,
      zusatz_4: booking.zusatz_4,
      zusatz_5: booking.zusatz_5,
      zusatz_6: booking.zusatz_6,
      zusatz_7: booking.zusatz_7,
      zusatz_8: booking.zusatz_8,
      zusatz_9: booking.zusatz_9,
      zusatz_10: booking.zusatz_10,
      letztes_update: booking.letztes_update,
    };
    const options = {
      new: true,
      upsert: true,
      rawResult: true,
    };
    try {
      const updatedShift = await shift.findOneAndUpdate(
        filter,
        update,
        options
      );
      console.log(
        updatedShift.value._id,
        "DB Sync successful, updated:",
        updatedShift.lastErrorObject.updatedExisting
      );
    } catch (error) {
      console.log("DB Sync error:", error.message);
    }
  });
};

const exportShifts = async (req, res) => {
  const allShifts = await shift.find();
  res.setHeader("Content-Type", "text/csv");

  const columns = [
    "monday_id",
    "client",
    "kombidatum_start",
    "kombidatum_ende",
    "rk",
    "uek",
    "fahrzeug",
    "kennzeichen",
    "timestamp_creation",
  ];

  res.write(columns.map((column) => `"${column}"`).join(",") + "\r\n");

  const csvString = allShifts
    .map(
      (element) =>
        [
          element.monday_id,
          element.client,
          element.kombidatum_start,
          element.kombidatum_ende,
          element.rk,
          element.uek,
          element.fahrzeug,
          element.kennzeichen,
          element.timestamp_creation,
        ].join(",")
      // .map((property) => `"${property}"`)
      // .join(",")
    )
    .join("\r\n");
  res.write(csvString);
  res.end();
};

export {
  exportShifts,
  getShifts,
  findShift,
  postShift,
  updateShift,
  updateShifts,
  deleteShift,
};
