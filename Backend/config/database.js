const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

async function conectarMdb() {
    try {
        const client = new MongoClient(MONGO_URI /* , { useNewUrlParser: true, useUnifiedTopology: true }  */);
        await client.connect();
        console.log("MongoDB conectado");
        return client.db(dbName);
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error);
        throw error;
    }
}

module.exports = conectarMdb;

