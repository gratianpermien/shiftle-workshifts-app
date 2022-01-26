import { shift } from "../models/shifts.js";
import fetchBookingDataFromMonday from "../lib/mondayFetch.js";

const getShifts = async (req, res) => {
  const allShifts = await shift.find();
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
    timestamp_start_rk: req.body.timestamp_start_rk,
    timestamp_ende_rk: req.body.timestamp_ende_rk,
    timestamp_start_uek: req.body.timestamp_start_uek,
    timestamp_ende_uek: req.body.timestamp_ende_uek,
    presence_slices: req.body.presence_slices,
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
      res.json({ success: true, message: "Schicht gelöscht" });
    } else {
      res.json({ success: false, message: "Keine Schicht gefunden" });
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
      timestamp_start_rk: booking.timestamp_start_rk,
      timestamp_ende_rk: booking.timestamp_ende_rk,
      timestamp_start_uek: booking.timestamp_start_uek,
      timestamp_ende_uek: booking.timestamp_ende_uek,
      presence_slices: booking.presence_slices,
      client: booking.name,
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
      rk: "",
      uek: "",
    };
    const options = {
      upsert: true,
      returnOriginal: false,
      setDefaultsOnInsert: true,
      rawResult: true,
    };
    try {
      const updatedShift = await shift.findOneAndUpdate(
        filter,
        update,
        options
      );
      console.log("Successful DB func");
    } catch (error) {
      console.log("Error des Todes");
      res.json({
        success: false,
        message: "Error des Todes",
        error: error.message,
      });
    }
  });
  res.json(allUpdatedShifts);
};

// const exportShifts
// const exportLogs = async (req, res) => {
//   const logs = await Log.find();

//   res.setHeader('Content-Type', 'text/csv');

//   const columns = [
//     'date',
//     'time',
//     'duration',
//     'country',
//     'spot',
//     'airStart',
//     'airEnd',
//     'airEan',
//     'waterDepthMax',
//     'waterDepthAvg',
//     'waterTemp',
//     'notes',
//     'buddy',
//   ];

//   res.write(
//     columns.map((column) => `"${column}"`).join(',') + '\r\n'
//   );

//   const csvString = logs
//     .map((log) =>
//       [
//         log.date,
//         log.time,
//         log.duration,
//         log.country,
//         log.spot,
//         log.airStart,
//         log.airEnd,
//         log.airEan,
//         log.waterDepthMax,
//         log.waterDepthAvg,
//         log.waterTemp,
//         log.notes,
//         log.buddy,
//       ]
//         .map((property) => `"${property}"`)
//         .join(',')
//     )
//     .join('\r\n');
//   res.write(csvString);
//   res.end();
// };

export {
  getShifts,
  findShift,
  postShift,
  updateShift,
  updateShifts,
  deleteShift,
};
