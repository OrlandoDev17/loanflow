const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Token requerido" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded; // { id, correo }
    next();
  } catch (err) {
    console.error("Error al verificar token:", err);
    res.status(403).json({ error: "Token inválido o expirado" });
  }
}

module.exports = verifyToken;
