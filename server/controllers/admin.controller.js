import { adminData } from "../models/admin.js";

const getAdminData = async (req, res) => {
  const allAdminData = await adminData.find();
  res.json(allAdminData);
};

const updateAdminData = async (req, res) => {
  const adminDataId = req.params.adminDataId;
  const data = req.body;
  const updatedAdminData = await adminData.findByIdAndUpdate(
    adminDataId,
    data,
    {
      returnDocument: "after",
    }
  );
  res.json(updatedAdminData);
};

export { getAdminData, updateAdminData };
