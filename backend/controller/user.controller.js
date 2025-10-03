import User from "../models/User.model.js";
import jwt from "jsonwebtoken";

// Register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    user = new User({ name, email, password });
    await user.save();

    //Jwt payload
    const payload = { user: { id: user._id, role: user.role } };

    // sign and return jwt
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) throw err;

        res.status(201).json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    //Jwt payload
    const payload = { user: { id: user._id, role: user.role } };

    // sign and return jwt
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) throw err;

        res.json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

// get loged in user info
const getProfileInfo = async(req, res)=>{
    res.json(req.user)
}

// logout
const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

export { registerUser, loginUser , getProfileInfo , logoutUser};
