import "dotenv/config.js";
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
      tableName: 'knex_migrations'
    }
  }
};

export default config;