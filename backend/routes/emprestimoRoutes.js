import express from "express";
import {
  buscarLivro,
  marcarDisponivel,
  marcarEmprestado
} from "../dao/livrosDAO.js";

import {
  criarEmprestimo,
  finalizarEmprestimo
} from "../dao/emprestimosDAO.js";

const router = express.Router();

router.post("/emprestar", async (req, res) => {
  const { livro_id, usuario_id } = req.body;

  try {
    const livro = await buscarLivro(livro_id);

    if (!livro.disponivel)
      return res.status(400).json({ erro: "Livro já emprestado" });

    await criarEmprestimo(livro_id, usuario_id);
    await marcarEmprestado(livro_id);

    res.json({ sucesso: true });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

router.post("/devolver", async (req, res) => {
  const { livro_id } = req.body;

  try {
    await finalizarEmprestimo(livro_id);
    await marcarDisponivel(livro_id);

    res.json({ sucesso: true });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

export default router;