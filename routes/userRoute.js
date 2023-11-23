const express = require("express");
const { createUser, loginUserCtrl, getallUser, updatedUser, handleRefreshToken, logout, loginAdmin } = require("../controllers/userController");
const router = express.Router();

router.post("/login", loginUserCtrl);
router.post("/admin-login", loginAdmin);
router.get("/all-users", getallUser);

module.exports = router;
