const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  email: { type: String },
  password: { type: String },
  country: { type: String },
  phone: { type: String },
  city: { type: String },
  address: { type: String },
  kodePos: { type: String },
  // tambahkan properti lain sesuai kebutuhan
});
const User = mongoose.model("User", userSchema);

module.exports = User;
