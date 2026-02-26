const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

// First, show current orders
console.log('\n=== CURRENT ORDERS ===');
db.all('SELECT id, status, createdAt FROM orders', [], (err, rows) => {
    if (err) {
        console.error('Error fetching orders:', err);
        return;
    }
    
    if (rows.length === 0) {
        console.log('No orders found in database');
        db.close();
        return;
    }
    
    console.table(rows);
    
    // Update all orders to Completed status
    console.log('\n=== UPDATING ORDERS TO COMPLETED ===');
    db.run('UPDATE orders SET status = ? WHERE 1=1', ['Completed'], function(err) {
        if (err) {
            console.error('Error updating orders:', err);
        } else {
            console.log(`✅ Updated ${this.changes} orders to "Completed" status`);
        }
        
        // Show updated orders
        console.log('\n=== UPDATED ORDERS ===');
        db.all('SELECT id, status, createdAt FROM orders', [], (err, rows) => {
            if (err) {
                console.error('Error fetching updated orders:', err);
            } else {
                console.table(rows);
            }
            db.close();
        });
    });
});
