const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const prestamos = await prisma.prestamo.findMany({
      include: { cliente: true, pagos: true },
    });
    res.json(prestamos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener préstamos" });
  }
});

router.post("/", async (req, res) => {
  const {
    clienteId,
    monto,
    cuotas,
    interes,
    fechaInicio,
    frecuenciaPago,
    nota,
  } = req.body;
  try {
    const prestamo = await prisma.prestamo.create({
      data: {
        clienteId,
        monto,
        cuotas,
        interes,
        fechaInicio: new Date(fechaInicio),
        frecuenciaPago,
        nota,
      },
    });
    res.json(prestamo);
  } catch (error) {
    res.status(500).json({ error: "Error al crear préstamo" });
  }
});

module.exports = router;
