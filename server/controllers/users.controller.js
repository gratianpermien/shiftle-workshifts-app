import { user } from "../models/users.js";

const getUsers = async (req, res) => {
  const allUsers = await user.find();
  res.json(allUsers);
};

const findUser = async (req, res) => {
  const userId = req.params.UserId;
  const singleUser = await user.findById(UserId);
  res.json(singleUser);
};

const postUser = async (req, res) => {
  const newUser = new user({
    password: req.body.password,
    email: req.body.email,
    role: req.body.role,
    phone: req.body.phone,
    versionKey: false,
  });
  const result = await newUser.save();
  res.json(result);
};

const updateUser = async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;
  const updatedUser = await user.findByIdAndUpdate(userId, data, {
    returnDocument: "after",
  });
  res.json(updatedUser);
};

const deleteUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const deletedUser = await user.findByIdAndDelete(userId);
    if (deletedUser) {
      res.json({ success: true, message: "User was deleted" });
    } else {
      res.json({ success: false, message: "No user with this ID" });
    }
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
      message: "Delete user didn't work",
    });
  }
};

export { getUsers, findUser, postUser, updateUser, deleteUser };
