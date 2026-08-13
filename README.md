# 🛒 GreenCart – Full Stack E-commerce Web Application

GreenCart is a fully functional e-commerce platform built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js). It provides a seamless and realistic online shopping experience, including product browsing, cart management, address handling, secure order placement, and seller management.

This project demonstrates technical depth in full-stack development with a strong focus on user experience, responsive design, and scalable architecture.

---

## 🌐 Live Demo

🔗 [Frontend Live Link](https://greencart-vercel-link.com)  
📂 [GitHub Repository](https://github.com/raju-ai24/greencart)

---

## 🔧 Tech Stack

### 🖥️ Frontend
- **React.js** - UI library for building interactive components
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **React Router DOM** - Client-side routing and navigation
- **React Context API** - Global state management
- **Vite** - Fast build tool and dev server

### ⚙️ Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for building REST APIs
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - ODM for MongoDB
- **Multer** - Middleware for handling file uploads
- **Cloudinary** - Cloud storage for product images
- **JWT** - Secure authentication tokens

### ☁️ Deployment
- **Vercel** - Frontend hosting
- **Vercel/Render/Railway** - Backend deployment options

---

## 🚀 Key Features

### 👥 Customer Features
- 🛍️ Browse products with category filtering
- 🛒 Add/remove items from shopping cart
- 💳 Secure checkout with address validation
- 📦 Order management and order history
- 🔄 Session-based cart persistence
- 📱 Mobile-first responsive design
- ✨ Shimmer loading effects for better UX
- 🔐 User authentication and profile management
- 📍 Save and manage multiple addresses

### 🏪 Seller Features
- ➕ Add and manage products
- 📊 View seller dashboard
- 📋 Track and manage orders
- 📈 Monitor sales and inventory
- 🖼️ Upload product images via Cloudinary

### Admin Features
- 👥 User and seller management
- 📦 Product catalog management
- 💰 Order and transaction tracking
- 📊 Analytics and reporting

---

## 📁 Project Structure

```
greencart/
├── client/                          # Frontend (React + Vite)
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   │   ├── BestSeller.jsx       # Best seller products
│   │   │   ├── BottomBanner.jsx     # Bottom promotional banner
│   │   │   ├── Categories.jsx       # Product categories
│   │   │   ├── Footer.jsx           # Footer component
│   │   │   ├── Login.jsx            # User login page
│   │   │   ├── MainBanner.jsx       # Hero banner
│   │   │   ├── Navbar.jsx           # Navigation bar
│   │   │   ├── NewsLetter.jsx       # Newsletter signup
│   │   │   ├── ProductCard.jsx      # Product card component
│   │   │   └── seller/
│   │   │       └── SellerLogin.jsx  # Seller login page
│   │   ├── pages/                   # Page components
│   │   │   ├── Home.jsx             # Homepage
│   │   │   ├── AllProducts.jsx      # All products page
│   │   │   ├── ProductCategory.jsx  # Category filtered products
│   │   │   ├── ProductDetails.jsx   # Product detail page
│   │   │   ├── Cart.jsx             # Shopping cart
│   │   │   ├── AddAddress.jsx       # Address management
│   │   │   ├── MyOrders.jsx         # Order history
│   │   │   ├── Contact.jsx          # Contact page
│   │   │   └── Seller/
│   │   │       ├── AddProduct.jsx   # Add new product
│   │   │       ├── ProductList.jsx  # Seller's products
│   │   │       ├── Orders.jsx       # Seller's orders
│   │   │       └── SellerLayout.jsx # Seller dashboard layout
│   │   ├── context/
│   │   │   └── AppContext.jsx       # Global app state
│   │   ├── assets/
│   │   │   └── assets.js            # Images and constants
│   │   ├── App.jsx                  # Root component
│   │   ├── main.jsx                 # Entry point
│   │   └── index.css                # Global styles
│   ├── index.html                   # HTML template
│   ├── package.json                 # Frontend dependencies
│   ├── vite.config.js               # Vite configuration
│   ├── eslint.config.js             # ESLint configuration
│   ├── vercel.json                  # Vercel deployment config
│   └── README.md                    # Frontend specific docs
│
├── server/                          # Backend (Node + Express)
│   ├── configs/                     # Configuration files
│   │   ├── db.js                    # MongoDB connection
│   │   ├── cloudinary.js            # Cloudinary setup
│   │   └── multer.js                # Multer file upload config
│   ├── models/                      # Database schemas
│   │   ├── User.js                  # User model
│   │   ├── Product.js               # Product model
│   │   ├── Order.js                 # Order model
│   │   └── Address.js               # Address model
│   ├── controllers/                 # Request handlers
│   │   ├── UserController.js        # User operations
│   │   ├── productController.js     # Product operations
│   │   ├── cartController.js        # Cart operations
│   │   ├── orderController.js       # Order operations
│   │   ├── addressController.js     # Address operations
│   │   └── sellerController.js      # Seller operations
│   ├── routes/                      # API endpoints
│   │   ├── UserRoute.js             # User routes
│   │   ├── productRoute.js          # Product routes
│   │   ├── cartRoute.js             # Cart routes
│   │   ├── orderRoute.js            # Order routes
│   │   ├── addressRouter.js         # Address routes
│   │   └── sellerRoute.js           # Seller routes
│   ├── middlewares/                 # Custom middleware
│   │   ├── authUser.js              # User authentication
│   │   └── authSeller.js            # Seller authentication
│   ├── package.json                 # Backend dependencies
│   ├── server.js                    # Express server setup
│   ├── seed.js                      # Database seeding
│   ├── vercel.json                  # Vercel deployment config
│   └── README.md                    # Backend specific docs
│
├── README.md                        # Main project documentation
└── .gitignore                       # Git ignore rules
```

---

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn** package manager
- **MongoDB** (local installation or cloud instance like MongoDB Atlas)
- **Cloudinary Account** (for image uploads)
- **Git** (for version control)

---

## 📥 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/raju-ai24/greencart.git
cd greencart
```

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/greencart
DB_NAME=greencart

# Cloudinary
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# JWT
JWT_SECRET=your_super_secret_jwt_key

# Server
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

Start the backend server:

```bash
npm run dev
# or
npm start
```

The backend will be running on `http://localhost:5000`

### 3️⃣ Frontend Setup

```bash
cd client
npm install
```

Create a `.env.local` file in the `client` directory:

```env
VITE_BACKEND_URL=http://localhost:5000
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will be running on `http://localhost:5173`

---

## 🔌 API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `POST /api/users/logout` - User logout
- `POST /api/sellers/register` - Register new seller
- `POST /api/sellers/login` - Seller login

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `GET /api/products/category/:category` - Get products by category
- `POST /api/products` - Add new product (Seller only)
- `PUT /api/products/:id` - Update product (Seller only)
- `DELETE /api/products/:id` - Delete product (Seller only)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update/:productId` - Update cart item quantity
- `DELETE /api/cart/remove/:productId` - Remove item from cart

### Orders
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Place new order
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id` - Update order status (Seller only)

### Addresses
- `GET /api/addresses` - Get user's addresses
- `POST /api/addresses` - Add new address
- `PUT /api/addresses/:id` - Update address
- `DELETE /api/addresses/:id` - Delete address

### Sellers
- `GET /api/sellers/dashboard` - Get seller dashboard
- `GET /api/sellers/products` - Get seller's products
- `GET /api/sellers/orders` - Get seller's orders

---

## 🧪 Testing the Application

1. **User Registration & Login**
   - Navigate to `/login` and create a new account
   - Or login with existing credentials

2. **Browse Products**
   - Visit homepage to see featured products
   - Use category filter to browse by category
   - Click on product card for detailed view

3. **Add to Cart**
   - Click "Add to Cart" on product details page
   - View cart and modify quantities

4. **Place Order**
   - Go to cart and proceed to checkout
   - Add/select delivery address
   - Choose payment method (COD/Online)
   - Confirm order

5. **Seller Features**
   - Login as seller
   - Add new products with images
   - View orders and update status
   - Monitor inventory

---

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. Push your code to GitHub
2. Visit [Vercel](https://vercel.com)
3. Import the `client` folder
4. Add environment variables
5. Deploy

### Backend Deployment

**Option 1: Vercel**
- Ensure `server.js` handles serverless functions
- Add `vercel.json` configuration
- Deploy `server` folder

**Option 2: Render**
- Create account on [Render](https://render.com)
- Create new Web Service
- Connect GitHub repository
- Add environment variables
- Deploy

**Option 3: Railway/Heroku**
- Similar process with respective platforms

---

## 📚 Learning Highlights

During this project, skills enhanced include:

- 🔧 Building scalable frontend architecture with React and Tailwind CSS
- 📡 Creating and integrating RESTful APIs with Express and MongoDB
- 🧠 Managing global state using React Context API
- 🔐 Implementing JWT-based authentication and authorization
- 🎨 Designing responsive user interfaces for all devices
- 📦 Handling file uploads with Multer and Cloudinary
- ⚙️ Database modeling and schema design with Mongoose
- 🔄 Managing asynchronous operations and API calls
- 📊 Building seller dashboard and analytics features
- 🎯 Implementing cart persistence and session management

---

## 🐛 Troubleshooting

### Backend won't connect to MongoDB
- Check MongoDB URI in `.env`
- Ensure MongoDB is running (if local)
- Verify network access for MongoDB Atlas

### Frontend can't reach backend API
- Ensure backend is running on correct port
- Check `VITE_BACKEND_URL` environment variable
- Verify CORS configuration on backend

### Image uploads not working
- Verify Cloudinary credentials
- Check file upload size limits in Multer config
- Ensure proper form data encoding in requests

### Port already in use
```bash
# Find and kill process on port (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or on Mac/Linux
lsof -i :5000
kill -9 <PID>
```

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💻 Author

**Raj Bhatt**
- GitHub: [@raju-ai24](https://github.com/raju-ai24)
- Email: your-email@example.com
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/your-profile)

---

## 🙏 Acknowledgments

- MERN Stack community
- Tailwind CSS documentation
- MongoDB documentation
- Cloudinary for image hosting
- Vercel for deployment platform

---

## 📞 Support

If you have any questions or need help, feel free to:
- Open an issue on GitHub
- Contact via email
- Check existing documentation

---

**Happy Coding! 🚀**
