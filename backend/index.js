const express = require("express");
const cors = require("cors");

const prestamosRoutes = require("./routes/prestamos");
const pagosRoutes = require("./routes/pagos");
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const authMiddleware = require("./middlewares/authMiddleware");
const clientesRoutes = require("./routes/clientes");

const app = express();
app.use(
  cors({
    origin: [
      "https://loanflow.vercel.app", // ✅ tu frontend en producción
      "http://localhost:3000", // ✅ para desarrollo local
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/prestamos", authMiddleware, prestamosRoutes);
app.use("/pagos", authMiddleware, pagosRoutes);
app.use("/dashboard", authMiddleware, dashboardRoutes);
app.use("/auth", authRoutes);
app.use("/clientes", authMiddleware, clientesRoutes);

app.listen(process.env.PORT || 3001, () => {
  console.log("Servidor corriendo ...");
});
