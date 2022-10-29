const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/verifyToken.middleware");
const {
  handleGetUserDetails,
  addfavourites,
  getfavourites,
} = require("../controllers/user.controller");

// @route GET /user/details
// @desc Get user details
// @access Private
router.get("/details", verifyToken, handleGetUserDetails);
router.post("/:id/addfavourites", addfavourites);
router.get("/:id/getfavourites", getfavourites);

module.exports = router;
