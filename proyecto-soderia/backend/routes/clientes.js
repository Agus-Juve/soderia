const express = require('express');
const router = express.Router();
const db = require('../db'); // Importamos la conexión a la base de datos

// Ruta para agregar un cliente
router.post('/', (req, res) => {
  const { nombre, apellido, email, localidad, calle, altura, piso, departamento } = req.body;

  const sql = `
    INSERT INTO clientes (nombre, apellido, email, localidad, calle, altura, piso, departamento)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [nombre, apellido, email, localidad, calle, altura, piso, departamento], (err, result) => {
    if (err) {
      console.error('Error al insertar el cliente en la base de datos', err);
      return res.status(500).json({ message: 'Error al insertar el cliente' });
    }
    res.status(201).json({ message: 'Cliente agregado con éxito', clienteId: result.insertId });
  });
});

// Ruta para obtener los clientes
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM clientes';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al obtener los clientes', err);
      return res.status(500).json({ message: 'Error al obtener los clientes' });
    }
    res.status(200).json(results);
  });
});

// Ruta para obtener un cliente por su ID
router.get('/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'SELECT * FROM clientes WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error al obtener cliente:', err);
      return res.status(500).json({ message: 'Error al obtener cliente' });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    res.status(200).json(result[0]);
  });
});

// Ruta para eliminar un cliente
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM clientes WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar cliente:', err);
      return res.status(500).json({ message: 'Error al eliminar cliente' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    res.status(200).json({ message: 'Cliente eliminado con éxito' });
  });
});

// Ruta para modificar un cliente
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, email, localidad, calle, altura, piso, departamento } = req.body;

  const sql = `
    UPDATE clientes 
    SET nombre = ?, apellido = ?, email = ?, localidad = ?, calle = ?, altura = ?, piso = ?, departamento = ?
    WHERE id = ?
  `;

  db.query(sql, [nombre, apellido, email, localidad, calle, altura, piso, departamento, id], (err, result) => {
    if (err) {
      console.error('Error al modificar cliente:', err);
      return res.status(500).json({ message: 'Error al modificar cliente' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    res.status(200).json({ message: 'Cliente modificado con éxito' });
  });
});

module.exports = router;
