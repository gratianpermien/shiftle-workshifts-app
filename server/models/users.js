import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: String,
  email: String,
  role: String,
  phone: String,
  versionKey: false,
});

const user = mongoose.model("user", userSchema, "users_test");

export { user };
