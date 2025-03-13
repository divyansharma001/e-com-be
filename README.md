# E-Commerce Backend API

An **Express.js**-based backend API for an **e-commerce platform**, supporting:

- **User authentication** (register, login, JWT-based auth)
- **Product management** (CRUD operations)
- **Shopping cart functionality**
- **Order creation and retrieval**
- **Payment processing**
- **Middleware-based authentication and security**

## 🚀 Features

- **Secure authentication** using JWT
- **MongoDB** database integration with Mongoose
- **Role-based access control** (e.g., admin-only actions)
- **RESTful API design** for easy frontend integration
- **Middleware for authentication and validation**
- **Docker support** for containerized deployment

---

## 📂 Project Structure

```
ecommerce-api/
├── .env                  # Environment variables
├── Dockerfile            # Docker configuration
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
    ├── routes/           # API routes
    │   ├── auth.js
    │   ├── cart.js
    │   ├── orders.js
    │   ├── payments.js
    │   ├── products.js
    │   └── users.js
    └── config/           # Configuration files (e.g., DB connection)
```

---

## 🛠 Installation & Setup

### Prerequisites

- **Node.js** (>=14.x)
- **MongoDB** (Local or Cloud-based [MongoDB Atlas](https://www.mongodb.com/atlas))
- **Docker** (optional for containerized deployment)

### Clone the Repository

```sh
git clone https://github.com/YOUR_USERNAME/ecommerce-api.git
cd ecommerce-api
```

### Install Dependencies

```sh
npm install
```

### Configure Environment Variables

Create a **.env** file in the root directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret
```

### Running the Server

```sh
npm start
```

For development with **Nodemon**:

```sh
npm run dev
```

---

## 🐳 Running with Docker

### **Build & Run Container**

```sh
docker build -t ecommerce-api .
docker run -p 5000:5000 --env-file .env ecommerce-api
```

---

## 📡 API Endpoints

### **Authentication**

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user and get JWT token

### **Products**

- `GET /products` - Get all products
- `POST /products` - Add a new product (Admin only)
- `PUT /products/:id` - Update a product (Admin only)
- `DELETE /products/:id` - Delete a product (Admin only)

### **Cart**

- `GET /cart` - Get user cart
- `POST /cart` - Add item to cart
- `DELETE /cart/:id` - Remove item from cart

### **Orders**

- `GET /orders/my-orders` - Get user orders
- `POST /orders` - Create an order

### **Payments**

- `POST /payments/create` - Create a payment session
- `POST /payments/verify` - Verify payment

---

## 📌 Deployment on Render

1. **Push to GitHub**
2. **Go to ****[Render](https://render.com/)** → Create New Web Service
3. **Connect GitHub Repo** → Select `Docker` Environment
4. **Set Environment Variables** (same as `.env`)
5. **Deploy!** 🎉

---

## 👨‍💻 Contributing

Feel free to **fork** this repo, create a new **branch**, and submit a **pull request**!

---

##
