# � Sumanie Shop - Modern E-Commerce Platform

A professional full-stack e-commerce application with advanced state management, built with React, Redux Toolkit, NestJS, and TypeORM. Features intelligent order caching, centralized notifications, product ratings for delivered orders, and a modern pink/fancy theme.

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
- ✅ Rate products after order delivery (logged-in users only)
- ✅ Add products to shopping cart
- ✅ Shopping cart with persistent storage (localStorage)
- ✅ Mini cart badge showing item count
- ✅ Adjust product quantities in cart
- ✅ Checkout and create orders
- ✅ View order history with product images and details
- ✅ Rate products from delivered orders
- ✅ Centralized notification system for user feedback

### Technical Features
- ✅ RESTful API architecture
- ✅ JWT authentication with access and refresh tokens
- ✅ Advanced Redux state management (5 slices with semantic naming)
- ✅ Order history caching (5-minute expiry)
- ✅ Centralized notification management
- ✅ Pagination for products
- ✅ Product search functionality
- ✅ Order captures product details at checkout time
- ✅ Rating system integrated with order delivery status
- ✅ Responsive Material-UI design with custom pink theme
- ✅ Redux Toolkit with RTK Query for API calls
- ✅ TypeScript for complete type safety
- ✅ Error handling with proper HTTP status codes
- ✅ Auto token refresh on 401 errors
- ✅ Product relations included in order responses

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
VITE_APP_NAME=Sumanie Shop
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

Sumanie Shop features a modern, fancy pink color scheme:
- **Primary Color**: Pink (#E91E63)
- **Secondary Color**: Orange (#FF9800)
- **Background**: Light pink gradients (#FFF0F5 / #1a0a1a)
- **Accents**: Gradient combinations with animations
- **Font**: Poppins (Google Fonts)

The design emphasizes:
- Fancy, modern aesthetics with gradients
- Smooth animations and floating effects
- Rounded corners (16px border radius)
- Box shadows and hover transforms
- Custom pink scrollbar with gradients
- Material Design principles with custom overrides

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
│   │   ├── OrderCard/     # Rating functionality for delivered orders
│   │   ├── RatingDialog/  # Modal for submitting ratings
│   │   ├── Topbar/
│   │   ├── SideNav/
│   │   └── ...
│   ├── features/          # Feature-based modules
│   │   ├── home/
│   │   ├── products/
│   │   ├── orders/
│   │   ├── cart/
│   │   ├── checkout/
│   │   └── login/         # Centered login form
│   ├── store/             # Redux store setup
│   │   ├── slices/        # Redux slices (5 slices)
│   │   │   ├── userAuthSlice.ts           # User authentication (formerly authSlice)
│   │   │   ├── shoppingCartSlice.ts       # Shopping cart (formerly cartSlice)
│   │   │   ├── applicationSlice.ts        # Theme & UI (formerly appSlice)
│   │   │   ├── notificationSlice.ts       # Toast notifications (NEW)
│   │   │   └── orderHistorySlice.ts       # Order caching (NEW)
│   │   ├── persistConfig.ts
│   │   └── store.ts
│   ├── models/            # TypeScript interfaces
│   ├── routes/            # Route definitions
│   ├── App.tsx            # Root component with pink theme
│   ├── App.css            # Global styles with fancy animations
│   ├── index.css          # Base styles with pink gradients
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
| VITE_APP_NAME | Application name | Sumanie Shop |
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

### Advanced State Management (5-Slice Architecture)
The application uses **5 Redux slices** with semantic naming for organized state management:

1. **userAuthSlice** (formerly authSlice)
   - State: `userAuth` (was `authR`)
   - Actions: `setLoginRedirect`, `updateAuthStatus`, `clearAuthState`
   - Persisted to localStorage via redux-persist
   - Properties: `isAuthenticated`, `requiresLogin`

2. **shoppingCartSlice** (formerly cartSlice)
   - State: `shoppingCart` (was `cart`)
   - Properties: `items` (was `orderItems`), `drawerOpen` (was `isCartOpen`), `totalItems`
   - Actions: `addProductToCart`, `removeProductFromCart`, `increaseQuantity`, `decreaseQuantity`, `emptyCart`
   - localStorage key: `user-cart-data`

3. **applicationSlice** (formerly appSlice)
   - State: `application` (was `app`)
   - Actions: `switchTheme`
   - Properties: `themeMode`, `sidebarCollapsed`

4. **notificationSlice** (NEW)
   - Centralized toast notification management
   - Actions: `showSuccess`, `showError`, `showWarning`, `showInfo`
   - Auto-generated unique IDs and timestamps
   - Notification history storage

5. **orderHistorySlice** (NEW)
   - Local order caching with 5-minute expiry
   - Actions: `setOrders`, `selectOrder`, `clearOrderCache`, `checkCacheValidity`
   - Selected order state for detail view

### Rating System
Product ratings follow e-commerce best practices:
- **Location**: Rating functionality is exclusively on the Orders page
- **Availability**: Only appears for orders with "Delivered" status
- **UX Pattern**: Users can only rate products they've received
- **Display**: Shows current product rating with star component (0.5 precision)
- **Action Button**: "Rate Product" button opens RatingDialog modal
- **Backend Integration**: Ratings update via RTK Query mutation (`useRateProductMutation`)
- **Product Relations**: Orders include full product data (id, averageRating, etc.)

### Login Page Design
- **Layout**: Centered single-column layout (no left panel)
- **Width**: 650px max width for optimal form display
- **Theme**: Animated gradient background with pink tones
- **Tabs**: Toggle between "Sign In" and "Create Account"
- **Animation**: Fade-in effect on page load

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
- Product relation (for rating functionality)

This ensures that order history remains accurate even if product details change in the future. Orders also include full product relations to enable rating functionality and display current product ratings.

### Order Status & Rating Flow
1. User places order (status: "Pending")
2. Order status updated to "Delivered" (manually or via admin script)
3. "Rate Product" button appears in OrderCard
4. User submits rating (1-5 stars with 0.5 precision)
5. Product's averageRating updates automatically
6. Rating persists and displays on product cards

**Helper Script**: `complete-orders.js` - Marks all orders as "Delivered" for testing rating feature

### Authentication Flow
1. User registers/logs in
2. Backend returns JWT access token (10 min) and refresh token (7 days)
3. Tokens stored in HTTP-only cookies
4. Refresh token automatically renews access token on 401 errors
5. Auth state persisted to survive page refreshes

### API Interceptor
Enhanced API layer with:
- Automatic token refresh on 401 errors
- Development mode logging for auth flows
- Custom headers (X-Requested-With)
- Error handling with user-friendly messages
- Renamed functions: `apiBaseQuery`, `apiQueryWithAuthRefresh`
- Uses `setLoginRedirect` action instead of `redirectToLogin`

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

- Sumanie - Full-stack Developer

## 🎯 Recent Improvements

### Redux Architecture Overhaul
- Restructured 3 existing slices with semantic naming conventions
- Created 2 new slices (notificationSlice, orderHistorySlice)
- Updated all imports across 10+ components
- Enhanced state management with clear, descriptive names

### UX Enhancements
- Moved rating functionality from ProductCard to OrderCard
- Ratings only available for delivered orders (industry standard)
- Simplified login page with centered layout
- Added product images to order cards with proper aspect ratios
- Fixed DOM nesting warnings and accessibility issues

### Backend Improvements
- Added product relations to order queries
- Created helper scripts for order status management
- Enhanced order service with nested relation loading

### Bug Fixes
- Fixed null reference errors in rating system
- Added defensive null checks for product data
- Fixed event propagation issues in nested components
- Corrected aria-hidden focus warnings with `disableRestoreFocus`

## 🙏 Acknowledgments

- Material-UI for the beautiful component library
- NestJS for the robust backend framework
- Redux Toolkit for simplified state management
