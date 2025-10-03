const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

// Obtener clientes del usuario autenticado
router.get("/", verifyToken, async (req, res) => {
  try {
    const clientes = await prisma.cliente.findMany({
      where: { usuarioId: req.usuario.id }, // ahora sí existe
      include: { prestamos: true },
    });
    res.json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener clientes" });
  }
});

// Crear cliente asociado al usuario autenticado
router.post("/", verifyToken, async (req, res) => {
  const { nombre, apellido, telefono, correo, direccion, cedula } = req.body;
  try {
    const cliente = await prisma.cliente.create({
      data: {
        nombre,
        apellido,
        telefono,
        correo,
        direccion,
        cedula: Number(cedula),
        usuarioId: req.usuario.id, // 🔑 ahora sí se guarda bien
      },
    });
    res.json(cliente);
  } catch (error) {
    console.error("🔥 Prisma error:", error);
    res.status(500).json({
      error: error.message || "Error desconocido al crear cliente",
      stack: error.stack,
    });
  }
});

module.exports = router;
