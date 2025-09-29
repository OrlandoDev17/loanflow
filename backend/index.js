// Importamos las dependencias necesarias
const express = require("express"); // Framework para crear el servidor HTTP
const cors = require("cors"); // Middleware para permitir peticiones desde otros dominios
const { PrismaClient } = require("@prisma/client"); // Cliente Prisma para interactuar con la base de datos

// Inicializamos Express y Prisma
const app = express();
const prisma = new PrismaClient();

// Middlewares
app.use(cors()); // Permite peticiones desde el frontend
app.use(express.json()); // Permite recibir datos en formato JSON

// =======================
// Rutas POST (crear datos)
// =======================

// Crear un nuevo cliente
app.post("/clientes", async (req, res) => {
  const { nombre, apellido, telefono, correo, direccion } = req.body;

  try {
    const cliente = await prisma.cliente.create({
      data: { nombre, apellido, telefono, correo, direccion },
    });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: "Error al crear cliente" });
  }
});

// Crear un nuevo préstamo
app.post("/prestamos", async (req, res) => {
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

// Registrar un nuevo pago
app.post("/pagos", async (req, res) => {
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

// =======================
// Rutas GET (consultar datos)
// =======================

// Obtener todos los clientes con sus préstamos
app.get("/clientes", async (req, res) => {
  try {
    const clientes = await prisma.cliente.findMany({
      include: { prestamos: true },
    });
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener clientes" });
  }
});

// Obtener todos los préstamos con cliente y pagos
app.get("/prestamos", async (req, res) => {
  try {
    const prestamos = await prisma.prestamo.findMany({
      include: {
        cliente: true,
        pagos: true,
      },
    });
    res.json(prestamos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener préstamos" });
  }
});

// Obtener todos los pagos con préstamo y cliente
app.get("/pagos", async (req, res) => {
  try {
    const pagos = await prisma.pago.findMany({
      include: {
        prestamo: {
          include: { cliente: true },
        },
      },
    });
    res.json(pagos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener pagos" });
  }
});

// =======================
// Iniciar el servidor
// =======================

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
