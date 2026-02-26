const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

console.log('\n=== CHECKING SQLITE DATABASE ===\n');

// First, let's see what tables exist
db.all(`
  SELECT name FROM sqlite_master 
  WHERE type='table' 
  ORDER BY name;
`, [], (err, tables) => {
  if (err) {
    console.error('Error fetching tables:', err);
    db.close();
    return;
  }
  
  console.log('📊 EXISTING TABLES:');
  console.table(tables);
  
  if (tables.length === 0) {
    console.log('\n⚠️  No tables found! The database is empty.');
    console.log('💡 Run the backend server first to create tables: npm run start:dev\n');
    db.close();
  } else {
    db.close();
  }
});
