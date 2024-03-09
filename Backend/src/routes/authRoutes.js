const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
require('dotenv').config();

const dbURI = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;
const usuariosCollection = 'Usuarios'; 

const connectToDatabase = async () => {
    const client = new MongoClient(dbURI);
    await client.connect();
    return client.db(dbName);
};

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const db = await connectToDatabase();
        const collection = db.collection(usuariosCollection);

        const user = await collection.findOne({ username });

        if (user && user.password === password) {
            if (user.roles.includes('admin')  ) {

                res.status(200).json({ message: 'Inicio de sesión exitoso', user });
            } else {
                res.status(403).json({ message: 'No tiene roles para administrar la información' });
            }
        } else {
            res.status(401).json({ message: 'Credenciales inválidas' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el inicio de sesión' });
    }
});






router.post('/logout', (req, res) => {
    try {
        if (req.session && req.session.userId) {
            req.session.destroy((err) => {
                if (err) {
                    console.error('Error al cerrar sesión:', err);
                    res.status(500).json({ message: 'Error al cerrar sesión' });
                } else {
                    res.status(200).json({ message: 'Cierre de sesión exitoso' });
                }
            });
        } else {
            res.status(401).json({ message: 'No se puede cerrar sesión porque el usuario no está autenticado' });
        }
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        res.status(500).json({ message: 'Error al cerrar sesión' });
    }
});


module.exports = router;
