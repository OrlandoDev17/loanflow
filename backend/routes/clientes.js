const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const clientes = await prisma.cliente.findMany({
      include: { prestamos: true },
    });
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener clientes" });
  }
});

router.post("/", async (req, res) => {
  const { nombre, apellido, telefono, correo, direccion, cedula } = req.body;
  try {
    const cliente = await prisma.cliente.create({
      data: { nombre, apellido, telefono, correo, direccion, cedula },
    });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: "Error al crear cliente" });
  }
});

module.exports = router;
