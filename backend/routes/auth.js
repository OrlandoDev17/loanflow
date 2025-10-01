const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

// Registro
router.post("/register", async (req, res) => {
  const { nombre, correo, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const usuario = await prisma.usuario.create({
      data: { nombre, correo, password: hashedPassword },
    });

    const token = jwt.sign(
      { id: usuario.id, correo: usuario.correo },
      process.env.JWT_SECRET, // 🔑 usar siempre la misma clave
      { expiresIn: "1d" }
    );

    res.json({ usuario, token });
  } catch (error) {
    console.error(error);
    if (error.code === "P2002") {
      return res.status(400).json({ error: "El correo ya está registrado" });
    }
    res.status(500).json({ error: "Error al registrar usuario" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { correo, password } = req.body;
  try {
    const usuario = await prisma.usuario.findUnique({ where: { correo } });
    if (!usuario) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const match = await bcrypt.compare(password, usuario.password);
    if (!match) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { id: usuario.id, correo: usuario.correo },
      process.env.JWT_SECRET, // 🔑 unificado
      { expiresIn: "1d" }
    );

    res.json({
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
});

module.exports = router;
