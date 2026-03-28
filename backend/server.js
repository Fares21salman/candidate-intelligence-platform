// server.js
import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";

const PORT = 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
});