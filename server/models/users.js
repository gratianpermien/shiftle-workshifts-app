import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
  password: String,
  phone: String,
  versionKey: false,
});

const user = mongoose.model("user", userSchema, "users_test");

export { user };
