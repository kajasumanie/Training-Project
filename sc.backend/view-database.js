const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

console.log('\n=== Sumanie's Shop DATABASE ===\n');

// View all users
db.all('SELECT * FROM users', [], (err, users) => {
  if (err) {
    console.error('Error fetching users:', err);
    return;
  }
  console.log('📱 USERS:');
  console.table(users);
});

// View all products
db.all('SELECT * FROM products', [], (err, products) => {
  if (err) {
    console.error('Error fetching products:', err);
    return;
  }
  console.log('\n🛍️  PRODUCTS:');
  console.table(products);
});

// View all orders
db.all('SELECT * FROM orders', [], (err, orders) => {
  if (err) {
    console.error('Error fetching orders:', err);
    return;
  }
  console.log('\n📦 ORDERS:');
  console.table(orders);
});

// View all order items with details
db.all(`
  SELECT 
    oi.id,
    oi.orderId,
    oi.productId,
    oi.productTitle,
    oi.productPrice,
    oi.quantity,
    oi.totalPrice
  FROM orderItems oi
`, [], (err, orderItems) => {
  if (err) {
    console.error('Error fetching order items:', err);
    return;
  }
  console.log('\n📋 ORDER ITEMS:');
  console.table(orderItems);
});

// View ratings
db.all('SELECT * FROM ratings', [], (err, ratings) => {
  if (err) {
    console.error('Error fetching ratings:', err);
  } else {
    console.log('\n⭐ RATINGS:');
    console.table(ratings);
  }
  
  // Close database connection after last query
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
    }
    console.log('\n✅ Database inspection complete!\n');
  });
});
