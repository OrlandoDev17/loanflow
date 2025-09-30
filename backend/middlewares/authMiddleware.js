const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ error: "Token no proporcionado" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "admin"); // 👈 clave debe coincidir con la del login
    req.usuarioId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ error: "Token inválido o expirado" });
  }
}

module.exports = authMiddleware;
