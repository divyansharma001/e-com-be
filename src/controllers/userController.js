// File: controllers/userController.js
import User from '../models/User.js';
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';

// Get user profile
export const getProfile = async (req, res) => {
  try {
    res.json({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      address: req.user.address,
      createdAt: req.user.createdAt
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const { name, address } = req.body;
    
    const updates = {};
    if (name) updates.name = name;
    if (address) updates.address = address;
    
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true }
    );
    
    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        address: user.address
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete user account
export const deleteAccount = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user._id });
    await User.findByIdAndDelete(req.user._id);
    
    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};