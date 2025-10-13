import User from "../models/User.model.js";

// Get all users - Admin
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Create a new user - Admin
const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    user = new User({ name, email, password, role: role || "customer" });
    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update a user details eg role - Admin 
const updateUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if(user){
          user.name = req.body.name || user.name;
          user.email = req.body.email || user.email;
          user.role = req.body.role || user.role;
        }
        const updateUser = await user.save();
        res.json({ message: "User updated successfully", user:updateUser }); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
}

const deleteUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if(user){
          await user.deleteOne();
          res.json({ message: "User deleted successfully" }); 
        }else{
          res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
}

export { getUsers, createUser ,updateUser, deleteUser };
