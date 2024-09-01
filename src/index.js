//inicia la aplicacion, llama el codigo de express
// CRUD/src/index.js
import app from "./app.js"
import { connectDB } from "./db.js"

connectDB();
app.listen(4000)
console.log('Server on port', 4000)