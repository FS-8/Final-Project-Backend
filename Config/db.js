require("dotenv").config();

const mongoose = require("mongoose");

const DB_URL = "mongodb+srv://agaam:agaam@atlascluster.0mt5lxe.mongodb.net/Final_Project";

const db = mongoose.connect(DB_URL);

module.exports = db;
