import { knex, Knex } from "knex";
import { DBConfigs } from "../../configs/config";

export const connectionInfo: Knex.MySqlConnectionConfig = {
	host: DBConfigs.DB_HOST,
	port: DBConfigs.DB_PORT,
	user: DBConfigs.DB_USER_NAME,
	password: DBConfigs.DB_PASSWORD,
	database: DBConfigs.DB_SCHEMA,
};

export const DbConnection: Knex = knex({
	client: "mysql2",
	connection: connectionInfo,
	pool: { min: 0, max: 10 },
});
