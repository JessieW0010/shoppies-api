import "dotenv/config.js";
import path from 'path';
const __dirname = path.resolve();
// Update with your config settings.

const config = {
  development: {
    client: 'postgresql',
    connection: {
      host: process.env.DEVELOPMENT_DB_HOST || "localhost",
      database: process.env.DEVELOPMENT_DB,
      user: process.env.DEVELOPMENT_DB_USER,
      password: process.env.DEVELOPMENT_DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/migrations',
      tableName: 'knex_migrations'
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: __dirname + '/migrations',
      tableName: 'knex_migrations'
    }
  }
};

export default config;