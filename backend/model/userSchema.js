const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  userType: String,
  enroll_course:String
});

module.exports = mongoose.model("User", userSchema);
