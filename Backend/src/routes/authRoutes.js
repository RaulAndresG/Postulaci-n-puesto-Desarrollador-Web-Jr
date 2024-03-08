const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const dbURI = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;
const usuariosCollection = 'Usuarios'; 

const connectToDatabase = async () => {
    const client = new MongoClient(dbURI);
    await client.connect();
    return client.db(dbName);
}

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const db = await connectToDatabase();
        const collection = db.collection(usuariosCollection);

        const user = await collection.findOne({ username });

        if (user && typeof user.password === 'string') {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                res.status(200).json({ message: 'Inicio de sesión exitoso' });
            } else {
                res.status(401).json({ message: 'Credenciales inválidas' });
            }
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el inicio de sesión' });
    }
});


router.post('/logout', (req, res) => {
    // Implementación de cierre de sesión (puede ser simplemente responder con un mensaje)
    res.status(200).json({ message: 'Cierre de sesión exitoso' });
});

module.exports = router;
