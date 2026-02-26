const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

console.log('\n🔄 Setting all orders to Delivered status...\n');

// Update all orders to Delivered
db.run('UPDATE `order` SET status = ? WHERE 1=1', ['Delivered'], function(err) {
    if (err) {
        console.error('❌ Error:', err.message);
        db.close();
        return;
    }
    
    if (this.changes === 0) {
        console.log('⚠️  No orders found. Please:');
        console.log('   1. Login to the app');
        console.log('   2. Add products to cart');
        console.log('   3. Place an order');
        console.log('   4. Run this script again');
    } else {
        console.log(`✅ Success! Updated ${this.changes} order(s) to "Delivered" status`);
        console.log('\n📝 Now refresh the Orders page to see the "Rate Product" buttons!');
    }
    
    db.close();
});
