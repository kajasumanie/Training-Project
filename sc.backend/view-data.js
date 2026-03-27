const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

console.log('=== DATABASE DATA ===\n');

// Get all tables
db.all("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name", [], (err, tables) => {
    if (err) {
        console.error('Error:', err);
        db.close();
        return;
    }
    
    if (tables.length === 0) {
        console.log('No tables found in database.');
        db.close();
        return;
    }
    
    let completed = 0;
    const totalTables = tables.length;
    
    tables.forEach(table => {
        const tableName = table.name;
        
        // Get all data from table
        db.all(`SELECT * FROM ${tableName}`, [], (err, rows) => {
            if (err) {
                console.error(`Error getting data from table ${tableName}:`, err);
            } else {
                console.log(`\n📊 Table: ${tableName} (${rows.length} rows)`);
                console.log('─'.repeat(100));
                if (rows.length > 0) {
                    console.table(rows);
                } else {
                    console.log('  (empty table)');
                }
            }
            
            completed++;
            if (completed === totalTables) {
                console.log('\n✅ Database view complete');
                db.close();
            }
        });
    });
});
