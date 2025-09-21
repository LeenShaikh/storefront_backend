/** @type {import('node-pg-migrate').Migration} */
export const up = (pgm) => {
  // users table
  pgm.createTable('users', {
    id: 'id',
    first_name: { type: 'varchar(50)', notNull: true },
    last_name: { type: 'varchar(50)', notNull: true },
    email: { type: 'varchar(100)', notNull: true, unique: true },
    password: { type: 'varchar(255)', notNull: true },
  });

  // products table
  pgm.createTable('products', {
    id: 'id',
    name: { type: 'varchar(100)', notNull: true },
    price: { type: 'numeric(10,2)', notNull: true },
    description: { type: 'text' },
    category: { type: 'varchar(50)' },
  });

  // orders table
  pgm.createTable('orders', {
    id: 'id',
    user_id: { type: 'integer', notNull: true, references: '"users"', onDelete: 'CASCADE' },
    status: { type: 'varchar(20)', default: 'active' },
    created_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
  });

  // order_products table
  pgm.createTable('order_products', {
    id: 'id',
    order_id: { type: 'integer', notNull: true, references: '"orders"', onDelete: 'CASCADE' },
    product_id: { type: 'integer', notNull: true, references: '"products"', onDelete: 'CASCADE' },
    quantity: { type: 'integer', default: 1 },
  });
};

export const down = (pgm) => {
  pgm.dropTable('order_products');
  pgm.dropTable('orders');
  pgm.dropTable('products');
  pgm.dropTable('users');
};
