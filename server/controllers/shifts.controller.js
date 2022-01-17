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
    timestamp_start: req.body.timestamp_start,
    timestamp_ende: req.body.timestamp_ende,
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
    rk: "",
    uek: "",
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

const updateShifts = async (req, res) => {
  fetchBookingDataFromMonday()
  // const shiftId = req.params.shiftId;
  // // const fetchedArray = fetchBookingDataFromMonday();
  // const data = req.body;
  // const updatedShift = await shift.findByIdAndUpdate(shiftId, data, {
  //   returnDocument: "after",
  // });
  // res.json(updatedShifts);
};

const deleteShift = async (req, res) => {
  const shiftId = req.params.shiftId;
  try {
    const deletedShift = await shift.findByIdAndDelete(shiftId);
    if (deletedShift) {
      res.json({ success: true, message: "Shift was deleted" });
    } else {
      res.json({ success: false, message: "No shift with this ID" });
    }
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
      message: "Delete shift didn't work",
    });
  }
};

export {
  getShifts,
  findShift,
  postShift,
  updateShift,
  updateShifts,
  deleteShift,
};
