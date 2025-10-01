const express = require("express");
const cors = require("cors");

const prestamosRoutes = require("./routes/prestamos");
const pagosRoutes = require("./routes/pagos");
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const authMiddleware = require("./middlewares/authMiddleware");
const clientesRoutes = require("./routes/clientes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/prestamos", authMiddleware, prestamosRoutes);
app.use("/pagos", authMiddleware, pagosRoutes);
app.use("/dashboard", authMiddleware, dashboardRoutes);
app.use("/auth", authRoutes);
app.use("/clientes", authMiddleware, clientesRoutes);

app.listen(process.env.PORT || 3001, () => {
  console.log("Servidor corriendo ...");
});
