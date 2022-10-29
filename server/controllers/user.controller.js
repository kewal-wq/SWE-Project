const User = require("../models/user.model");

module.exports.handleGetUserDetails = async (req, res) => {
  if (!req.user) {
    return res
      .status(400)
      .json({ success: false, message: "Token is required" });
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: "User does not exist" });
  }
  res.status(200).json({
    success: true,
    message: "User fetched successfully",
    user,
  });
};

module.exports.addfavourites = async (req, res) => {
  try {
    const { value } = req.body;
    const { id } = req.params;
    const user = await User.findById(id);
    user.favouritePlaces.push(value);
    await user.save();
    res.status(200).send({ message: "Success!!", user });
  } catch (err) {
    res.status(400).send({ messgae: "Error in posting favourites", err });
  }
};

module.exports.getfavourites = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).send({ message: "Success", user });
  } catch (err) {
    res.status(400).send({ message: "Error in getting user", err });
  }
};
