import User from "../models/User.model.js";
import jwt from "jsonwebtoken";
import validator from "validator";

// Register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;


  try {
    // 1️⃣ Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    // 2️⃣ Normalize email
    const normalizedEmail = email.toLowerCase();

    // 3️⃣ Check if user already exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // 4️⃣ Create user
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password,
    });

    // 5️⃣ JWT payload
    const payload = {
      user: {
        id: user._id,
        role: user.role,
      },
    };

    // 6️⃣ Sign token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // 7️⃣ Response
    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1️⃣ Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // 2️⃣ Normalize email
    const normalizedEmail = email.toLowerCase();

    // 3️⃣ Find user
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 4️⃣ Match password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 5️⃣ JWT payload
    const payload = {
      user: {
        id: user._id,
        role: user.role,
      },
    };

    // 6️⃣ Sign token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // 7️⃣ Response
    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
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
