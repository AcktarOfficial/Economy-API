import { Options } from "@mikro-orm/core";
import { UserBalance } from "./entities/UserBalance";
import Config from "../config.json");

const config: Options = {
  entities: [UserBalance],
  dbName: Config.DB_NAME || "economy.db",
  type: Config.DB_TYPE === "mongo" ? "mongo" : "sqlite",
  clientUrl: Config.MONGO_URL || undefined,
  debug: "production",
};

export default config;
