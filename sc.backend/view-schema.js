const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

console.log('=== DATABASE SCHEMA ===\n');

// Get all tables
db.all("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name", [], (err, tables) => {
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
        
        // Get table info (columns)
        db.all(`PRAGMA table_info(${tableName})`, [], (err, columns) => {
            if (err) {
                console.error(`Error getting info for table ${tableName}:`, err);
            } else {
                console.log(`\n📋 Table: ${tableName}`);
                console.log('─'.repeat(80));
                console.table(columns.map(col => ({
                    ID: col.cid,
                    Column: col.name,
                    Type: col.type,
                    NotNull: col.notnull ? 'YES' : 'NO',
                    Default: col.dflt_value || 'NULL',
                    PrimaryKey: col.pk ? 'YES' : 'NO'
                })));
            }
            
            completed++;
            if (completed === totalTables) {
                db.close();
            }
        });
    });
});
