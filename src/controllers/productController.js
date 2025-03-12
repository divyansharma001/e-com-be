// File: controllers/productController.js
import Product from '../models/Product.js';

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, sort } = req.query;
    
    // Build query
    const query = {};
    if (category) query.category = category;
    if (minPrice && maxPrice) {
      query.price = { $gte: minPrice, $lte: maxPrice };
    } else if (minPrice) {
      query.price = { $gte: minPrice };
    } else if (maxPrice) {
      query.price = { $lte: maxPrice };
    }
    
    // Build sort
    const sortOption = sort === 'price-asc' ? { price: 1 } :
                      sort === 'price-desc' ? { price: -1 } :
                      { createdAt: -1 }; // Default newest first
    
    const products = await Product.find(query).sort(sortOption);
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Additional controller methods for admin functionality (optional)
/*
export const createProduct = async (req, res) => {
  // Implementation here
};

export const updateProduct = async (req, res) => {
  // Implementation here
};

export const deleteProduct = async (req, res) => {
  // Implementation here
};
*/
