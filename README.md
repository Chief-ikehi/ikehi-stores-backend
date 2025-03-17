# Ikehi Stores Backend

This is the backend API for Ikehi Stores, an e-commerce application built with Node.js, Express, TypeScript, Prisma, and PostgreSQL.

## Features

- User authentication (register, login)
- Product management
- Shopping cart functionality
- Order processing
- RESTful API

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Docker and Docker Compose (for running PostgreSQL)

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up the database:

```bash
# Start PostgreSQL using Docker
docker-compose up -d

# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed the database
npm run prisma:seed
```

4. Start the development server:

```bash
npm run dev
```

The server will be running at http://localhost:3001.

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
DATABASE_URL="postgresql://user_tobi:user_password@localhost:5432/ecommerce1"
JWT_SECRET="your-super-secret-key-change-in-production"
PORT=3001
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive a token

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a specific product
- `POST /api/products` - Create a new product (admin only)
- `PUT /api/products/:id` - Update a product (admin only)
- `DELETE /api/products/:id` - Delete a product (admin only)

### Cart

- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add a product to the cart
- `PUT /api/cart/update` - Update cart item quantity
- `DELETE /api/cart/remove` - Remove an item from the cart
- `DELETE /api/cart/clear` - Clear the cart

### Orders

- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get a specific order
- `POST /api/orders` - Create a new order
- `PATCH /api/orders/:id/status` - Update order status (admin only)

## License

MIT 