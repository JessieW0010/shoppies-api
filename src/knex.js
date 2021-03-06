import "dotenv/config.js";
import knex from "knex";
import config from "../knexfile.js";

const environment = process.env.NODE_ENV || "development";
const dbClient = knex(config[environment]);

process.on("SIGINT", () => dbClient.destroy(err => process.exit(err ? 1 : 0)));

export default dbClient;
