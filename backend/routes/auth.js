const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

router.post("/register", async (req, res) => {
  const { nombre, correo, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const usuario = await prisma.usuario.create({
      data: { nombre, correo, password: hashedPassword },
    });

    // 🔑 Generar token al registrarse
    const token = jwt.sign(
      { id: usuario.id, correo: usuario.correo },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ usuario, token });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar usuario" });
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
