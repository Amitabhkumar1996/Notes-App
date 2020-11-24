const { createConnection } = require("typeorm");
require('dotenv').config()

BaseConnection = async () => {
  const connection = await createConnection({
    type: process.env.DEV_DB_TYPE,
    host: process.env.DEV_DB_HOST,
    port: process.env.DEV_DB_PORT,
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_DATABASE,
    synchronize: false,
    logging: false,
    entities: [
      require("./entity/UserSchema"),
      require("./entity/noteSchema")
    ]
  });

  return connection;
};

module.exports = BaseConnection();