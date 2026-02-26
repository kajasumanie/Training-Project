# 🛒 ShopHub - Modern E-Commerce Platform

A professional full-stack e-commerce application with advanced state management, built with React, Redux Toolkit, NestJS, and TypeORM. Features intelligent order caching, centralized notifications, and a modern blue/purple theme.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Database](#database)
- [Testing](#testing)
- [Deployment](#deployment)

## ✨ Features

### User Features
- ✅ User registration and authentication (JWT-based)
- ✅ Browse products in a responsive grid layout
- ✅ Search products by title and description
- ✅ View product details and ratings
- ✅ Rate products (logged-in users only)
- ✅ Add products to shopping cart
- ✅ Shopping cart with persistent storage (localStorage)
- ✅ Mini cart badge showing item count
- ✅ Adjust product quantities in cart
- ✅ Checkout and create orders
- ✅ View order history with intelligent caching
- ✅ Centralized notification system for user feedback

### Technical Features
- ✅ RESTful API architecture
- ✅ JWT authentication with access and refresh tokens
- ✅ Advanced Redux state management (5 slices)
- ✅ Order history caching (5-minute expiry)
- ✅ Centralized notification management
- ✅ Pagination for products
- ✅ Product search functionality
- ✅ Order captures product details at checkout time
- ✅ Responsive Material-UI design
- ✅ Redux Toolkit with RTK Query for API calls
- ✅ TypeScript for complete type safety
- ✅ Error handling with proper HTTP status codes
- ✅ Auto token refresh on 401 errors

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Redux Toolkit** - Advanced state management with 5 slices
- **RTK Query** - Powerful data fetching and caching
- **Material-UI (MUI)** - UI component library
- **Vite** - Lightning-fast build tool and dev server
- **React Router v7** - Client-side routing
- **Redux Persist** - State persistence
- **Formik & Yup** - Form handling and validation

### Backend
- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type-safe JavaScript
- **TypeORM** - ORM with Repository pattern
- **SQLite** - Lightweight database
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

## 📦 Prerequisites

Before you begin, ensure you have installed:
- **Node.js** (v18 or higher)
- **npm** (v8 or higher)

## 🚀 Installation

### 1. Clone the Repository

\`\`\`bash
git clone <repository-url>
cd "React Training Project"
\`\`\`

### 2. Install Backend Dependencies

\`\`\`bash
cd sc.backend
npm install
\`\`\`

### 3. Install Frontend Dependencies

\`\`\`bash
cd ../sc.frontend
npm install
\`\`\`

### 4. Set Up Environment Variables

#### Backend (.env)

Create a \`.env\` file in the \`sc.backend\` directory:

\`\`\`env
PORT=3000
JWT_ACCESS_TOKEN_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_REFRESH_TOKEN_SECRET=your-super-secret-refresh-token-key-change-this-in-production
\`\`\`

#### Frontend (.env)

Create a \`.env\` file in the \`sc.frontend\` directory:

\`\`\`env
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_APP_NAME=SumanieShop
VITE_ENV=development
\`\`\`

### 5. Seed the Database (Optional)

Populate the database with sample products:

\`\`\`bash
cd sc.backend
npm run seed
\`\`\`

## 🏃 Running the Application

### Start Backend Server

\`\`\`bash
cd sc.backend
npm run start:dev
\`\`\`

The backend will run on **http://localhost:3000**

### Start Frontend Server

Open a new terminal:

\`\`\`bash
cd sc.frontend
npm run dev
\`\`\`

The frontend will run on **http://localhost:5173**

### Access the Application

Open your browser and navigate to:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000/api/v1

## 🎨 Design Theme

ShopHub features a modern, professional blue/purple color scheme:
- **Primary Color**: Material Blue (#1976d2)
- **Secondary Color**: Purple (#9c27b0)
- **Background**: Clean neutrals (#f5f5f5 / #121212)
- **Accents**: Complementary blues and purples

The design emphasizes:
- Modern, clean aesthetics
- Professional rounded corners (16px border radius)
- Smooth transitions and animations
- Accessible color contrasts
- Material Design principles

## 📁 Project Structure

### Backend Structure

\`\`\`
sc.backend/
├── src/
│   ├── auth/              # Authentication module
│   │   ├── dto/           # Data transfer objects
│   │   ├── utils/         # JWT strategy, guards
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.module.ts
│   ├── user/              # User module
│   ├── product/           # Product module
│   ├── order/             # Order module
│   ├── order-item/        # Order items module
│   ├── rating/            # Product ratings module
│   ├── app.module.ts      # Root module
│   └── main.ts            # Application entry point
├── .env                   # Environment variables
├── database.sqlite        # SQLite database file
└── package.json
\`\`\`

### Frontend Structure

\`\`\`
sc.frontend/
├── src/
│   ├── api/               # RTK Query API slices
│   │   ├── authApi.ts
│   │   ├── productsApi.ts
│   │   ├── ordersApi.ts
│   │   ├── userApi.ts
│   │   └── interceptorsSlice.ts
│   ├── components/        # Reusable UI components
│   │   ├── ProductCard/
│   │   ├── OrderCard/
│   │   ├── Topbar/
│   │   ├── SideNav/
│   │   └── ...
│   ├── features/          # Feature-based modules
│   │   ├── home/
│   │   ├── products/
│   │   ├── orders/
│   │   ├── cart/
│   │   ├── checkout/
│   │   └── login/
│   ├── store/             # Redux store setup
│   │   ├── slices/        # Redux slices (5 slices)
│   │   │   ├── authSlice.ts           # User authentication
│   │   │   ├── cartSlice.ts           # Shopping cart
│   │   │   ├── notificationSlice.ts   # Toast notifications
│   │   │   └── orderHistorySlice.ts   # Order caching
│   │   ├── persistConfig.ts
│   │   └── store.ts
│   ├── models/            # TypeScript interfaces
│   ├── routes/            # Route definitions
│   ├── appSlice.ts        # Application theme & UI
│   ├── App.tsx            # Root component
│   └── main.tsx           # Application entry point
├── .env                   # Environment variables
└── package.json
\`\`\`

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /api/v1/register | Register new user | No |
| POST | /api/v1/login | User login | No |
| POST | /api/v1/logout | User logout | Yes |
| POST | /api/v1/refreshToken | Refresh access token | No |

### Products

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | /api/v1/products | Get all products (with pagination & search) | Yes |
| GET | /api/v1/products/:id | Get product by ID | Yes |
| GET | /api/v1/products/top-rated | Get top-rated products | Yes |
| POST | /api/v1/products/:id/rate/:rate | Rate a product | Yes |
| POST | /api/v1/products | Create product | Yes |
| PATCH | /api/v1/products/:id | Update product | Yes |
| DELETE | /api/v1/products/:id | Delete product | Yes |

### Orders

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | /api/v1/orders | Get all orders | Yes |
| GET | /api/v1/orders/:id | Get order by ID | Yes |
| POST | /api/v1/orders | Create order (checkout) | Yes |

### Query Parameters

**Products Pagination & Search:**
\`\`\`
GET /api/v1/products?page=1&limit=10&search=keyboard
\`\`\`

## 🔐 Environment Variables

### Backend (.env)

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 3000 |
| JWT_ACCESS_TOKEN_SECRET | Secret for access tokens | (required) |
| JWT_REFRESH_TOKEN_SECRET | Secret for refresh tokens | (required) |

### Frontend (.env)

| Variable | Description | Default |
|----------|-------------|---------|
| VITE_API_BASE_URL | Backend API URL | http://localhost:3000/api/v1 |
| VITE_APP_NAME | Application name | SumanieShop |
| VITE_ENV | Environment | development |

## 💾 Database

The application uses **SQLite** for simplicity and portability. The database file (\`database.sqlite\`) is created automatically in the backend root directory.

### Database Schema

**Users**
- id, email, password, mobile

**Products**
- id, title, description, price, imageUrl

**Orders**
- id, status, userId, createdAt

**OrderItems**
- id, orderId, productId, quantity, totalPrice, productTitle, productPrice, productImageUrl

**Ratings**
- id, productId, userId, rating

### Seeding the Database

Run the seed script to populate with sample products:

\`\`\`bash
cd sc.backend
npm run seed
\`\`\`

This will add 12 sample products with various categories.

## 🧪 Testing

### Run Backend Tests

\`\`\`bash
cd sc.backend
npm run test
\`\`\`

### Run Frontend Tests

\`\`\`bash
cd sc.frontend
npm run test
\`\`\`

## 🚀 Deployment

### Production Build

#### Backend

\`\`\`bash
cd sc.backend
npm run build
npm run start:prod
\`\`\`

#### Frontend

\`\`\`bash
cd sc.frontend
npm run build
\`\`\`

The production build will be in the \`dist\` directory and can be served with any static file server.

### Environment-Specific Configuration

Create different \`.env\` files for each environment:
- \`.env.development\`
- \`.env.staging\`
- \`.env.production\`

## 📝 Key Implementation Details

### Advanced State Management
The application uses **5 Redux slices** for organized state management:
1. **userAuth** - Authentication with persistence
2. **shoppingCart** - Cart items with localStorage sync
3. **application** - Theme and UI preferences
4. **notifications** - Centralized toast notifications
5. **orderHistory** - Intelligent order caching (5-min expiry)

### Cart Persistence
The shopping cart uses Redux for state management and persists to **localStorage** with the key `user-cart-data`, ensuring the cart remains available even after closing the browser.

### Order Caching Strategy
Orders are cached locally for **5 minutes** to reduce API calls:
- Automatic cache validation on component mount
- Manual cache clearing on logout
- Smart cache invalidation on new orders

### Notification System
Centralized notification management with support for:
- Success, Error, Warning, Info types
- Auto-dismissal with configurable duration
- Notification history tracking
- Unique ID generation for each notification

### Order Data Integrity
When an order is created, the system captures:
- Product title
- Product price
- Product image URL

This ensures that order history remains accurate even if product details change in the future.

### Authentication Flow
1. User registers/logs in
2. Backend returns JWT access token (10 min) and refresh token (7 days)
3. Tokens stored in HTTP-only cookies
4. Refresh token automatically renews access token on 401 errors
5. Auth state persisted to survive page refreshes

### API Interceptor
Enhanced API layer with:
- Automatic token refresh on 401 errors
- Development mode logging
- Custom headers (X-Requested-With)
- Error handling with user-friendly messages

### Search Implementation
Product search uses case-insensitive LIKE queries on title and description fields with debouncing (500ms) to optimize performance.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Material-UI for the beautiful component library
- NestJS for the robust backend framework
- Redux Toolkit for simplified state management
