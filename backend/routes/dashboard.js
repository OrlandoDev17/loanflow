const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const totalClientes = await prisma.cliente.count();
    const totalPrestamos = await prisma.prestamo.count();
    const totalPagos = await prisma.pago.count();

    const montoPrestado = await prisma.prestamo.aggregate({
      _sum: { monto: true },
    });
    const montoPagado = await prisma.pago.aggregate({ _sum: { monto: true } });

    res.json({
      totalClientes,
      totalPrestamos,
      totalPagos,
      montoPrestado: montoPrestado._sum.monto || 0,
      montoPagado: montoPagado._sum.monto || 0,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener resumen" });
  }
});

module.exports = router;
