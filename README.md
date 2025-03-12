# E-Commerce Backend APIs

An Express.js-based backend API for an e-commerce platform, supporting user authentication, product management, cart functionality, order processing, and payment handling.

## Features
- User authentication (register, login, JWT-based auth)
- Product management (CRUD operations)
- Shopping cart functionality
- Order creation and retrieval
- Payment processing
- Middleware-based authentication and security

## Project Structure
```
ecommerce-api/
├── .env                  # Environment variables
├── package.json          # Project metadata and dependencies
├── README.md             # Project documentation
└── src/                  # Source code
    ├── app.js            # Main application entry point
    ├── controllers/      # Business logic
    │   ├── authController.js
    │   ├── cartController.js
    │   ├── orderController.js
    │   ├── paymentController.js
    │   ├── productController.js
    │   └── userController.js
    ├── middleware/       # Custom middleware
    │   └── auth.js       # Authentication middleware
    ├── models/           # MongoDB schemas
    │   ├── Cart.js
    │   ├── Order.js
    │   ├── Payment.js
    │   ├── Product.js
    │   └── User.js
    └── routes/           # API routes
        ├── auth.js
        ├── cart.js
        ├── orders.js
        ├── payments.js
        ├── products.js
        └── users.js
```

## Installation & Setup
### Prerequisites
- Node.js (>=14.x)
- MongoDB

### Install dependencies
```sh
npm install
```

### Environment Variables
Create a `.env` file in the root directory with the following variables:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret
```

### Running the Server
```sh
npm start
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user and get JWT token

### Products
- `GET /products` - Get all products
- `POST /products` - Add a new product (Admin only)

### Cart
- `GET /cart` - Get user cart
- `POST /cart` - Add item to cart

### Orders
- `GET /orders/my-orders` - Get user orders
- `POST /orders` - Create an order

### Payments
- `POST /payments/create` - Create a payment session
- `POST /payments/verify` - Verify payment

