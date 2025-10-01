const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ error: "Token no proporcionado" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // 🔑 aquí puedes guardar todo el objeto decodificado
    req.usuario = decoded; // { id, correo }
    next();
  } catch (err) {
    res.status(401).json({ error: "Token inválido o expirado" });
  }
}

module.exports = authMiddleware;
