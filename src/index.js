import app from "./config/app.js";
import dbConnect from "./config/dbConnect";

require("dotenv").config();
const PORT = process.env.PORT || 4000;

dbConnect();

// -_- ---------- Inicia el servidor con 0.0.0.0 para que sea accesible desde cualquier dirección IP ---------- -_- //
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor escuchando en el puerto:${PORT}`);
});
