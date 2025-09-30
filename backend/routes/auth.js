const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

router.post("/register", async (req, res) => {
  const { nombre, correo, password } = req.body;

  if (!nombre || !correo || !password) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  try {
    const hash = await bcrypt.hash(password, 10);
    const usuario = await prisma.usuario.create({
      data: { nombre, correo, password: hash },
    });
    res.status(201).json({ mensaje: "Usuario creado", usuario });
  } catch (error) {
    console.error("Error al registrar:", error); // 👈 esto te mostrará el error real en consola

    // Prisma error por correo duplicado
    if (error.code === "P2002" && error.meta?.target?.includes("correo")) {
      return res.status(400).json({ error: "El correo ya está registrado" });
    }

    // Error por campos faltantes u otros
    return res
      .status(500)
      .json({ error: "Error interno al registrar usuario" });
  }
});

router.post("/login", async (req, res) => {
  const { correo, password } = req.body;
  const usuario = await prisma.usuario.findUnique({ where: { correo } });
  if (!usuario)
    return res.status(401).json({ error: "Credenciales inválidas" });

  const match = await bcrypt.compare(password, usuario.password);
  if (!match) return res.status(401).json({ error: "Credenciales inválidas" });

  const token = jwt.sign({ id: usuario.id }, "admin", { expiresIn: "1d" });
  res.json({
    token,
    usuario: { id: usuario.id, nombre: usuario.nombre, correo: usuario.correo },
  });
});

module.exports = router;
