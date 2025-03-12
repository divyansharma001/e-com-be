// File: controllers/orderController.js
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

// Get user's orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get order by ID (only if it belongs to user)
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user._id }).populate('items.product');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { shippingAddress } = req.body;
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart || cart.items.length === 0) return res.status(400).json({ message: 'Cart is empty' });
    
    let totalAmount = 0;
    const orderItems = [];
    
    for (const item of cart.items) {
      const product = item.product;
      if (!product) return res.status(400).json({ message: 'Product not found' });
      if (product.stock < item.quantity) return res.status(400).json({ message: `Not enough stock for ${product.name}. Available: ${product.stock}` });
      
      product.stock -= item.quantity;
      await product.save();
      
      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity
      });
      
      totalAmount += product.price * item.quantity;
    }
    
    const order = new Order({
      user: req.user._id,
      items: orderItems,
      shippingAddress: shippingAddress || req.user.address,
      totalAmount,
      status: 'pending'
    });
    
    await order.save();
    cart.items = [];
    await cart.save();
    
    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
