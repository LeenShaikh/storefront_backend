# Storefront Backend API

A backend API for an e-commerce (Storefront) application built using **Node.js, Express, TypeScript, PostgreSQL, and JWT**.
The API provides functionality for managing users, products, orders, and associating products with orders.

## Requirements

Make sure you have the following requirements installed before running the project:

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/) (or Docker)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) (Optional, but easier)

## Setup and Operation

### 1. Clone the repository

git clone https://github.com/YOUR_USERNAME/storefront-backend.git
cd storefront-backend

### 2. Installing packages

npm install

### 3. Create the .env file

DATABASE_URL=postgres://postgres:storefrontbackendproject2@localhost:5433/storefront
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=2h

### 4. Start the database

If you have Docker: **docker-compose up -d**
Or create the database manually in PostgreSQL: **CREATE DATABASE storefront;**

### 5. Run migrations

npm run migrate:up

### 6. Start the server

npm run dev

The API will run on: **http://localhost:3000**

## Database

The project contains the following tables:

- **users** : User information (id, first_name, last_name, email, password_hash)

- **products** : Products (id, name, price, category)

- **orders** : Orders (id, user_id, status)

- **order_products** : Linking products to orders (id, order_id, product_id, quantity)

## API Endpoints

### Auth

- POST /auth/login → Login (returns a JWT token)

### Users

- POST /users/signup → Register a new user (open)

- GET /users → Return all users (protected with a JWT)

- GET /users/:id → Return a specific user (protected)

- PUT /users/:id → Update a user (protected)

- DELETE /users/:id → Delete a user (protected)

### Products

- GET /products → Display all products (open)

- GET /products/:id → Display a single product (open)

- POST /products → Add a new product (protected)

- PUT /products/:id → Update a product (protected)

- DELETE /products/:id → Delete a product (protected)

### Orders

- GET /orders → Display all orders (protected)

- GET /orders/:id → View a single order (protected)

- POST /orders → Create a new order (protected)

- PUT /orders/:id → Update order status (protected)

- DELETE /orders/:id → Delete an order (protected)

### Order-Products

- POST /orders/:id/products → Add a product to an order (protected)

- GET /orders/:id/products → View products within an order (protected)

- DELETE /orders/:id/products/:productId → Remove a product from an order (protected)



## Tests API endpoints

### Using Vitest

I use **Vitest** for testing all API endpoints, including Users, Auth, Products, Orders, and OrderProducts.

#### Authentication Token
Some API endpoints are protected and require a JWT token.
To generate a token for tests:

- Use the /auth/login endpoint with a valid user.
- Copy the token from the response.
- Include this token in the Authorization header as:
Authorization: Bearer <YOUR_TOKEN_HERE>
All protected route tests must use a valid token to pass successfully.

#### Running Tests
To run all API tests:
`npm test:api`
This will run all Vitest test suites.

- Make sure the server is not running separately; Vitest will start the app internally.

### Using Postman

for example :

- Sign up:
  `POST http://localhost:3000/users/signup`
Body:
```json
{
"first_name": "Leen",
"last_name": "Shaikh",
"email": "leen@example.com",
"password": "password123"
}
```
- Login:
 `POST http://localhost:3000/auth/login`
  Body:
``` json
{
"email": "leen@example.com",
"password": "password123"
}

- Response:

{ "token": "eyJ..." }
```
**Using a token:**
Copy the token and place it in a header:
Authorization: Bearer <your_token_here>

Try any protected endpoint like this:
`GET http://localhost:3000/users`


## Unit Tests
Unit tests were created for all core models in the project using Vitest.
Unit tests include:
- UserModel: Tests user creation, update, deletion, query by ID, and password authentication.

- ProductModel: Tests product creation, update, deletion, and query by ID.

- OrderModel: Tests order creation, update, deletion, and query by ID.

- OrderProductModel: Tests linking products to orders, updating, deleting, and querying by ID.
All of these tests ensure that basic database operations are working properly before models are used in the project.

#### Running Tests
To run all API tests:
`npm test:models`
This will run all Vitest test suites.

## Notes

- All protected endpoints require a JWT token in the Authorization header.

- The token is valid for two hours (editable from .env).

- Passwords are stored encrypted (bcrypt).
