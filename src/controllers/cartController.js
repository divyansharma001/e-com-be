// File: controllers/cartController.js
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

// Get user's cart
export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
      await cart.save();
    }
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (quantity <= 0) return res.status(400).json({ message: 'Quantity must be positive' });
    if (product.stock < quantity) return res.status(400).json({ message: 'Not enough product in stock' });
    
    let cart = await Cart.findOne({ user: req.user._id }) || new Cart({ user: req.user._id, items: [] });
    
    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    
    itemIndex > -1 ? (cart.items[itemIndex].quantity += quantity) : cart.items.push({ product: productId, quantity });
    
    await cart.save();
    await cart.populate('items.product');
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update cart item quantity
export const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const itemId = req.params.id;
    
    if (quantity <= 0) return res.status(400).json({ message: 'Quantity must be positive' });
    
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    
    const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);
    if (itemIndex === -1) return res.status(404).json({ message: 'Item not found in cart' });
    
    const product = await Product.findById(cart.items[itemIndex].product);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (product.stock < quantity) return res.status(400).json({ message: 'Not enough product in stock' });
    
    cart.items[itemIndex].quantity = quantity;
    await cart.save();
    await cart.populate('items.product');
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove item from cart
export const removeCartItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    
    cart.items = cart.items.filter(item => item._id.toString() !== itemId);
    await cart.save();
    await cart.populate('items.product');
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Clear the entire cart
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    
    cart.items = [];
    await cart.save();
    
    res.json({ message: 'Cart cleared successfully', cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
