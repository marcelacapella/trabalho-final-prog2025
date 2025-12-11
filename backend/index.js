import express from "express";
import cors from "cors";

import livrosRoutes from "./routes/livrosRoutes.js";
import emprestimoRoutes from "./routes/emprestimoRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Rotas do projeto

app.use("/livros", livrosRoutes);
app.use("/emprestimos", emprestimoRoutes);

// Iniciar servidor
if (process.env.VERCEL) {
  // Não inicia servidor — Vercel usa Serverless
} else {
  app.listen(3000, () => console.log("rodando local"));
}

export default app;