# REQUIREMENTS

This file contains details of the requirements for the Storefront Backend project.

---

## API Routes

### Auth
| Route             | Method | Description           | Protected |
|-------------------|--------|-----------------------|-----------|
| `/auth/login`     | POST   | Login (returns JWT)   | ❌ No     |

### Users
| Route             | Method | Description           | Protected |
|-------------------|--------|-----------------------|-----------|
| `/users/signup`   | POST   | Create a new user     | ❌ No    |
| `/users`          | GET    | Show all users          ✅ Yes   |
| `/users/:id`      | GET    | Fetch a specific user | ✅ Yes   |
| `/users/:id`      | PUT    | User update           | ✅ Yes   |
| `/users/:id`      | DELETE | Delete user           | ✅ Yes   |

### Products
| Route             | Method | Description            | Protected |
|-------------------|--------|------------------------|-----------|
| `/products`       | GET    | Show all products       | ❌ No   |
| `/products/:id`   | GET    | Fetch a specific product| ❌ No   |
| `/products`       | POST   | Add a new product       | ✅ Yes  |
| `/products/:id`   | PUT    | Update product          | ✅ Yes  |
| `/products/:id`   | DELETE | Delete product          | ✅ Yes  |

### Orders
| Route             | Method | Description           | Protected |
|-------------------|--------|-----------------------|-----------|
| `/orders`         | GET    | Show all orders       | ✅ Yes   |
| `/orders/:id`     | GET    | Fetch a specific order| ✅ Yes   |
| `/orders`         | POST   | Create a new order    | ✅ Yes   |
| `/orders/:id`     | PUT    | Update order status   | ✅ Yes   |
| `/orders/:id`     | DELETE | Delete order          | ✅ Yes   |

### Order-Products
| Route                              | Method | Description                     | Protected |
|------------------------------------|--------|---------------------------------|-----------|
| `/orders/:id/products`             | POST   | Add a product to an order       | ✅ Yes   |
| `/orders/:id/products`             | GET    | Display products within an order| ✅ Yes   |
| `/orders/:id/products/:product_id` | DELETE | Delete a product from the order | ✅ Yes   |

---

## Database Schema

### users
| Column       | Type        | Constraints              |
|--------------|------------|--------------------------|
| id           | SERIAL PK  | PRIMARY KEY              |
| first_name   | VARCHAR    | NOT NULL                 |
| last_name    | VARCHAR    | NOT NULL                 |
| email        | VARCHAR    | UNIQUE, NOT NULL         |
| password     | VARCHAR    | NOT NULL (bcrypt hash)   |

### products
| Column       | Type        | Constraints              |
|--------------|------------|--------------------------|
| id           | SERIAL PK  | PRIMARY KEY              |
| name         | VARCHAR    | NOT NULL                 |
| price        | NUMERIC    | NOT NULL                 |
| category     | VARCHAR    |                          |

### orders
| Column       | Type        | Constraints              |
|--------------|------------|--------------------------|
| id           | SERIAL PK  | PRIMARY KEY              |
| user_id      | INT        | REFERENCES users(id)     |
| status       | VARCHAR    | (active, completed)      |

### order_products
| Column       | Type        | Constraints                     |
|--------------|------------|---------------------------------|
| id           | SERIAL PK  | PRIMARY KEY                     |
| order_id     | INT        | REFERENCES orders(id)           |
| product_id   | INT        | REFERENCES products(id)         |
| quantity     | INT        | NOT NULL                        |

---

## Authentication

- The token (JWT) is generated when you login at `/auth/login`.
- Protected endpoints require sending **Authorization Header**: Authorization: Bearer <token>
- Token validity: 2 hours (editable from the `.env` file)
