# REQUIREMENTS

This file contains details of the requirements for the Storefront Backend project.

---

## SQL Queries Examples

### Users Table

**SELECT all users**: `SELECT * FROM users;`
**SELECT user by ID**: `SELECT * FROM users WHERE id = 1;`
**SELECT user by email**: `SELECT * FROM users WHERE email = 'leen@example.com';`
**INSERT new user**: `INSERT INTO users (first_name, last_name, email, password_hash) VALUES ('Leen', 'Shaikh', 'leen@example.com', 'hashed_password');`
**UPDATE user information**: `UPDATE users SET first_name = 'Lama', last_name = 'Ali', email = 'lama@example.com' WHERE id = 1;`
**UPDATE user password**: `UPDATE users SET password_hash = 'new_hashed_password' WHERE id = 1;`
**DELETE user**: `DELETE FROM users WHERE id = 3;`

### Products Table

**SELECT all products**: `SELECT * FROM products;`
**SELECT product by ID**: `SELECT * FROM products WHERE id = 5;`
**SELECT products by category**: `SELECT * FROM products WHERE category = 'fruits';`
**INSERT new product**: `INSERT INTO products (name, price, category) VALUES ('Apple', 2.5, 'fruits');`
**UPDATE product**: `UPDATE products SET name = 'Orange', price = 3 WHERE id = 5;`
**DELETE product**: `DELETE FROM products WHERE id = 5;`

### Orders Table

**SELECT all orders**: `SELECT * FROM orders;`
**SELECT order by ID**: `SELECT * FROM orders WHERE id = 10;`
**SELECT orders for a specific user**: `SELECT * FROM orders WHERE user_id = 1;`
**INSERT new order**: `INSERT INTO orders (user_id, status) VALUES (1, 'active');`
**UPDATE order status**: `UPDATE orders SET status = 'completed' WHERE id = 10;`
**DELETE order**: `DELETE FROM orders WHERE id = 10;`

### Order_Products Table

**SELECT all products in orders**: `SELECT * FROM order_products;`
**SELECT products in a specific order**: `SELECT * FROM products p JOIN order_products op ON p.id = op.product_id WHERE op.order_id = 10;`
**INSERT product into order**: `INSERT INTO order_products (order_id, product_id, quantity) VALUES (10, 5, 3);`
**UPDATE quantity of product in an order**: `UPDATE order_products SET quantity = 5 WHERE order_id = 10 AND product_id = 5;`
**DELETE product from order**: `DELETE FROM order_products WHERE order_id = 10 AND product_id = 5;`

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
