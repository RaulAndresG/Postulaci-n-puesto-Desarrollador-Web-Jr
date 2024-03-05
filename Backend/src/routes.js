const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');
const moment = require('moment');

require('dotenv').config();

const dbURI = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;
const pacientesCollection = 'pacientes';
const historiasClinicasCollection = 'historias_clinicas';

// Middleware para conectar a la base de datos
const connectToDatabase = async () => {
    const client = new MongoClient(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    return client.db(dbName);
}

// Obtener todos los pacientes
router.get('/pacientes', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection(pacientesCollection);
        const pacientes = await collection.find().toArray();
        res.json(pacientes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener pacientes" });
    }
});

// Crear un nuevo paciente
router.post('/pacientes', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection(pacientesCollection);
        const result = await collection.insertOne(req.body);
        res.status(201).json({ message: "Paciente creado exitosamente", data: result.ops ? result.ops[0] : null });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear paciente" });
    }
});

// Obtener todas las historias clínicas
router.get('/historiasclinicas', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection(historiasClinicasCollection);
        const historiasClinicas = await collection.find().toArray();
        res.json(historiasClinicas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener historias clínicas" });
    }
});

// Crear una nueva historia clínica
router.post('/historiasclinicas', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection(historiasClinicasCollection);
        const result = await collection.insertOne(req.body);
        res.status(201).json({ message: "Historia clínica creada exitosamente", data: result.ops[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear historia clínica" });
    }
});

// Actualizar un paciente por su ID
router.put('/pacientes/:id', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection(pacientesCollection);
        const result = await collection.updateOne({ _id: ObjectId(req.params.id) }, { $set: req.body });
        res.json({ message: "Paciente actualizado exitosamente", data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar paciente" });
    }
});

// Actualizar una historia clínica por su ID
router.put('/historiasclinicas/:id', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection(historiasClinicasCollection);
        const result = await collection.updateOne({ _id: ObjectId(req.params.id) }, { $set: req.body });
        res.json({ message: "Historia clínica actualizada exitosamente", data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar historia clínica" });
    }
});

// Eliminar un paciente por su ID
router.delete('/pacientes/:id', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection(pacientesCollection);
        const result = await collection.deleteOne({ _id: ObjectId(req.params.id) });
        res.json({ message: "Paciente eliminado exitosamente", data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar paciente" });
    }
});

// Eliminar una historia clínica por su ID
router.delete('/historiasclinicas/:id', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection(historiasClinicasCollection);
        const result = await collection.deleteOne({ _id: ObjectId(req.params.id) });
        res.json({ message: "Historia clínica eliminada exitosamente", data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar historia clínica" });
    }
});

module.exports = router;
