// File: controllers/paymentController.js
import Payment from '../models/Payment.js';
import Order from '../models/Order.js';

// Create a payment session
export const createPayment = async (req, res) => {
  try {
    const { orderId, paymentMethod } = req.body;
    
    // Check if order exists and belongs to user
    const order = await Order.findOne({ _id: orderId, user: req.user._id });
    
    if (!order) return res.status(404).json({ message: 'Order not found' });
    
    // Check if order is already paid
    if (order.paymentInfo && order.paymentInfo.status === 'completed') {
      return res.status(400).json({ message: 'Order is already paid' });
    }
    
    // Here you would normally integrate with a payment provider like Stripe
    // For simplicity, we'll just create a payment record
    
    const paymentId = 'PAY_' + Math.random().toString(36).substr(2, 9).toUpperCase();
    
    const payment = new Payment({
      user: req.user._id,
      order: order._id,
      paymentId,
      amount: order.totalAmount,
      status: 'pending',
      paymentMethod
    });
    
    await payment.save();
    
    // Update order with payment info
    order.paymentInfo = {
      id: paymentId,
      status: 'pending',
      method: paymentMethod
    };
    
    await order.save();
    
    res.json({
      message: 'Payment session created',
      paymentId,
      amount: order.totalAmount,
      orderId: order._id
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verify payment success
export const verifyPayment = async (req, res) => {
  try {
    const { paymentId } = req.body;
    
    // Find payment
    const payment = await Payment.findOne({ paymentId });
    
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    
    // Verify payment belongs to user
    if (payment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    // In a real implementation, you would verify with the payment provider
    // For simplicity, we'll just update the status
    
    payment.status = 'completed';
    await payment.save();
    
    // Update order status
    const order = await Order.findById(payment.order);
    
    if (!order) return res.status(404).json({ message: 'Order not found' });
    
    order.paymentInfo.status = 'completed';
    order.status = 'processing';
    
    await order.save();
    
    res.json({
      message: 'Payment verified successfully',
      paymentId,
      orderId: order._id
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};