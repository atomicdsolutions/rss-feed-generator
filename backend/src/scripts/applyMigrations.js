const fs = require('fs').promises;
const path = require('path');
const { supabaseAdmin } = require('../config/supabase');

async function applyMigrations() {
  try {
    console.log('Starting database migrations...');

    // Get all migration files
    const migrationsDir = path.join(__dirname, '../database/migrations');
    const files = await fs.readdir(migrationsDir);
    const migrationFiles = files
      .filter(f => f.endsWith('.sql'))
      .sort(); // Ensures migrations run in order

    // Apply each migration
    for (const file of migrationFiles) {
      console.log(`Applying migration: ${file}`);
      const migration = await fs.readFile(
        path.join(migrationsDir, file),
        'utf8'
      );

      // Split migration into individual statements
      const statements = migration
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0);

      // Execute each statement
      for (const statement of statements) {
        const { error } = await supabaseAdmin.rpc('exec_sql', {
          sql: statement
        });

        if (error) {
          throw new Error(`Error executing migration ${file}: ${error.message}`);
        }
      }

      console.log(`Successfully applied migration: ${file}`);
    }

    console.log('All migrations completed successfully');
  } catch (error) {
    console.error('Error applying migrations:', error);
    throw error;
  }
}

// Run migrations if called directly
if (require.main === module) {
  applyMigrations()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Migration failed:', error);
      process.exit(1);
    });
}

module.exports = { applyMigrations };