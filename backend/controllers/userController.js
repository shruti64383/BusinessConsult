const User = require("../models/User");

// @desc    Get current logged-in user
// @route   GET /api/user/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // exclude password

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error in getMe:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = { getMe };
