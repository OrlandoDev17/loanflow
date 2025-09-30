const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const pagos = await prisma.pago.findMany({
      include: { prestamo: { include: { cliente: true } } },
    });
    res.json(pagos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener pagos" });
  }
});

router.post("/", async (req, res) => {
  const { prestamoId, fecha, monto } = req.body;
  try {
    const pago = await prisma.pago.create({
      data: {
        prestamoId,
        fecha: new Date(fecha),
        monto,
      },
    });
    res.json(pago);
  } catch (error) {
    res.status(500).json({ error: "Error al registrar pago" });
  }
});

module.exports = router;
