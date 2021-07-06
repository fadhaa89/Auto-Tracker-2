require('dotenv').config()
const db_host = process.env.DB_HOST;
const db_port = process.env.DB_PORT;
const db = process.env.DB_DATABASE;
const key = process.env.SECRET_KEY;

module.exports = {
    url: `mongodb://${db_host}:${db_port}/${db}`,
    SECRET_KEY: key
}